// src/app/payment/success/page.tsx
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const sp = useSearchParams();
  const orderId = sp.get("orderId") || "";

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
        <p className="mt-4">Order: <strong>{orderId}</strong></p>
        <p className="mt-2 text-gray-600">We’ve recorded your payment (mock).</p>
      </div>
    </div>
  );
}
