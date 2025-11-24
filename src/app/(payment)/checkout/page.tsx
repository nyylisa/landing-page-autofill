// app/(payment)/checkout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react'; 

export default function CheckoutPage() {
  // You can pass params via URL like /checkout?amount=5
  const searchParams = useSearchParams();
  const amount = parseFloat(searchParams.get('amount') || '5.00');
  
  const [qrString, setQrString] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Automatically generate QR when page loads
    async function fetchQR() {
      try {
        const res = await fetch('/api/payment/bakong', {
          method: 'POST',
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        setQrString(data.qr_string);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchQR();
  }, [amount]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Scan to Pay</h1>
        
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <p className="animate-pulse text-gray-500">Generating QR...</p>
          </div>
        ) : qrString ? (
          <div className="flex justify-center mb-6">
             <div className="border-4 border-red-600 p-2 rounded-lg">
               <QRCodeSVG value={qrString} size={256} />
             </div>
          </div>
        ) : (
          <p className="text-red-500">Failed to load QR Code</p>
        )}

        <p className="text-lg font-bold mt-4">Total: ${amount.toFixed(2)}</p>
        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg">
          I Have Paid
        </button>
      </div>
    </div>
  );
}