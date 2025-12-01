import { NextRequest, NextResponse } from "next/server";
import { ExcelExportService } from "@/lib/services/excel-export-service";

// POST /api/exports/excel/hours
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    let excelBlob: Blob;

    switch (type) {
      case 'hours':
        excelBlob = await ExcelExportService.exportHours(data);
        break;
      case 'planning':
        excelBlob = await ExcelExportService.exportPlanning(data);
        break;
      case 'payroll':
        excelBlob = await ExcelExportService.exportPayroll(data);
        break;
      default:
        return NextResponse.json({ error: "Invalid export type" }, { status: 400 });
    }

    return new NextResponse(excelBlob, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${type}-${Date.now()}.xlsx"`
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}

