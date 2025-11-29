// // import { NextResponse } from "next/server";
// // import { createClient } from "@/utils/supabase/client";
// // import crypto from "crypto";

// // export async function POST(req: Request) {
// //   try {
// //     const { amount, user_id } = await req.json();

// //     if (!amount || !user_id) {
// //       return NextResponse.json({ error: "amount and user_id are required" }, { status: 400 });
// //     }

// //     const supabase = createClient();

// //     // Prevent multiple pending payments for same user + amount
// //     const { data: existing } = await supabase
// //       .from("payments")
// //       .select("*")
// //       .eq("user_id", user_id)
// //       .eq("amount", amount)
// //       .eq("payway_status", "PENDING")
// //       .maybeSingle();

// //     if (existing) {
// //       return NextResponse.json({ error: "You already have a pending payment" }, { status: 400 });
// //     }

// //     // Generate unique transaction id
// //     const tran_id = `ORD-${Date.now()}`;

// //     // PayWay sandbox settings
// //     const merchant_id = process.env.PAYWAY_MERCHANT_ID!;
// //     const return_url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/payment/payway/webhook`;

// //     // Compute hash for sandbox
// //     const hashData = `${tran_id}${amount}${merchant_id}${return_url}${process.env.PAYWAY_SECRET_KEY}`;
// //     const hash = crypto.createHash("sha256").update(hashData).digest("base64");

// //     // Build request body
// //     const payload = {
// //       req_time: new Date().toISOString().replace(/\D/g, "").slice(0, 14), // YYYYMMDDHHMMSS
// //       merchant_id,
// //       tran_id,
// //       first_name: "User",
// //       last_name: user_id,
// //       email: "user@example.com",
// //       phone: "012345678",
// //       amount,
// //       purchase_type: "purchase",
// //       payment_option: "abapay_khqr",
// //       items: "W3sibmFtZSI6IlNhbmRib3giLCJxdWFudGl0eSI6MSwicHJpY2UiOjF9XQ==",
// //       currency: "KHR",
// //       callback_url: Buffer.from(return_url).toString("base64"),
// //       qr_image_template: "template3_color",
// //       hash,
// //     };

// //     // Call PayWay sandbox
// //     const resp = await fetch(
// //       process.env.NEXT_PUBLIC_PAYWAY_SANDBOX_URL! + "/api/payment-gateway/v1/payments/generate-qr",
// //       {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       }
// //     );

// //     const data = await resp.json();

// //     if (!data.qr_image) {
// //       return NextResponse.json({ error: "Failed to generate QR" }, { status: 500 });
// //     }

// //     // Save pending payment in Supabase
// //     await supabase.from("payments").insert({
// //       user_id,
// //       amount,
// //       payway_tran_id: tran_id,
// //       payway_status: "PENDING",
// //     });

// //     return NextResponse.json({ qr_image: data.qr_image, tran_id });
// //   } catch (err: any) {
// //     console.error(err);
// //     return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
// //   }
// // }

// // src/app/api/payment/payway/generate-qr/route.ts
// import { NextResponse } from "next/server";
// import { createClient } from "@/utils/supabase/client";
// import * as forge from "node-forge";

// export async function POST(req: Request) {
//   try {
//     const { amount, user_id } = await req.json();

//     if (!amount || !user_id) {
//       return NextResponse.json({ error: "amount and user_id are required" }, { status: 400 });
//     }

//     const supabase = createClient();

//     // Prevent duplicate pending payments
//     const { data: existing } = await supabase
//       .from("payments")
//       .select("*")
//       .eq("user_id", user_id)
//       .eq("amount", amount)
//       .eq("payway_status", "PENDING")
//       .maybeSingle();

//     if (existing) {
//       return NextResponse.json({ error: "You already have a pending payment" }, { status: 400 });
//     }

//     const tran_id = `ORD-${Date.now()}`;
//     const merchant_id = process.env.PAYWAY_MERCHANT_ID!;
//     const return_url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/payment/payway/webhook`;

//     // Build payload
//     const payload = {
//       req_time: new Date().toISOString().replace(/\D/g, "").slice(0, 14),
//       merchant_id,
//       tran_id,
//       first_name: "User",
//       last_name: user_id,
//       email: "user@example.com",
//       phone: "012345678",
//       amount,
//       purchase_type: "purchase",
//       payment_option: "abapay_khqr",
//       items: "W3sibmFtZSI6IlNhbmRib3giLCJxdWFudGl0eSI6MSwicHJpY2UiOjF9XQ==",
//       currency: "KHR",
//       callback_url: Buffer.from(return_url).toString("base64"),
//       qr_image_template: "template3_color",
//     };

//     // ✅ Sign the payload using RSA private key from env
//     const privateKeyPem = process.env.PAYWAY_RSA_PRIVATE_KEY!;
//     const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

//     const payloadString = JSON.stringify(payload);
//     const md = forge.md.sha256.create();
//     md.update(payloadString, "utf8");

//     const signature = forge.util.encode64(privateKey.sign(md));
//     (payload as any).hash = signature; // attach signature to payload

//     // Call PayWay sandbox API
//     const resp = await fetch(
//       `${process.env.NEXT_PUBLIC_PAYWAY_SANDBOX_URL}/generate-qr`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       }
//     );

//     // Parse JSON response
//     const data = await resp.json();

//     if (!data.qr_image) {
//       console.error("PayWay response:", data);
//       return NextResponse.json({ error: "Failed to generate QR" }, { status: 500 });
//     }

//     // Save pending payment to Supabase
//     await supabase.from("payments").insert({
//       user_id,
//       amount,
//       payway_tran_id: tran_id,
//       payway_status: "PENDING",
//     });

//     return NextResponse.json({ qr_image: data.qr_image, tran_id });
//   } catch (err: any) {
//     console.error("PayWay QR Error:", err);
//     return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
//   }
// }
// src/app/api/payment/payway/generate-qr/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // ✅ USE THISimport crypto from "crypto";
import crypto from "crypto"; // ✅ Ensure this is imported for Node.js crypto


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
      .eq("user_id", user_id)             // Same User
      .eq("amount", amount)               // Same Amount
      .eq("payway_status", "PENDING")     // Still Pending
      .order("created_at", { ascending: false }) // Get the newest one
      .limit(1)
      .maybeSingle();

    // If we found a pending payment created less than 5 minutes ago, REUSE IT.
    if (existing) {
        const timeDiff = Date.now() - new Date(existing.created_at).getTime();
        const fiveMins = 5 * 60 * 1000;
        
        if (timeDiff < fiveMins) {
            console.log("♻️ REUSING existing PENDING payment:", existing.payway_tran_id);
            
            // Return the EXISTING data instead of creating a new row
            return NextResponse.json({ 
                tran_id: existing.payway_tran_id,
                qr_image: existing.qr_string, // We will ensure this is saved below
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
      req_time: new Date().toISOString().replace(/\D/g, "").slice(0, 14), // YYYYMMDDHHMMSS
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
      lifetime: 30, // minutes
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
      console.error("❌ Database Insert Failed:", dbError.message);
      return NextResponse.json({ error: "Database error: " + dbError.message }, { status: 500 });
    } else {
      console.log("✅ PENDING Payment Saved Successfully for:", tran_id);
    }

    return NextResponse.json({ 
        qr_image: data.qrImage, 
        tran_id: tran_id 
    });
    

    return NextResponse.json({ 
        qr_image: data.qrImage, 
        tran_id: tran_id 
    });
  } catch (err: any) {
    console.error("Generate PayWay QR Error:", err);
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}
