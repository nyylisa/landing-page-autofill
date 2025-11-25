// src/app/api/payment/save/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function POST(req: Request) {
  const body = await req.json();
  const { md5, orderId, qr_string, amount, currency, metadata } = body;

  if (!md5 || !orderId || !qr_string) {
    return NextResponse.json({ error: "md5, orderId and qr_string required" }, { status: 400 });
  }
  const supabase = createClient();
  const { error } = await supabase.from("payments").insert({
    order_ref: orderId,
    md5,
    qr_string,
    amount: Number(amount) || 0,
    currency: currency || "116",
    metadata: metadata || null,
    status: "PENDING",
    created_at: new Date()
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
