// app/account/account.ts
import { createClient } from "@/utils/supabase/client";

// Fetch user data
export async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return null;

  // Return user info including email and metadata
  return {
    id: user.id,
    email: user.email,
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
  };
}

// Sign out user
export async function signOutUser() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}
