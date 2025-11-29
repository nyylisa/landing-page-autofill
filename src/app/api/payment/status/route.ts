import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
export const dynamic = 'force-dynamic'; // Ensure this isn't cached

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tran_id = searchParams.get("tran_id");

    if (!tran_id) {
      return NextResponse.json({ error: "Missing tran_id" }, { status: 400 });
    }

    const supabase = await createClient();

    // Look for the payment record by Transaction ID
    const { data, error } = await supabase
      .from("payments")
      .select("payway_status")
      .eq("payway_tran_id", tran_id)
      .maybeSingle();

    if (error) {
      console.error("Status Check DB Error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // Return the status (e.g., "PENDING", "PAID")
    return NextResponse.json({ status: data.payway_status });

  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}