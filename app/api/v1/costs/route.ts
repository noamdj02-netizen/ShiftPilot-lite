import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PayrollCalculator } from "@/lib/services/payroll-calculator";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

// GET /api/v1/costs/weekly
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organization_id');
    const establishmentId = searchParams.get('establishment_id');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    if (!organizationId || !establishmentId || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const result = await PayrollCalculator.calculatePayroll(
      organizationId,
      establishmentId,
      startDate,
      endDate
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      calculation: result.calculation,
      details: result.details
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}

