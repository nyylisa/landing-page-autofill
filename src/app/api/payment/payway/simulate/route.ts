// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";

// export async function POST(req: NextRequest) {
//   if (process.env.NODE_ENV === 'production') {
//      return NextResponse.json({ error: "Simulation not allowed in production" }, { status: 403 });
//   }

//   try {
//     const { tran_id, amount } = await req.json();

//     if (!tran_id || !amount) {
//       return NextResponse.json({ error: "Missing tran_id or amount" }, { status: 400 });
//     }

//     const payload = {
//       req_time: "20230101000000",
//       merchant_id: process.env.PAYWAY_MERCHANT_ID!,
//       tran_id: tran_id,
//       amount: String(amount),
//       items: "", 
//       firstname: "Test",
//       lastname: "User",
//       email: "test@example.com",
//       phone: "0123456789",
//       type: "purchase",
//       payment_option: "abapay_khqr",
//       currency: "KHR",
//       status: "COMPLETED",
//       payout: "", 
//     };

//     // 2. Calculate the Hash (Acting as the Bank)
//     const strForHash =
//       payload.req_time +
//       payload.merchant_id +
//       payload.tran_id +
//       payload.amount +
//       payload.items +
//       payload.firstname +
//       payload.lastname +
//       payload.email +
//       payload.phone +
//       payload.type +
//       payload.payment_option +
//       payload.currency +
//       payload.status +
//       payload.payout;

//     const hash = crypto
//       .createHmac("sha512", process.env.PAYWAY_API_KEY!)
//       .update(strForHash)
//       .digest("base64");

//     //3. Send the Mock Webhook to your own API
//     const webhookUrl = `http://localhost:3000/api/payment/payway/webhook`;  
    
//     console.log(`Simulating PayWay Callback to: ${webhookUrl}`);
//     console.log(`Payload:`, { ...payload, hash });

//     const response = await fetch(webhookUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...payload, hash }),
//     });

//     const data = await response.json();
//     return NextResponse.json({ 
//       success: response.ok,
//       debug_url_used: webhookUrl,
//       webhook_response: data 
//     });

//   } catch (error: any) {
//     console.error("Simulation Failed:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  // 1. REMOVED: The code that blocked production is gone.

  try {
    const { tran_id, amount } = await req.json();

    if (!tran_id || !amount) {
      return NextResponse.json({ error: "Missing tran_id or amount" }, { status: 400 });
    }

    const payload = {
      req_time: "20230101000000",
      merchant_id: process.env.PAYWAY_MERCHANT_ID!,
      tran_id: tran_id,
      amount: String(amount),
      items: "", 
      firstname: "Test",
      lastname: "User",
      email: "test@example.com",
      phone: "0123456789",
      type: "purchase",
      payment_option: "abapay_khqr",
      currency: "KHR",
      status: "COMPLETED",
      payout: "", 
    };

    // 2. Calculate the Hash (Acting as the Bank)
    const strForHash =
      payload.req_time +
      payload.merchant_id +
      payload.tran_id +
      payload.amount +
      payload.items +
      payload.firstname +
      payload.lastname +
      payload.email +
      payload.phone +
      payload.type +
      payload.payment_option +
      payload.currency +
      payload.status +
      payload.payout;

    const hash = crypto
      .createHmac("sha512", process.env.PAYWAY_API_KEY!)
      .update(strForHash)
      .digest("base64");

    // -------------------------------------------------------------
    // ✅ FIX: Dynamic URL (Works on Localhost AND Production)
    // -------------------------------------------------------------
    const host = req.headers.get("host"); // Gets 'localhost:3000' or 'your-site.com'
    const protocol = host?.includes("localhost") ? "http" : "https";
    const webhookUrl = `${protocol}://${host}/api/payment/payway/webhook`;
    
    console.log(`Simulating PayWay Callback to: ${webhookUrl}`);
    console.log(`Payload:`, { ...payload, hash });

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, hash }),
    });

    const data = await response.json();
    return NextResponse.json({ 
      success: response.ok,
      debug_url_used: webhookUrl,
      webhook_response: data 
    });

  } catch (error: any) {
    console.error("Simulation Failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}