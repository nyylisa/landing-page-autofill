"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Zap, Crown, Rocket, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
// import { Switch } from "@/components/ui/switch"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      description: "Perfect for individual users",
      monthlyPrice: 9,
      yearlyPrice: 90,
      features: [
        "Up to 100 form fills per month",
        "Basic form detection",
        "Profile management",
        "Chrome extension",
        "Email support",
        "Basic analytics",
      ],
    },
    {
      name: "Professional",
      icon: Crown,
      description: "Ideal for power users and professionals",
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: true,
      features: [
        "Unlimited form fills",
        "Advanced AI form detection",
        "Unlimited profiles",
        "Custom field mapping",
        "Team collaboration (5 seats)",
        "Priority support",
        "Advanced analytics",
        "CSV import/export",
        "API access",
        "Custom shortcuts",
      ],
    },
    {
      name: "Enterprise",
      icon: Rocket,
      description: "For teams and organizations",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "Everything in Professional",
        "Unlimited team seats",
        "SSO integration",
        "Advanced security features",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "White-label options",
        "Advanced compliance",
        "Training & onboarding",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a3e] via-[#2d1b4e] to-[#4a2c5e]">
      {/* Navigation */}
      <div className="fixed w-full z-50">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="mb-4 text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Choose{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Your Perfect Plan
          </span>
        </h1>
        <p className="mb-8 text-lg text-gray-300">
          Start your journey with AutoFiller and experience the future of form filling.
          <br />
          All plans include a 30-day free trial.
        </p>

        {/* Billing Toggle */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <span className={`text-sm ${!isYearly ? "font-semibold text-white" : "text-gray-400"}`}>Monthly</span>
          {/* <Switch checked={isYearly} onCheckedChange={setIsYearly} /> */}
          <span className={`text-sm ${isYearly ? "font-semibold text-white" : "text-gray-400"}`}>Yearly</span>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 ${
                  plan.popular
                    ? "border-cyan-400/50 bg-gradient-to-b from-[#2d3b6e] to-[#3d2b5e]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6 flex justify-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                      plan.popular ? "bg-gradient-to-br from-cyan-400 to-purple-500" : "bg-white/10"
                    }`}
                  >
                    <Icon className={`h-8 w-8 ${plan.popular ? "text-white" : "text-cyan-400"}`} />
                  </div>
                </div>

                <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mb-6 text-sm text-gray-400">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">${price}</span>
                  <span className="text-gray-400">/{isYearly ? "year" : "month"}</span>
                </div>

                <ul className="mb-8 space-y-3 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white hover:from-cyan-500 hover:to-purple-600"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Start Free Trial
                </Button>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
