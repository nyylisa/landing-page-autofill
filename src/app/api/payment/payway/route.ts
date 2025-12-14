import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Webhook Hit. Tran ID:", body.tran_id, "Status:", body.status);

    const {
      req_time, merchant_id, tran_id, amount, items, payout,
      firstname, lastname, email, phone, type,
      payment_option, currency, status, hash
    } = body;

    // 1. Validate Hash (Make sure it's really from PayWay/Simulation)
    const strForHash =
      req_time + merchant_id + tran_id + amount + (items || "") +
      (firstname || "") + (lastname || "") + (email || "") + (phone || "") + (type || "") +
      (payment_option || "") + (currency || "") + status + (payout || "");

    const generatedHash = crypto
      .createHmac("sha512", process.env.PAYWAY_API_KEY!)
      .update(strForHash)
      .digest("base64");

    if (hash !== generatedHash) {
      console.error("Hash Mismatch. Expected:", generatedHash, "Got:", hash);
      return NextResponse.json({ status: { code: "1", message: "Invalid Hash" } });
    }

    // 2. CHECK STATUS
    if (status === "COMPLETED" || status === "APPROVED" || status === "0") {
      
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY! 
      );

      // 3. UPDATE DATABASE
      const { error } = await supabaseAdmin
        .from("payments")
        .update({ 
            payway_status: "PAID",
            updated_at: new Date().toISOString()
        })
        .eq("payway_tran_id", tran_id);

      if (error) {
        console.error("Supabase Update Failed:", error.message);
        return NextResponse.json({ status: { code: "1", message: "DB Error" } });
      } 
      
      console.log("SUCCESS: Database updated to PAID for", tran_id);
    }

    return NextResponse.json({ status: { code: "0", message: "Success", tran_id } });

  } catch (err: any) {
    console.error("Webhook Critical Error:", err.message);
    return NextResponse.json({ status: { code: "1", message: "Server Error" } });
  }
}