import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { emailService } from "@/lib/services/email";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { weekStart, weekEnd, targetEmail } = body;

    if (!weekStart || !weekEnd) {
      return NextResponse.json(
        { error: "Week start and end dates are required" },
        { status: 400 }
      );
    }

    // Fetch shifts for the organization
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "No organization found" }, { status: 404 });
    }

    const organizationId = (profile as { organization_id: string | null }).organization_id;
    if (!organizationId) {
      return NextResponse.json({ error: "No organization found" }, { status: 404 });
    }

    const { data: shifts } = await supabase
      .from("shifts")
      .select("*, profiles:profile_id(first_name, last_name)")
      .eq("organization_id", organizationId)
      .gte("start_time", weekStart)
      .lte("end_time", weekEnd)
      .order("start_time");

    // Simple HTML generation
    const planningHtml = `
      <div style="font-family: sans-serif;">
        <h1>Planning de la semaine</h1>
        <p>Du ${new Date(weekStart).toLocaleDateString('fr-FR')} au ${new Date(weekEnd).toLocaleDateString('fr-FR')}</p>
        
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th>Employé</th>
              <th>Date</th>
              <th>Horaire</th>
              <th>Rôle</th>
            </tr>
          </thead>
          <tbody>
            ${shifts?.map((shift: any) => `
              <tr>
                <td>${shift.profiles?.first_name} ${shift.profiles?.last_name}</td>
                <td>${new Date(shift.start_time).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}</td>
                <td>
                  ${new Date(shift.start_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - 
                  ${new Date(shift.end_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td>${shift.role || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    const recipient = targetEmail || user.email;
    const result = await emailService.sendPlanning(recipient!, planningHtml);

    if (!result.success) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

