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
    const { phone, message, template_id, employee_id } = body;

    if (!phone || !message) {
      return NextResponse.json(
        { error: "phone and message are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Vérifier si Twilio est configuré
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    let smsResult: {
      success: boolean;
      message_id: string;
      status: string;
    };

    // Si Twilio est configuré, utiliser le service réel
    if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
      try {
        const client = twilio(twilioAccountSid, twilioAuthToken);

        // Envoyer le SMS via Twilio
        const twilioResponse = await client.messages.create({
          body: message,
          from: twilioPhoneNumber,
          to: phone
        });

        smsResult = {
          success: true,
          message_id: twilioResponse.sid,
          status: twilioResponse.status
        };
      } catch (twilioError: any) {
        console.error("Twilio error:", twilioError);
        return NextResponse.json(
          { 
            error: "Failed to send SMS", 
            details: twilioError.message || "Twilio service error" 
          },
          { status: 500 }
        );
      }
    } else {
      // Mode simulation si Twilio n'est pas configuré
      console.warn("Twilio not configured, using simulation mode");
      smsResult = {
        success: true,
        message_id: `sms_${Date.now()}`,
        status: 'sent'
      };
    }
    
    // Log dans database
    const { data, error } = await supabase
      .from('sms_messages')
      .insert({
        organization_id,
        phone,
        message,
        template_id: template_id || null,
        employee_id: employee_id || null,
        status: smsResult.status,
        sent_at: new Date().toISOString(),
        external_id: smsResult.message_id // Sauvegarder l'ID Twilio
      })
      .select()
      .single();

    if (error) {
      console.error("SMS log error:", error);
      // Ne pas échouer si le log échoue, mais retourner quand même le résultat
    }

    return NextResponse.json({
      ...smsResult,
      log_id: data?.id
    });
  } catch (error) {
    console.error("SMS send error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

