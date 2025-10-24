"use server"

import { createClient } from "@/utils/supabase/server"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  const supabase = await createClient()

  // 🧠 Step 1: Try signing up
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  // 🧩 Step 2: Detect existing email
  if (data?.user && data.user.identities && data.user.identities.length === 0) {
    return { success: false, message: "This email is already registered. Please sign in instead." }
  }

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true }
}
