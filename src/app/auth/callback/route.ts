// import { NextResponse } from 'next/server'
// import { createClient } from '@/utils/supabase/server'

// export async function GET(request: Request) {
//   const requestUrl = new URL(request.url)
//   const code = requestUrl.searchParams.get('code')
//   const origin = requestUrl.origin

//   if (code) {
//     const supabase = await createClient()
//     await supabase.auth.exchangeCodeForSession(code)
//   }

//   return NextResponse.redirect(`${origin}/private`)
// }

import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  // 1. Check if there is a 'next' param, otherwise default to '/private'
  const next = requestUrl.searchParams.get('next') || '/private'
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // 2. Redirect to the specific page (e.g., /reset-password)
  return NextResponse.redirect(`${origin}${next}`)
}