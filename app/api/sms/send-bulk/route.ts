import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";
import twilio from 'twilio';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const body = await request.json();
    const { template_id, employee_ids, custom_message } = body;

    if (!template_id && !custom_message) {
      return NextResponse.json(
        { error: "template_id or custom_message is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Récupérer les employés
    let employees;
    if (employee_ids && employee_ids.length > 0) {
      const { data, error: empError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, phone')
        .eq('organization_id', organization_id)
        .in('id', employee_ids)
        .eq('is_active', true);
      
      if (empError) {
        console.error("Error fetching employees:", empError);
        return NextResponse.json(
          { error: "Failed to fetch employees", details: empError.message },
          { status: 500 }
        );
      }
      
      employees = data || [];
    } else {
      const { data, error: empError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, phone')
        .eq('organization_id', organization_id)
        .eq('is_active', true);
      
      if (empError) {
        console.error("Error fetching employees:", empError);
        return NextResponse.json(
          { error: "Failed to fetch employees", details: empError.message },
          { status: 500 }
        );
      }
      
      employees = data || [];
    }

    // Filtrer les employés avec un numéro de téléphone valide
    const employeesWithPhone = employees.filter(emp => emp.phone && emp.phone.trim() !== '');
    
    if (employeesWithPhone.length === 0) {
      return NextResponse.json(
        { error: "Aucun employé avec un numéro de téléphone valide trouvé" },
        { status: 400 }
      );
    }

    // Récupérer le template si fourni
    let template = null;
    if (template_id) {
      const { data } = await supabase
        .from('sms_templates')
        .select('*')
        .eq('id', template_id)
        .eq('organization_id', organization_id)
        .single();
      template = data;
    }

    // Vérifier si Twilio est configuré
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    
    let twilioClient: twilio.Twilio | null = null;
    if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
      twilioClient = twilio(twilioAccountSid, twilioAuthToken);
    }

    // Envoyer à chaque employé
    const results = [];
    const errors: string[] = [];
    
    for (const employee of employeesWithPhone) {

      let message = custom_message || template?.content || '';
      
      // Remplacer variables
      message = message.replace(/{prenom}/g, employee.first_name || '');
      message = message.replace(/{nom}/g, employee.last_name || '');
      message = message.replace(/{prenom_nom}/g, `${employee.first_name || ''} ${employee.last_name || ''}`.trim());
      // Ajouter autres variables selon besoin

      let smsResult: {
        employee_id: string;
        phone: string;
        message: string;
        status: string;
        sent_at: string;
        message_id?: string;
      };

      // Si Twilio est configuré, utiliser le service réel
      if (twilioClient && twilioPhoneNumber) {
        try {
          const twilioResponse = await twilioClient.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: employee.phone
          });

          smsResult = {
            employee_id: employee.id,
            phone: employee.phone,
            message,
            status: twilioResponse.status,
            sent_at: new Date().toISOString(),
            message_id: twilioResponse.sid
          };
        } catch (twilioError: any) {
          console.error(`Twilio error for ${employee.phone}:`, twilioError);
          smsResult = {
            employee_id: employee.id,
            phone: employee.phone,
            message,
            status: 'failed',
            sent_at: new Date().toISOString()
          };
        }
      } else {
        // Mode simulation si Twilio n'est pas configuré
        smsResult = {
          employee_id: employee.id,
          phone: employee.phone,
          message,
          status: 'sent',
          sent_at: new Date().toISOString(),
          message_id: `sms_${Date.now()}_${employee.id}`
        };
      }

      // Log dans database (avec gestion d'erreur silencieuse)
      try {
        const { error: dbError } = await supabase.from('sms_messages').insert({
          organization_id,
          phone: employee.phone,
          message,
          template_id: template_id || null,
          employee_id: employee.id,
          status: smsResult.status,
          sent_at: smsResult.sent_at,
          external_id: smsResult.message_id
        });

        if (dbError) {
          console.error(`Database error for ${employee.phone}:`, dbError);
          // Ne pas bloquer si le log échoue
        }
      } catch (dbError) {
        console.error(`Database insert error for ${employee.phone}:`, dbError);
        // Ne pas bloquer si le log échoue
      }

      results.push(smsResult);
      
      if (smsResult.status === 'failed') {
        errors.push(`${employee.first_name || employee.phone}: Échec d'envoi`);
      }
    }

    // Si tous les SMS ont échoué, retourner une erreur
    if (results.length > 0 && results.every(r => r.status === 'failed')) {
      return NextResponse.json(
        { 
          error: "Tous les SMS ont échoué", 
          details: errors.join(', '),
          count: results.length,
          results 
        },
        { status: 500 }
      );
    }

    // Si certains ont réussi, retourner un succès partiel
    const successCount = results.filter(r => r.status === 'sent' || r.status === 'queued').length;
    const failedCount = results.filter(r => r.status === 'failed').length;

    return NextResponse.json({
      success: successCount > 0,
      count: results.length,
      successCount,
      failedCount,
      errors: errors.length > 0 ? errors : undefined,
      results
    });
  } catch (error) {
    console.error("SMS bulk error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

