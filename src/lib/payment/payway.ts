export async function startPayWayPayment(amount: number, userId?: string) {
  if (!userId) {
    alert("Please log in first");
    return;
  }

  try {
    const res = await fetch("/api/payment/payway", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, user_id: userId }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Payment failed");
      return;
    }

    const html = await res.text();
    const newWindow = window.open();
    if (newWindow) newWindow.document.write(html);
  } catch (err) {
    console.error(err);
    alert("Failed to start payment");
  }
}
