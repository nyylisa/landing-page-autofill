
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; 

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming JSON data from PayWay
    const body = await req.json();
    const { tran_id, status } = body;

    // 2. Validate that we have the necessary info
    if (!tran_id || status === undefined) {
      console.error("Webhook Error: Missing tran_id or status", body);
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log(`PayWay Webhook received. Transaction: ${tran_id}, Status: ${status}`);

    // 3. Update the database
    const supabase = createClient();

    const { error } = await (await supabase)
      .from("payments")
      .update({ 
        payway_status: status,
        updated_at: new Date().toISOString() 
      })
      .eq("payway_tran_id", tran_id);

    if (error) {
      console.error("Supabase Update Failed:", error);
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }

    // 4. Return success to PayWay so they stop sending the notification
    return NextResponse.json({ status: "success" });

  } catch (err) {
    console.error("Webhook Internal Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}