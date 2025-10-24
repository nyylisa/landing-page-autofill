import { createBrowserClient } from '@supabase/ssr'
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
<<<<<<< HEAD
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
=======
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
>>>>>>> auth-testing
  )
}