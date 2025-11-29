"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function CheckoutPage() {
  const { user } = useUser();
  const userId = user?.id;

  const params = useSearchParams();
  const amountParam = params.get("amount");
  const amount = Number(amountParam) || 1.49;

  const [loading, setLoading] = useState(false);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [tranId, setTranId] = useState<string | null>(null);

  const router = useRouter();

  // Generate PayWay QR
  async function createPaywayQR() {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/payment/payway/generate-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, user_id: userId }),
      });

      const resData = await res.json();
      if (resData.error) {
        alert("PayWay Error: " + resData.error);
        return;
      }

      const imageString = resData.qr_image || resData.qrImage;

      if (!imageString) {
        console.error("Missing QR image in response:", resData);
        alert("Received response but no QR image found.");
        return;
      }

      setQrImage(imageString);
      setTranId(resData.tran_id);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PayWay QR");
    } finally {
      setLoading(false);
    }
  }

  const hasCalledAPI = useRef(false);
  useEffect(() => {
    if (hasCalledAPI.current) return;
    hasCalledAPI.current = true;
    createPaywayQR();
  }, []);


  useEffect(() => {
    // Wait until we actually have a User ID
    if (!userId) return; 

    // If we already called it, stop.
    if (hasCalledAPI.current) return;

    hasCalledAPI.current = true;
    createPaywayQR();

    // Add userId to dependencies so it runs when user loads
  }, [userId]);
  // Poll PayWay Status
  useEffect(() => {
    if (!tranId) return;

    const checkPaywayStatus = async () => {
      try {
        const res = await fetch(`/api/payment/status?tran_id=${tranId}`);
        if (res.ok) {
          const d = await res.json();
          if (d.status === "PAID" || d.status === "SUCCESS") {
            router.push(`/success?tranId=${tranId}`);
          }
        }
      } catch (e) {
        console.error("PayWay poll error", e);
      }
    };

    const id = setInterval(checkPaywayStatus, 3000);
    return () => clearInterval(id);
  }, [tranId, router]);

  // Simulate PayWay Success
  async function simulatePayWaySuccess() {
    if (!tranId) {
      alert("No transaction ID available. Please wait for QR.");
      return;
    }

    try {
      const res = await fetch("/api/payment/payway/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tran_id: tranId, amount }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("✅ Payment Simulated! Wait for automatic redirect...");
      } else {
        alert("Simulation failed: " + (data.error || JSON.stringify(data)));
      }
    } catch (e) {
      console.error(e);
      alert("Error simulating payment");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Scan to pay</h2>
        <p className="mb-2">Amount: <strong>{amount} USD</strong></p>

        {loading ? (
          <div className="h-64 flex items-center justify-center">Generating...</div>
        ) : qrImage ? (
          <>
            <div className="flex flex-col items-center justify-center mb-4">
              <img
                src={qrImage}
                alt="PayWay QR"
                className="w-64 max-w-xs h-auto p-2 rounded-lg border shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-2">Scan with ABA Mobile</p>
            </div>

            {process.env.NODE_ENV === "development" && (
              <button
                onClick={simulatePayWaySuccess}
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                [DEV] Simulate PayWay Success
              </button>
            )}
          </>
        ) : (
          <p className="text-red-500">Failed to create QR</p>
        )}
      </div>
    </div>
  );
}
