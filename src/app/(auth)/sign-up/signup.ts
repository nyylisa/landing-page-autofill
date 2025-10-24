"use server"

import { createClient } from "@/utils/supabase/server"
<<<<<<< HEAD
import { redirect } from "next/navigation"
=======
>>>>>>> auth-testing

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  const supabase = await createClient()

<<<<<<< HEAD
  const { error } = await supabase.auth.signUp({
=======
  // 🧠 Step 1: Try signing up
  const { data, error } = await supabase.auth.signUp({
>>>>>>> auth-testing
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

<<<<<<< HEAD
  if (error) {
    console.error(error.message)
    return
  }

  // Optionally redirect after successful signup
  redirect("/private")
=======
  // 🧩 Step 2: Detect existing email
  if (data?.user && data.user.identities && data.user.identities.length === 0) {
    return { success: false, message: "This email is already registered. Please sign in instead." }
  }

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true }
>>>>>>> auth-testing
}
