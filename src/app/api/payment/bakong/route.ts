// import { NextResponse } from 'next/server';
// // @ts-ignore
// const { BakongKHQR, khqrData, IndividualInfo } = require("bakong-khqr");

// export async function POST(req: Request) {
//   try {
//     const { amount } = await req.json();

//     // 1. Setup Variables
//     const myBakongId = "lisa@aclb"; // REPLACE WITH YOUR REAL ID
//     const myName = "LISA NY";           // REPLACE WITH YOUR REAL NAME
//     const myCity = "PHNOM PENH";

//     // 2. Setup Optional Data (CRITICAL FIXES HERE)
//     const optionalData = {
//       // Ensure currency is correct (try hardcoding if khqrData is undefined)
//       currency: khqrData?.currency?.usd || "840", 
      
//       // Ensure amount is a NUMBER, not a string
//       amount: Number(amount), 
      
//       // REQUIRED: If you have an amount, you MUST have an expiration
//       expirationTimestamp: Date.now() + (15 * 60 * 1000), // 15 minutes from now
      
//       storeLabel: "My SaaS Product",
//       terminalLabel: "Web_Checkout",
//     };

//     console.log("Generating QR with:", { myBakongId, myName, optionalData });

//     // 3. Create Info Object
//     const individualInfo = new IndividualInfo(
//       myBakongId, 
//       myName, 
//       myCity, 
//       optionalData
//     );

//     // 4. Generate
//     const KHQR = new BakongKHQR();
//     const individual = KHQR.generateIndividual(individualInfo);

//     // 5. DEBUGGING: Check the status code
//     console.log("Library Response:", JSON.stringify(individual, null, 2));

//     // If code is NOT 0, it failed. Let's see why.
//     if (individual.status.code !== 0) {
//       throw new Error(`Bakong Library Error: ${individual.status.message || "Unknown Error"}`);
//     }

//     if (!individual.data) {
//       throw new Error("Generated data is null");
//     }

//     return NextResponse.json({ 
//       qr_string: individual.data.qr,
//       md5: individual.data.md5 
//     });

//   } catch (error: any) {
//     console.error("Payment API Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// src/app/api/payment/bakong/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

// @ts-ignore
const { BakongKHQR, khqrData, IndividualInfo } = require("bakong-khqr");

import { savePayment, expireOldPayments } from "@/lib/payment-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body?.amount ?? 0);
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Clean up expired payments in memory (dev convenience)
    expireOldPayments();

    // Merchant / identity. For dev, use a placeholder.
    // Later replace with process.env.MERCHANT_ID
    const myBakongId = process.env.MERCHANT_ID || "lisa@aclb";
    const myName = process.env.MERCHANT_NAME || "Lisa Ny";
    const myCity = process.env.MERCHANT_CITY || "Phnom Penh";

    const optionalData = {
      currency: khqrData?.currency?.khr || "116", // default to KHR
      amount: amount,
      expirationTimestamp: Date.now() + 15 * 60 * 1000, // 15 minutes
      storeLabel: body.storeLabel || "My SaaS Product",
      terminalLabel: body.terminalLabel || "Web_Checkout",
    };

    // Build individual info and generate KHQR string
    const individualInfo = new IndividualInfo(
      myBakongId,
      myName,
      myCity,
      optionalData
    );

    const KHQR = new BakongKHQR();
    const result = KHQR.generateIndividual(individualInfo);

    if (!result || result.status?.code !== 0) {
      const message = result?.status?.message ?? "Unknown bakong-khqr error";
      throw new Error(message);
    }

    const { qr: qrString, md5 } = result.data;
    const orderId = `ORD-${Date.now()}`;


const supabase = createClient();
await supabase.from("payments").insert({
  order_ref: orderId,
  md5,
  qr_string: qrString,
  amount,
  currency: optionalData.currency,
  status: "PENDING"
});


    return NextResponse.json({ qr_string: qrString, md5, orderId, expiresAt: optionalData.expirationTimestamp });
  } catch (err: any) {
    console.error("Generate QR Error:", err);
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}
