"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleReset() {
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset-password`,
    })

    if (error) setMessage("Error: " + error.message)
    else setMessage("Password reset link sent to your email.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0b2e]">
      <div className="p-6 bg-white/10 rounded-xl w-80 text-center ">
        <h1 className="text-xl text-white mb-4">Forgot Password?</h1>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 text-white"
        />
        <Button onClick={handleReset} className="w-full">
          Send Reset Link
        </Button>
        {message && <p className="text-sm text-purple-200 mt-3">{message}</p>}
      </div>
    </div>
  )
}
    