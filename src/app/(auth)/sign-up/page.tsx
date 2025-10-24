"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
// import { Checkbox } from "@/components/ui/checkbox"
import { signUp } from "./signup";
import { createClient } from "@/utils/supabase/client"

export default function SignUpPage() {  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError(null)
      setLoading(true)
  
      const formData = new FormData(e.currentTarget)
      const result = await signUp(formData)
  
      setLoading(false)
  
      if (result.success) {
        alert("Sign-up successful! Please check your email to verify your account.")
        router.push("/private")
      } else {
        alert(result.message)
      }
    }

const handleGoogleSignUp = async () => {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/homepage`,
    },
  });
};


  

  

const handleGoogleSignUp = async () => {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/homepage`,
    },
  });
};


  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#4a2c6f] justify-center">
      {loading && <LoadingSpinner text="Creating account..." />}
      
      <div className="fixed w-full z-50">
        <Header />
      </div>
      <div className="flex items-center justify-center">

      
      <div className="w-full max-w-md">
        <div className="text-center mb-8 mt-20">
          <h1 className="text-4xl font-bold text-white mb-3">Create Account</h1>
          <p className="text-purple-200">Join thousands of users automating their forms</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <form action={signUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <Input
                    type="text"
                    placeholder=""
                    name="firstName"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-purple-300 h-12 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <Input
                    type="text"
                    placeholder=""
                    name="lastName"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-purple-300 h-12 rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <Input
                  type="email"
                  placeholder="john@example.com"
                  name="email"
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-purple-300 h-12 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  name="password"
                  className="pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-purple-300 h-12 rounded-xl"
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

            <div>
              <label className="block text-white font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-purple-300 h-12 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              {/* <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-1 border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
              /> */}
              <label htmlFor="terms" className="text-sm text-purple-200 cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-xl">
              Create Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-purple-300">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleGoogleSignUp}
                variant="outline"
                className="h-12 w-60 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              
            </div>
          </div>

          <p className="mt-6 text-center text-purple-200">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Sign in
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
