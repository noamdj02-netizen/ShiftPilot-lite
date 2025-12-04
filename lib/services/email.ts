import { Resend } from 'resend'

// Validation de la clé API email (optionnelle)
const emailApiKey = process.env.EMAIL_API_KEY;
const resend = emailApiKey && emailApiKey !== 're_...' ? new Resend(emailApiKey) : null;

if (!resend && process.env.NODE_ENV === 'production') {
  console.warn('[Email Service] EMAIL_API_KEY is not configured. Email functionality will be disabled.');
}

export const emailService = {
  async sendPlanning(to: string, planningHtml: string) {
    if (!resend) {
      console.warn('EMAIL_API_KEY not configured, skipping email send')
      return { success: false, error: 'Email service not configured' }
    }
    try {
      await resend.emails.send({
        from: 'ShiftPilot <onboarding@resend.dev>', // Update with verified domain
        to,
        subject: 'Votre Planning de la semaine',
        html: planningHtml
      })
      return { success: true }
    } catch (error) {
      console.error('Error sending email:', error)
      return { success: false, error }
    }
  },

  async sendInvite(to: string, restaurantName: string, inviteLink: string) {
    if (!resend) {
      console.warn('EMAIL_API_KEY not configured, skipping email send')
      return { success: false, error: 'Email service not configured' }
    }
    try {
      await resend.emails.send({
        from: 'ShiftPilot <onboarding@resend.dev>',
        to,
        subject: `Invitation à rejoindre ${restaurantName} sur ShiftPilot`,
        html: `
          <div>
            <h1>Bienvenue sur ShiftPilot</h1>
            <p>Vous avez été invité à rejoindre l'équipe de <strong>${restaurantName}</strong>.</p>
            <a href="${inviteLink}" style="padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">Accepter l'invitation</a>
          </div>
        `
      })
      return { success: true }
    } catch (error) {
      console.error('Error sending invite:', error)
      return { success: false, error }
    }
  }
}

