import { NextResponse } from 'next/server'
import { emailService } from '@/lib/services/email'
import { generatePlanningPDF } from '@/lib/pdf/planning' // We can't easily import client-side PDF logic in API route without refactoring to server-side PDF gen or passing base64
// For this MVP, we will just send an HTML summary

export async function POST(req: Request) {
  try {
    const { email, employeeName, shifts } = await req.json()

    // Generate a simple HTML table for the email
    const planningHtml = `
      <h1>Bonjour ${employeeName},</h1>
      <p>Voici vos shifts pour la semaine :</p>
      <ul>
        ${shifts.map((s: any) => `
          <li>
            <strong>${new Date(s.start).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' })}</strong> : 
            ${new Date(s.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${new Date(s.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
            (${s.type})
          </li>
        `).join('')}
      </ul>
      <p>Bonne semaine !</p>
    `

    const result = await emailService.sendPlanning(email, planningHtml)

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

