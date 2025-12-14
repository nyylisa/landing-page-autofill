import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  // 1. Get the transaction ID from the URL (e.g., ?tran_id=ORD-123)
  const { searchParams } = new URL(req.url);
  const tran_id = searchParams.get("tran_id");

  if (!tran_id) {
    return NextResponse.json({ error: "tran_id required" }, { status: 400 });
  }

  // 2. Query the database to see the current status
  const supabase = createClient();
  
  const { data, error } = await (await supabase)
    .from("payments")
    .select("payway_status, id")
    .eq("payway_tran_id", tran_id)
    .single();

  if (error || !data) {
    // If we can't find the record or there's an error, tell frontend to keep waiting
    return NextResponse.json({ status: "PENDING" });
  }

  // 3. Check if it is a success
  const isSuccess = data.payway_status === "0" || data.payway_status === "SUCCESS";

  return NextResponse.json({ 
    status: isSuccess ? "SUCCESS" : "PENDING",
    orderId: data.id 
  });
}