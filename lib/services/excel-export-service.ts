// Note: xlsx package required - install with: npm install xlsx @types/xlsx
// @ts-ignore - Dynamic import to handle missing package
let XLSX: any;
try {
  XLSX = require('xlsx');
} catch {
  console.warn('xlsx package not installed. Excel export will not work.');
}

export interface ExcelExportOptions {
  filename: string;
  sheets: Array<{
    name: string;
    data: any[];
    headers?: string[];
  }>;
}

export class ExcelExportService {
  /**
   * Export data to Excel
   */
  static async exportToExcel(options: ExcelExportOptions): Promise<Blob> {
    if (!XLSX) {
      throw new Error('xlsx package is required. Install with: npm install xlsx');
    }
    
    const workbook = XLSX.utils.book_new();

    options.sheets.forEach(sheet => {
      let worksheet;
      
      if (sheet.headers) {
        // If headers provided, create worksheet with headers
        worksheet = XLSX.utils.aoa_to_sheet([
          sheet.headers,
          ...sheet.data.map(row => Object.values(row))
        ]);
      } else {
        // Auto-detect headers from first row
        worksheet = XLSX.utils.json_to_sheet(sheet.data);
      }

      XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
    });

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { 
      bookType: 'xlsx', 
      type: 'array' 
    });

    return new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
  }

  /**
   * Export hours to Excel
   */
  static async exportHours(
    hoursData: Array<{
      employee: string;
      week: string;
      hours: number;
      cost: number;
    }>
  ): Promise<Blob> {
    return this.exportToExcel({
      filename: 'heures.xlsx',
      sheets: [{
        name: 'Heures',
        headers: ['Employé', 'Semaine', 'Heures', 'Coût'],
        data: hoursData.map(h => ({
          'Employé': h.employee,
          'Semaine': h.week,
          'Heures': h.hours,
          'Coût': h.cost
        }))
      }]
    });
  }

  /**
   * Export planning to Excel
   */
  static async exportPlanning(
    planningData: Array<{
      employee: string;
      date: string;
      start: string;
      end: string;
      position: string;
      hours: number;
    }>
  ): Promise<Blob> {
    return this.exportToExcel({
      filename: 'planning.xlsx',
      sheets: [{
        name: 'Planning',
        headers: ['Employé', 'Date', 'Début', 'Fin', 'Poste', 'Heures'],
        data: planningData.map(p => ({
          'Employé': p.employee,
          'Date': p.date,
          'Début': p.start,
          'Fin': p.end,
          'Poste': p.position,
          'Heures': p.hours
        }))
      }]
    });
  }

  /**
   * Export payroll to Excel
   */
  static async exportPayroll(
    payrollData: Array<{
      employee: string;
      hours: number;
      baseCost: number;
      overtime: number;
      premiums: number;
      total: number;
    }>
  ): Promise<Blob> {
    return this.exportToExcel({
      filename: 'paie.xlsx',
      sheets: [{
        name: 'Paie',
        headers: ['Employé', 'Heures', 'Coût Base', 'Heures Supp', 'Primes', 'Total'],
        data: payrollData.map(p => ({
          'Employé': p.employee,
          'Heures': p.hours,
          'Coût Base': p.baseCost,
          'Heures Supp': p.overtime,
          'Primes': p.premiums,
          'Total': p.total
        }))
      }]
    });
  }
}

