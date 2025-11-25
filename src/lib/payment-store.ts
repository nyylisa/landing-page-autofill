// src/lib/payment-store.ts
// Simple in-memory store for dev only. Replace with Supabase/DB for production.
export type PaymentRecord = {
  orderId: string;
  md5: string;
  qr: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCESS" | "EXPIRED";
  expiresAt: number; // epoch ms
  createdAt: number;
};

const store = new Map<string, PaymentRecord>(); // key = md5

export function savePayment(rec: PaymentRecord) {
  store.set(rec.md5, rec);
}

export function getPayment(md5: string) {
  return store.get(md5) ?? null;
}

export function markPaid(md5: string) {
  const r = store.get(md5);
  if (!r) return false;
  if (Date.now() > r.expiresAt) {
    r.status = "EXPIRED";
    store.set(md5, r);
    return false;
  }
  r.status = "SUCCESS";
  store.set(md5, r);
  return true;
}

export function expireOldPayments() {
  const now = Date.now();
  for (const [k, v] of store.entries()) {
    if (v.status === "PENDING" && now > v.expiresAt) {
      v.status = "EXPIRED";
      store.set(k, v);
    }
  }
}
