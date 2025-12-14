
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; 
import crypto from "crypto";


export async function POST(req: Request) {
  try {
    const { amount, user_id } = await req.json();

    if (!amount || !user_id) {
      return NextResponse.json({ error: "amount and user_id are required" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    console.log("🔍 FRONTEND sent ID:", user_id);
    console.log("🕵️‍♂️ SERVER sees ID:  ", authUser?.id || "NULL (Anonymous)");
    if (authUser?.id !== user_id) {
        return NextResponse.json({ 
            error: "Auth Mismatch! Server thinks you are logged out." 
        }, { status: 401 });
    }
    // Prevent duplicate pending payments
    const { data: existing } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", user_id)             
      .eq("amount", amount)              
      .eq("payway_status", "PENDING")   
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
        const timeDiff = Date.now() - new Date(existing.created_at).getTime();
        const fiveMins = 5 * 60 * 1000;
        
        if (timeDiff < fiveMins) {
            console.log("♻️ REUSING existing PENDING payment:", existing.payway_tran_id);
            
            return NextResponse.json({ 
                tran_id: existing.payway_tran_id,
                qr_image: existing.qr_string,
                reused: true
            });
        }
    }

    const tran_id = `ORD-${Date.now()}`;
    const merchant_id = process.env.PAYWAY_MERCHANT_ID!;
    const api_key = process.env.PAYWAY_API_KEY!;
    const return_url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/payment/payway/webhook`;

    // Prepare payload
    const payload: Record<string, any> = {
      req_time: new Date().toISOString().replace(/\D/g, "").slice(0, 14),
      merchant_id,
      tran_id,
      first_name: "User",
      last_name: "User",
      email: "user@example.com",
      phone: "012345678",
      amount,
      currency: "USD",
      purchase_type: "purchase",
      payment_option: "abapay_khqr",
      items: Buffer.from(JSON.stringify([{ name: "Sandbox Item", quantity: 1, price: amount }])).toString("base64"),
      callback_url: Buffer.from(return_url).toString("base64"),
      return_deeplink: "",
      custom_fields: "",
      return_params: "",
      payout: "",
      lifetime: 30,
      qr_image_template: "template3_color",
    };

    // Concatenate all fields exactly in order for HMAC SHA512
    const hmacString =
      payload.req_time +
      payload.merchant_id +
      payload.tran_id +
      payload.amount +
      payload.items +
      payload.first_name +
      payload.last_name +
      payload.email +
      payload.phone +
      payload.purchase_type +
      payload.payment_option +
      payload.callback_url +
      payload.return_deeplink +
      payload.currency +
      payload.custom_fields +
      payload.return_params +
      payload.payout +
      payload.lifetime +
      payload.qr_image_template;

    const hash = crypto.createHmac("sha512", api_key).update(hmacString).digest("base64");
    payload.hash = hash;

    console.log("PayWay QR payload:", payload);
    console.log("HMAC hash:", hash);

    // Call PayWay sandbox
    const resp = await fetch(`${process.env.NEXT_PUBLIC_PAYWAY_SANDBOX_URL}/generate-qr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: any;
    try {
      data = await resp.json();
    } catch {
      const text = await resp.text();
      console.error("PayWay returned non-JSON:", text);
      return NextResponse.json({ error: "PayWay returned invalid response" }, { status: 500 });
    }

    if (!data.qrImage) { 
      console.error("PayWay response error:", data);
      return NextResponse.json({ error: "Failed to generate QR" }, { status: 500 });
    }

    /// Save pending payment
    const { error: dbError } = await supabase.from("payments").insert({
      user_id,
      amount,
      currency: "USD",
      payway_tran_id: tran_id,
      payway_status: "PENDING",
      
    });

    // CHECK FOR ERRORS HERE
    if (dbError) {
      console.error("Database Insert Failed:", dbError.message);
      return NextResponse.json({ error: "Database error: " + dbError.message }, { status: 500 });
    } else {
      console.log("PENDING Payment Saved Successfully for:", tran_id);
    }

    return NextResponse.json({ 
        qr_image: data.qrImage, 
        tran_id: tran_id 
    });
    

    // return NextResponse.json({ 
    //     qr_image: data.qrImage, 
    //     tran_id: tran_id 
    // });
  } catch (err: any) {
    console.error("Generate PayWay QR Error:", err);
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}
