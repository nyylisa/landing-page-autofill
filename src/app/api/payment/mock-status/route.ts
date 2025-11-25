// src/app/api/payment/mock-status/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

// GET — check payment status
export async function GET(req: Request) {
  const url = new URL(req.url);
  const md5 = url.searchParams.get("md5");
  if (!md5) return NextResponse.json({ error: "md5 required" }, { status: 400 });
  const supabase = createClient();
  const { data: rec, error } = await supabase
    .from("payments")
    .select("*")
    .eq("md5", md5)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!rec) return NextResponse.json({ md5, status: "NOT_FOUND" }, { status: 404 });

  const ttl = Math.max(0, (rec.expiresAt ?? 0) - Date.now());

  return NextResponse.json({
    md5: rec.md5,
    status: rec.status,
    amount: rec.amount,
    orderId: rec.order_ref,
    expiresAt: rec.expiresAt,
    expiresInMs: ttl
  });
}

// POST — simulate payment (dev only)
export async function POST(req: Request) {
  const body = await req.json();
  const md5 = body?.md5;
  if (!md5) return NextResponse.json({ error: "md5 required" }, { status: 400 });

  // Update payment status to SUCCESS
  const supabase = createClient();
  const { data, error } = await supabase
    .from("payments")
    .update({ status: "SUCCESS" })
    .eq("md5", md5)
    .select()
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ md5, status: "FAILED_OR_NOT_FOUND" }, { status: 400 });
  }

  return NextResponse.json({ md5, status: "SUCCESS" });
}
