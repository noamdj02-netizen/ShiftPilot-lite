import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Shift, Employee } from '@/lib/types'

// Extend jsPDF type to include autotable
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => void
}

export const generatePlanningPDF = (
  restaurantName: string,
  startDate: Date,
  endDate: Date,
  employees: Employee[],
  shifts: Record<string, (Shift | null)[]>
) => {
  const doc = new jsPDF() as jsPDFWithAutoTable

  // --- Header ---
  doc.setFontSize(20)
  doc.text(restaurantName, 14, 22)
  
  doc.setFontSize(12)
  doc.text(`Planning du ${format(startDate, 'dd MMMM', { locale: fr })} au ${format(endDate, 'dd MMMM yyyy', { locale: fr })}`, 14, 32)

  // --- Table ---
  
  // Columns: Employee + 7 days
  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    days.push(format(d, 'EEE dd', { locale: fr }))
  }

  const columns = [
    { header: 'Employé', dataKey: 'employee' },
    ...days.map((day, i) => ({ header: day, dataKey: `day_${i}` }))
  ]

  // Rows
  const rows = employees.map(emp => {
    const row: any = { employee: `${emp.first_name} ${emp.last_name}` }
    const empShifts = shifts[emp.id] || []
    
    empShifts.forEach((shift, i) => {
      row[`day_${i}`] = shift ? `${shift.start} - ${shift.end}\n${shift.type}` : ''
    })
    
    return row
  })

  doc.autoTable({
    startY: 40,
    head: [columns.map(c => c.header)],
    body: rows.map(r => columns.map(c => r[c.dataKey])),
    styles: {
      fontSize: 8,
      cellPadding: 3,
      valign: 'middle',
      overflow: 'linebreak',
      cellWidth: 'wrap'
    },
    headStyles: {
      fillColor: [59, 130, 246], // Brand Blue
      textColor: 255,
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 30, fontStyle: 'bold' } // Employee Name Column
    },
    didParseCell: (data: any) => {
        // You could add custom styling for different shift types here if needed
        // e.g., coloring cells based on content
    }
  })

  // --- Footer ---
  const pageCount = doc.getNumberOfPages()
  doc.setFontSize(8)
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text(`Généré par ShiftPilot le ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, 14, doc.internal.pageSize.height - 10)
    doc.text(`Page ${i} sur ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10)
  }

  // Save
  doc.save(`planning_${format(startDate, 'yyyy-MM-dd')}.pdf`)
}

