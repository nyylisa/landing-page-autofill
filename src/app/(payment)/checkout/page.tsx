// // app/(payment)/checkout/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { QRCodeSVG } from 'qrcode.react'; 

// export default function CheckoutPage() {
//   // You can pass params via URL like /checkout?amount=5
//   const searchParams = useSearchParams();
//   const amount = parseFloat(searchParams.get('amount') || '5.00');
  
//   const [qrString, setQrString] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Automatically generate QR when page loads
//     async function fetchQR() {
//       try {
//         const res = await fetch('/api/payment/bakong', {
//           method: 'POST',
//           body: JSON.stringify({ amount }),
//         });
//         const data = await res.json();
//         setQrString(data.qr_string);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchQR();
//   }, [amount]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
//         <h1 className="text-2xl font-bold mb-6">Scan to Pay</h1>
        
//         {loading ? (
//           <div className="h-64 flex items-center justify-center">
//             <p className="animate-pulse text-gray-500">Generating QR...</p>
//           </div>
//         ) : qrString ? (
//           <div className="flex justify-center mb-6">
//              <div className="border-4 border-red-600 p-2 rounded-lg">
//                <QRCodeSVG value={qrString} size={256} />
//              </div>
//           </div>
//         ) : (
//           <p className="text-red-500">Failed to load QR Code</p>
//         )}

//         <p className="text-lg font-bold mt-4">Total: ${amount.toFixed(2)}</p>
//         <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg">
//           I Have Paid
//         </button>
//       </div>
      
//     </div>
//   );
// }

// src/app/payment/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [amount, setAmount] = useState<number>(1000); // default amount
  const [qrString, setQrString] = useState<string | null>(null);
  const [md5, setMd5] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function createQR() {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/bakong", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (data.error) {
        alert("Error: " + data.error);
        return;
      }
      setQrString(data.qr_string);
      setMd5(data.md5);
      setExpiresAt(data.expiresAt);
    } catch (err) {
      console.error(err);
      alert("Failed to generate QR");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    createQR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // countdown
  useEffect(() => {
    if (!expiresAt) return;
    const id = setInterval(() => {
      const msLeft = Math.max(0, (expiresAt || 0) - Date.now());
      setRemaining(msLeft);
      if (msLeft <= 0) clearInterval(id);
    }, 500);
    return () => clearInterval(id);
  }, [expiresAt]);

  // poll status and navigate on success
  useEffect(() => {
    if (!md5) return;
    let mounted = true;
    const check = async () => {
      try {
        const res = await fetch(`/api/payment/mock-status?md5=${encodeURIComponent(md5)}`);
        if (!res.ok) return;
        const d = await res.json();
        if (!mounted) return;
        if (d.status === "SUCCESS") {
          router.push(`/payment/success?orderId=${encodeURIComponent(d.orderId || "")}`);
        } else if (d.status === "EXPIRED") {
          // optional: auto-refresh the QR
          // createQR();
        }
      } catch (e) {
        console.error("poll error", e);
      }
    };
    const id = setInterval(check, 2000);
    check();
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [md5, router]);

  async function simulatePay() {
    if (!md5) return;
    const res = await fetch("/api/payment/mock-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ md5 }),
    });
    const d = await res.json();
    if (d.status === "SUCCESS") {
      // frontend will redirect by poll
    } else {
      alert("Failed to mark as paid (maybe expired).");
    }
  }

  function formatMs(ms: number) {
    const s = Math.floor(ms / 1000);
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${mm}:${String(ss).padStart(2, "0")}`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Scan to pay</h2>

        <p className="mb-2">Amount: <strong>{amount} KHR</strong></p>

        {loading ? (
          <div className="h-64 flex items-center justify-center">Generating...</div>
        ) : qrString ? (
          <>
            <div className="flex justify-center mb-4">
              <div className="border-4 border-gray-200 p-2 rounded-lg">
                <QRCodeSVG value={qrString} size={280} />
              </div>
            </div>

            

            <p className="mb-2">Expires in: <strong>{formatMs(remaining)}</strong></p>

            <div className="flex gap-2 mt-4">
              <button onClick={simulatePay} className="flex-1 bg-green-600 text-white py-2 rounded-lg">
                Simulate Pay (dev)
              </button>
              <button onClick={() => location.reload()} className="flex-1 border py-2 rounded-lg">
                Regenerate
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-500">Failed to create QR</p>
        )}
      </div>
    </div>
  );
}
