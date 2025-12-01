import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface PDFExportOptions {
  title: string;
  organizationName: string;
  period?: string;
  data: any;
  type: 'planning' | 'stats' | 'employee' | 'attendance';
}

export class PDFExportService {
  /**
   * Export planning to PDF
   */
  static async exportPlanning(options: PDFExportOptions): Promise<Blob> {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text(options.title, 14, 20);
    doc.setFontSize(12);
    doc.text(options.organizationName, 14, 28);
    if (options.period) {
      doc.text(`Période: ${options.period}`, 14, 35);
    }

    // Planning table
    const tableData = options.data.shifts?.map((shift: any) => [
      shift.employee_name || 'N/A',
      new Date(shift.date).toLocaleDateString('fr-FR'),
      shift.start_time?.substring(0, 5) || '',
      shift.end_time?.substring(0, 5) || '',
      shift.position || 'N/A',
      `${shift.hours || 0}h`
    ]) || [];

    autoTable(doc, {
      head: [['Employé', 'Date', 'Début', 'Fin', 'Poste', 'Heures']],
      body: tableData,
      startY: 45,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [108, 99, 255] }
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} / ${pageCount} - Généré le ${new Date().toLocaleDateString('fr-FR')}`,
        14,
        doc.internal.pageSize.height - 10
      );
    }

    return doc.output('blob');
  }

  /**
   * Export stats to PDF
   */
  static async exportStats(options: PDFExportOptions): Promise<Blob> {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Statistiques', 14, 20);
    doc.setFontSize(12);
    doc.text(options.organizationName, 14, 28);

    // Stats summary
    const stats = options.data.stats || {};
    const yStart = 40;
    let yPos = yStart;

    doc.setFontSize(14);
    doc.text('Résumé', 14, yPos);
    yPos += 10;

    doc.setFontSize(10);
    Object.entries(stats).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 14, yPos);
      yPos += 7;
    });

    // Charts would be added here if needed (using canvas or images)

    return doc.output('blob');
  }

  /**
   * Export employee sheet to PDF
   */
  static async exportEmployeeSheet(options: PDFExportOptions): Promise<Blob> {
    const doc = new jsPDF();
    
    const employee = options.data.employee;
    
    doc.setFontSize(18);
    doc.text(`Fiche Employé: ${employee.first_name} ${employee.last_name}`, 14, 20);
    
    doc.setFontSize(10);
    let yPos = 35;
    doc.text(`Email: ${employee.email || 'N/A'}`, 14, yPos);
    yPos += 7;
    doc.text(`Téléphone: ${employee.phone || 'N/A'}`, 14, yPos);
    yPos += 7;
    doc.text(`Contrat: ${employee.contract_type || 'N/A'}`, 14, yPos);
    yPos += 7;
    doc.text(`Heures/semaine: ${employee.contract_hours_per_week || 'N/A'}`, 14, yPos);

    // Hours table
    if (options.data.hours) {
      yPos += 15;
      autoTable(doc, {
        head: [['Semaine', 'Heures', 'Coût']],
        body: options.data.hours.map((h: any) => [h.week, `${h.hours}h`, `${h.cost}€`]),
        startY: yPos
      });
    }

    return doc.output('blob');
  }

  /**
   * Export attendance sheet to PDF
   */
  static async exportAttendanceSheet(options: PDFExportOptions): Promise<Blob> {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Feuille de Présence', 14, 20);
    doc.setFontSize(12);
    doc.text(options.organizationName, 14, 28);
    if (options.period) {
      doc.text(`Période: ${options.period}`, 14, 35);
    }

    const attendance = options.data.attendance || [];
    const tableData = attendance.map((entry: any) => [
      entry.employee_name,
      new Date(entry.date).toLocaleDateString('fr-FR'),
      entry.check_in || 'N/A',
      entry.check_out || 'N/A',
      `${entry.hours || 0}h`
    ]);

    autoTable(doc, {
      head: [['Employé', 'Date', 'Arrivée', 'Départ', 'Heures']],
      body: tableData,
      startY: 45
    });

    return doc.output('blob');
  }
}

