// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import { createClient } from "@supabase/supabase-js"; // 1. CHANGE THIS IMPORT

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     console.log("🔔 PayWay Webhook Received:", body.tran_id, body.status);

//     const {
//       req_time, merchant_id, tran_id, amount, items, payout,
//       firstname, lastname, email, phone, type,
//       payment_option, currency, status, hash
//     } = body;

//     // 1. Re-calculate Hash to verify sender
//     const strForHash =
//       req_time + merchant_id + tran_id + amount + (items || "") +
//       (firstname || "") + (lastname || "") + (email || "") + (phone || "") + (type || "") +
//       (payment_option || "") + (currency || "") + status + (payout || "");

//     const generatedHash = crypto
//       .createHmac("sha512", process.env.PAYWAY_API_KEY!)
//       .update(strForHash)
//       .digest("base64");

//     if (hash !== generatedHash) {
//       console.error("❌ Hash Mismatch! Potential Fraud.");
//       return NextResponse.json({ status: { code: "1", message: "Invalid Hash" } });
//     }

//     // 2. Update Database
//     if (status === "COMPLETED" || status === "APPROVED" || status === "0") {
      
//       // 3. USE SERVICE ROLE KEY (Admin Power)
//       // This bypasses all RLS rules so the robot can update the row.
//       const supabaseAdmin = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.SUPABASE_SERVICE_ROLE_KEY!
//       );
      
//       const { data, error } = await supabaseAdmin
//         .from("payments")
//         .update({ 
//             payway_status: "PAID",
//             updated_at: new Date().toISOString()
//         })
//         .eq("payway_tran_id", tran_id)
//         .select(); // 4. ADD THIS to confirm the row was actually found

//       if (error) {
//         console.error("❌ DB Update Failed:", error);
//       } else if (data.length === 0) {
//         // This is the "Ghost Update" catch
//         console.error("⚠️ WARNING: Update ran, but NO row was found with ID:", tran_id);
//         console.error("👉 Check: Did you generate the QR properly? Is the ID correct?");
//       } else {
//         console.log("✅ SUCCESS: Database updated to PAID for", tran_id);
//       }
//     }

//     return NextResponse.json({ status: { code: "0", message: "Success", tran_id } });

//   } catch (err) {
//     console.error("Webhook Error:", err);
//     return NextResponse.json({ status: { code: "1", message: "Internal Error" } });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🔔 PayWay Webhook Received:", body.tran_id, body.status);

    const {
      req_time, merchant_id, tran_id, amount, items, payout,
      firstname, lastname, email, phone, type,
      payment_option, currency, status, hash
    } = body;

    // 1. Validate Hash
    const strForHash =
      req_time + merchant_id + tran_id + amount + (items || "") +
      (firstname || "") + (lastname || "") + (email || "") + (phone || "") + (type || "") +
      (payment_option || "") + (currency || "") + status + (payout || "");

    const generatedHash = crypto
      .createHmac("sha512", process.env.PAYWAY_API_KEY!)
      .update(strForHash)
      .digest("base64");

    if (hash !== generatedHash) {
      console.error("❌ Hash Mismatch!");
      return NextResponse.json({ status: { code: "1", message: "Invalid Hash" } });
    }

    // 2. Update Database
    if (status === "COMPLETED" || status === "APPROVED" || status === "0") {
      
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY! 
      );

      // --- CALCULATE EXPIRATION (30 Days) ---
      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 30); // Add 30 days
      // --------------------------------------
      
      const { data, error } = await supabaseAdmin
        .from("payments")
        .update({ 
            payway_status: "PAID",
            updated_at: today.toISOString(),
            expires_at: expirationDate.toISOString() // <--- SAVING IT HERE
        })
        .eq("payway_tran_id", tran_id)
        .select();

      if (error) {
        console.error("❌ DB Update Failed:", error.message);
      } else {
        console.log("✅ SUCCESS: Plan active until:", expirationDate.toISOString());
      }
    }

    return NextResponse.json({ status: { code: "0", message: "Success", tran_id } });

  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ status: { code: "1", message: "Internal Error" } });
  }
}