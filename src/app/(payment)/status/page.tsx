

"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function StatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tranId = searchParams.get("tranId") || searchParams.get("tran_id") || "";
  
  const [status, setStatus] = useState("LOADING");

  useEffect(() => {
    if (!tranId) {
      setStatus("NO_ID");
      return;
    }

    let mounted = true;

    const checkStatus = async () => {
      try {
        console.log("Checking status for:", tranId); // Debug Log

        const res = await fetch(`/api/status?tran_id=${tranId}`, {
          cache: "no-store", 
          headers: { "Pragma": "no-cache" }
        });
        
        if (res.ok) {
          const data = await res.json();
          console.log("API Response:", data);
          
          if (!mounted) return;

          // 3. FIX: Accept "PAID", "COMPLETED", or "APPROVED"
          const s = data.status?.toUpperCase();
          if (s === "COMPLETED" || s === "PAID" || s === "APPROVED") {
            setStatus("SUCCESS");
            
            // Redirect after 3 seconds
            setTimeout(() => {
              router.push("/homepage"); 
            }, 3000);
            
          } else {
            // Keep waiting...
            setStatus("PENDING"); 
          }
        }
      } catch (error) {
        console.error("Status check failed", error);
      }
    };

    // Run immediately
    checkStatus();

    // Poll every 3 seconds
    const intervalId = setInterval(checkStatus, 3000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [tranId, router]);



  if (status === "LOADING" || status === "PENDING") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-700">Verifying Payment...</h2>
        <p className="text-gray-500 mt-2">Transaction ID: {tranId}</p>
        <p className="text-xs text-gray-400 mt-4">Do not close this window.</p>
      </div>
    );
  }

  if (status === "SUCCESS") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-green-100">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your plan is active.</p>
          <div className="mt-6 p-3 bg-green-100 text-green-800 rounded text-sm animate-pulse">
            Redirecting to dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">Payment Not Found</h2>
        <p className="text-gray-600 mb-6">We could not verify transaction: {tranId}</p>
        <Link href="/private" className="text-blue-600 hover:underline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function StatusPageWrapper() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <StatusPage />
    </Suspense>
  );
}