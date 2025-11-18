// "use server"

// import { createClient } from "@/utils/supabase/server"
// import { redirect } from "next/navigation"

// export async function signUp(formData: FormData) {
//   const email = formData.get("email") as string
//   const password = formData.get("password") as string
//   const firstName = formData.get("firstName") as string
//   const lastName = formData.get("lastName") as string

//   const supabase = await createClient()

//   // Try signing up
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: {
//         first_name: firstName,
//         last_name: lastName,
//       },
//     },
//   })

//   // Detect if email is already used
//   if (data?.user && data.user.identities && data.user.identities.length === 0) {
//     return { success: false, message: "This email is already registered. Please sign in instead." }
//   }

//   if (error) {
//     return { success: false, message: error.message }
//   }

//   // Optional: redirect after successful signup
//   redirect("/private")

//   return { success: true }
// }

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const supabase = await createClient();

  // Sign up user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  // Detect if email is already used
  if (data?.user && data.user.identities && data.user.identities.length === 0) {
    return { success: false, message: "This email is already registered. Please sign in instead." };
  }

  if (error) {
    return { success: false, message: error.message };
  }

  const userId = data.user?.id;
  if (!userId) {
    return { success: false, message: "User creation failed." };
  }

  // ✅ Automatically assign Starter plan
  const { error: planError } = await supabase.from("user_plans").insert({
    user_id: userId,
    plan: "Starter",
    active: true,
  });

  if (planError) {
    return { success: false, message: planError.message };
  }

  // Redirect after signup
  redirect("/private");

  return { success: true };
}
