// src/app/payment/status/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function StatusPage() {
  const sp = useSearchParams();
  const md5 = sp.get("md5") || "";
  const [status, setStatus] = useState<string>("PENDING");
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    if (!md5) return;
    let mounted = true;
    const check = async () => {
      const res = await fetch(`/api/payment/mock-status?md5=${encodeURIComponent(md5)}`);
      if (!res.ok) {
        setStatus("NOT_FOUND");
        return;
      }
      const d = await res.json();
      if (!mounted) return;
      setStatus(d.status);
      setInfo(d);
    };
    check();
    const id = setInterval(check, 2000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [md5]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow max-w-lg w-full text-center">
        <h2 className="text-xl font-bold mb-2">Payment Status</h2>
        <p className="mb-4">MD5: <code>{md5}</code></p>
        <p className="text-lg font-semibold">Status: {status}</p>

        {info && (
          <pre className="text-sm mt-4 text-left bg-gray-50 p-3 rounded">{JSON.stringify(info, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
