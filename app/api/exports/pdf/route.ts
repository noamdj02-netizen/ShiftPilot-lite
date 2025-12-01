import { NextRequest, NextResponse } from "next/server";
import { PDFExportService } from "@/lib/services/pdf-export-service";

// POST /api/exports/pdf/planning
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data, options } = body;

    let pdfBlob: Blob;

    switch (type) {
      case 'planning':
        pdfBlob = await PDFExportService.exportPlanning({
          title: options?.title || 'Planning',
          organizationName: options?.organizationName || '',
          period: options?.period,
          data,
          type: 'planning'
        });
        break;
      case 'stats':
        pdfBlob = await PDFExportService.exportStats({
          title: 'Statistiques',
          organizationName: options?.organizationName || '',
          data,
          type: 'stats'
        });
        break;
      case 'employee':
        pdfBlob = await PDFExportService.exportEmployeeSheet({
          title: 'Fiche Employé',
          organizationName: options?.organizationName || '',
          data,
          type: 'employee'
        });
        break;
      case 'attendance':
        pdfBlob = await PDFExportService.exportAttendanceSheet({
          title: 'Feuille de Présence',
          organizationName: options?.organizationName || '',
          period: options?.period,
          data,
          type: 'attendance'
        });
        break;
      default:
        return NextResponse.json({ error: "Invalid export type" }, { status: 400 });
    }

    return new NextResponse(pdfBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${type}-${Date.now()}.pdf"`
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}

