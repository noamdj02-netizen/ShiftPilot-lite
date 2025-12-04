import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface PdfData {
  restaurantName: string
  weekStart: Date
  weekEnd: Date
  employees: any[]
  shifts: any[]
}

export async function generatePlanningPDF({ restaurantName, weekStart, weekEnd, employees, shifts }: PdfData) {
  const doc = new jsPDF()

  // Title
  doc.setFontSize(20)
  doc.text(restaurantName, 14, 22)
  
  doc.setFontSize(12)
  doc.text(`Planning du ${format(weekStart, 'dd MMMM', { locale: fr })} au ${format(weekEnd, 'dd MMMM yyyy', { locale: fr })}`, 14, 32)

  // Prepare table data
  const days: Date[] = []
  const current = new Date(weekStart)
  while (current <= weekEnd) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  const head = [['Employé', ...days.map(d => format(d, 'EEE dd', { locale: fr }))]]
  
  const body = employees.map(emp => {
    const row = [`${emp.first_name} ${emp.last_name}`]
    
    days.forEach(day => {
      const dayStr = format(day, 'yyyy-MM-dd')
      // Find shifts for this employee on this day
      // Note: This assumes shifts have a date property or start_time iso string
      // We need to match the logic from the UI or ensure shifts data is processed
      const empShifts = shifts.filter(s => 
        s.employee_id === emp.id && 
        (s.date === dayStr || s.start_time.startsWith(dayStr))
      )
      
      if (empShifts.length > 0) {
        const shiftText = empShifts.map((s: any) => {
            const start = new Date(s.start_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            const end = new Date(s.end_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            return `${start}-${end}`
        }).join('\n')
        row.push(shiftText)
      } else {
        row.push('')
      }
    })
    return row
  })

  autoTable(doc, {
    head: head,
    body: body,
    startY: 40,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [59, 130, 246] }, // Blue primary
    alternateRowStyles: { fillColor: [245, 247, 250] },
    theme: 'grid'
  })

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.text(`Généré par ShiftPilot - Page ${i} sur ${pageCount}`, 14, doc.internal.pageSize.height - 10)
  }

  return doc.output('arraybuffer')
}
