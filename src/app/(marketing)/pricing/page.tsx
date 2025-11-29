

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useUser } from "@/app/context/UserContext"; 
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function PricingPage() {
  const { user } = useUser();
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  const supabase = createClient();

  // 1. CHECK SUBSCRIPTION IN PAYMENTS TABLE
  useEffect(() => {
    if (!user?.id) {
        setUserPlan(null);
        return;
    }

    const checkSubscription = async () => {
      // Find a payment that is PAID and has NOT expired
      const { data } = await supabase
        .from("payments")
        .select("expires_at")
        .eq("user_id", user.id)
        .eq("payway_status", "PAID")
        .gt("expires_at", new Date().toISOString()) // Expiration > Now
        .order("expires_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
          setUserPlan("Professional");
      } else {
          setUserPlan("Starter");
      }
    };

    checkSubscription();
  }, [user]);

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      description: "Perfect for individual users",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { text: "Can generate dummy data", allowed: true },
        { text: "Limited to 20 uses", allowed: true },
        { text: "Cannot save generated info", allowed: false },
      ],
    },
    {
      name: "Professional",
      icon: Crown,
      description: "Ideal for power users and professionals",
      monthlyPrice: 1.49,
      yearlyPrice: 15.00,
      popular: true,
      features: [
        { text: "Can generate dummy data", allowed: true },
        { text: "Unlimited usage", allowed: true },
        { text: "Can save generated info", allowed: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a3e] via-[#2d1b4e] to-[#4a2c5e]">
      <div className="fixed w-full z-50">
        <Header />
      </div>

      <motion.div
        className="mx-auto max-w-7xl px-6 py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="mt-10 mb-2 text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Choose{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Your Perfect Plan
          </span>
        </h1>
        <p className="text-lg text-gray-300">
          Start your journey with AutoFiller and experience the future of form filling.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 justify-center mx-auto max-w-4xl px-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {plans.map((plan) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          const isCurrentPlan = userPlan === plan.name;
          
          // Logic: Show button only if user is logged in AND this is not their current plan.
          // Don't show button for Starter if they are logged in.
          const showButton = !user ? true : (!isCurrentPlan && plan.name !== "Starter");

          return (
            <motion.div
              key={plan.name}
              variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              className={`relative rounded-2xl border p-8 transition-all ${
                plan.popular
                  ? "border-cyan-400/50 bg-gradient-to-b from-[#2d3b6e] to-[#3d2b5e] shadow-lg shadow-cyan-500/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {isCurrentPlan && (
                <div className="absolute top-2 right-2">
                  <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    Current Plan
                  </span>
                </div>
              )}

              {plan.popular && !isCurrentPlan && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mb-6 text-sm text-gray-400">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-white">${price}</span>
                <span className="text-gray-400">/{isYearly ? "year" : "month"}</span>
              </div>

              <ul className="mb-8 space-y-3 text-left">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.allowed ? (
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
                    ) : (
                      <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                    )}
                    <span className="text-sm text-gray-300">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {showButton && (
                <Link href={user ? `/checkout?amount=${price}&method=payway` : "/sign-up"}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white hover:from-cyan-500 hover:to-purple-600"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {user ? "Upgrade Now" : "Get Started"}
                  </Button>
                </Link>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="pb-4">
        <Footer />
      </div>
    </div>
  );
}