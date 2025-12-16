"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" 
import { Lock, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client" 

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()

  
  useEffect(() => {
    setIsReady(true)
  }, [])

  async function handleUpdate() {
    if (newPassword !== confirmPassword) {
      setMessage("Error: Passwords do not match.")
      return
    }

    if (newPassword.length < 6) {
      setMessage("Error: Password must be at least 6 characters.")
      return
    }

    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      console.error("Password Update Error:", error)
      setMessage("An error occurred during password update Or New password cannot be the same as the old one. Please try the reset link again.")
      setLoading(false)
    } else {
      setMessage("Password successfully updated! Redirecting to login...")
      setLoading(false)
      setTimeout(() => {
        router.push("/sign-in?message=Your password has been successfully reset.")
      }, 2000)
    }
  }

  if (loading && !message) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#4a2c6f] text-white">
              <Loader2 className="animate-spin w-8 h-8 mr-2" />
              Loading...
          </div>
      )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#4a2c6f] p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Set New Password</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
              <Input
                type="password"
                placeholder="Enter new password (min 6 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading || !isReady}
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-purple-300 h-12 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading || !isReady}
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-purple-300 h-12 rounded-xl"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleUpdate} 
            disabled={loading || !newPassword || !confirmPassword || !isReady}
            className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-xl"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
            ) : (
              <Check className="w-5 h-5 mr-2" />
            )}
            Update Password
          </Button>
        </div>

        {message && (
          <p className={`mt-4 text-center text-sm ${message.startsWith("Error") ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
