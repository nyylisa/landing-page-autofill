import { NextResponse } from 'next/server';
// @ts-ignore
const { BakongKHQR, khqrData, IndividualInfo } = require("bakong-khqr");

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    // 1. Setup Variables
    const myBakongId = "lisa@aclb"; // REPLACE WITH YOUR REAL ID
    const myName = "LISA NY";           // REPLACE WITH YOUR REAL NAME
    const myCity = "PHNOM PENH";

    // 2. Setup Optional Data (CRITICAL FIXES HERE)
    const optionalData = {
      // Ensure currency is correct (try hardcoding if khqrData is undefined)
      currency: khqrData?.currency?.usd || "840", 
      
      // Ensure amount is a NUMBER, not a string
      amount: Number(amount), 
      
      // REQUIRED: If you have an amount, you MUST have an expiration
      expirationTimestamp: Date.now() + (15 * 60 * 1000), // 15 minutes from now
      
      storeLabel: "My SaaS Product",
      terminalLabel: "Web_Checkout",
    };

    console.log("Generating QR with:", { myBakongId, myName, optionalData });

    // 3. Create Info Object
    const individualInfo = new IndividualInfo(
      myBakongId, 
      myName, 
      myCity, 
      optionalData
    );

    // 4. Generate
    const KHQR = new BakongKHQR();
    const individual = KHQR.generateIndividual(individualInfo);

    // 5. DEBUGGING: Check the status code
    console.log("Library Response:", JSON.stringify(individual, null, 2));

    // If code is NOT 0, it failed. Let's see why.
    if (individual.status.code !== 0) {
      throw new Error(`Bakong Library Error: ${individual.status.message || "Unknown Error"}`);
    }

    if (!individual.data) {
      throw new Error("Generated data is null");
    }

    return NextResponse.json({ 
      qr_string: individual.data.qr,
      md5: individual.data.md5 
    });

  } catch (error: any) {
    console.error("Payment API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}