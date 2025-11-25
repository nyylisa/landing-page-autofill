// src/app/api/payment/save/route.ts
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json();
  const { md5, orderId, qr_string, amount, currency, metadata } = body;

  if (!md5 || !orderId || !qr_string) {
    return NextResponse.json({ error: "md5, orderId and qr_string required" }, { status: 400 });
  }
  

  return NextResponse.json({ success: true });
}
