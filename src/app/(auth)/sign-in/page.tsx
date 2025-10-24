"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
<<<<<<< HEAD
<<<<<<< HEAD
=======
import LoadingSpinner from "@/components/ui/loading-spinner"
>>>>>>> auth-testing
=======
>>>>>>> 9a004baf39ea60ee0766e563a37870170b62d520
import { signIn } from "./signin"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)

    setLoading(false)

    if (result.success) {
      router.push("/homepage")
    } else {
      setError(result.message || "An unexpected error occurred.")
    }
  }
>>>>>>> auth-testing
=======
>>>>>>> 9a004baf39ea60ee0766e563a37870170b62d520

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#4a2c6f] justify-center">
      {loading && <LoadingSpinner text="Signing you in..." />}

      <div className="fixed w-full z-50">
        <Header />
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 mt-20">
            <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
            <p className="text-purple-200">Sign in to continue automating your forms</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
<<<<<<< HEAD
<<<<<<< HEAD
            <form action={signIn} className="space-y-6">
=======
            <form onSubmit={handleSubmit} className="space-y-6">
>>>>>>> auth-testing
=======
            <form action={signIn} className="space-y-6">
>>>>>>> 9a004baf39ea60ee0766e563a37870170b62d520
              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <Input
                    type="email"
<<<<<<< HEAD
<<<<<<< HEAD
                    name="email"               // ✅ Add name attribute
=======
                    name="email"
>>>>>>> auth-testing
=======
                    name="email"               // ✅ Add name attribute
>>>>>>> 9a004baf39ea60ee0766e563a37870170b62d520
                    placeholder="Enter your email"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-purple-300 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <Input
                    type={showPassword ? "text" : "password"}
<<<<<<< HEAD
<<<<<<< HEAD
                    name="password"           // ✅ Add name attribute
=======
                    name="password"
>>>>>>> auth-testing
=======
                    name="password"           // ✅ Add name attribute
>>>>>>> 9a004baf39ea60ee0766e563a37870170b62d520
                    placeholder="Enter your password"
                    className="pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-purple-300 h-12 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
              {error && <p className="text-red-400 text-center">{error}</p>}

>>>>>>> auth-testing
=======
>>>>>>> 9a004baf39ea60ee0766e563a37870170b62d520
              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-xl"
              >
                Sign in
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

            <p className="mt-6 text-center text-purple-200">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  )
}
