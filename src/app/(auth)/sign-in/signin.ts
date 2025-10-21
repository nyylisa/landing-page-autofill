"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string | null
  const password = formData.get("password") as string | null

  if (!email || !password) {
    // Handle empty fields
    redirect("/error?message=Missing email or password")
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Redirect to error page with message
    redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  // Successful login → redirect to homepage
  redirect("/homepage")
}
