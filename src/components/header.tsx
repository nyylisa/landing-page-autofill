// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Menu, X } from "lucide-react"
// import { usePathname } from "next/navigation"
// import { createClient } from "@/utils/supabase/client"

// export function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [user, setUser] = useState<any>(null)
//   const pathname = usePathname()

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "Pricing", href: "/pricing" },
//     { name: "Extension", href: "/extension" },
//     { name: "About", href: "/about" },
//   ]

//   // 👇 Check user login status
//   useEffect(() => {
//     const supabase = createClient()

//     supabase.auth.getUser().then(({ data }) => {
//       setUser(data.user)
//     })

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user || null)
//     })

//     return () => {
//       listener.subscription.unsubscribe()
//     }
//   }, [])

//   // 👇 Logout handler
//   async function handleLogout() {
//     const supabase = createClient()
//     await supabase.auth.signOut()
//     setUser(null)
//     window.location.href = "/" // Redirect to landing page
//   }

//   return (
//     <header className="border-b border-white/10 bg-gradient-from/50 backdrop-blur-sm">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
//             <span className="font-sans text-xl font-bold text-primary-foreground">A</span>
//           </div>
//           <span className="font-sans text-xl font-semibold text-white sm:text-sm">
//             AutoFiller
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-10">
//           {navItems.map(({ name, href }) => (
//             <Link
//               key={name}
//               href={href}
//               className={`text-sm font-medium transition-colors ${
//                 pathname === href ? "text-white" : "text-white/70 hover:text-white"
//               }`}
//             >
//               {name}
//             </Link>
//           ))}
//         </nav>

//         {/* Right Side Buttons */}
//         <div className="flex items-center gap-3">
//           <div className="hidden sm:flex items-center gap-2">
//             {user ? (
//               <>
//                 <Link href="/account">
//                   <Button className="bg-primary font-medium text-primary-foreground hover:bg-primary/90">
//                     Account
//                   </Button>
//                 </Link>
//                 <Button
//                   onClick={handleLogout}
//                   variant="ghost"
//                   className="text-white/90 hover:bg-white/10 hover:text-white"
//                 >
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link href="/sign-in">
//                   <Button
//                     variant="ghost"
//                     className="text-white/90 hover:bg-white/10 hover:text-white"
//                   >
//                     Sign In
//                   </Button>
//                 </Link>
//                 <Link href="/sign-up">
//                   <Button className="bg-primary font-medium text-primary-foreground hover:bg-primary/90">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Hamburger Menu */}
//           <button
//             className="md:hidden text-white hover:text-primary transition"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-md">
//           <nav className="flex flex-col items-start gap-4 px-6 py-4 text-white text-sm">
//             {navItems.map(({ name, href }) => (
//               <Link key={name} href={href} onClick={() => setIsMenuOpen(false)}>
//                 {name}
//               </Link>
//             ))}

//             <div className="flex flex-col gap-2 w-full pt-2">
//               {user ? (
//                 <>
//                   <Link href="/account" onClick={() => setIsMenuOpen(false)}>
//                     <Button className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90">
//                       Account
//                     </Button>
//                   </Link>
//                   <Button
//                     onClick={handleLogout}
//                     variant="ghost"
//                     className="w-full text-white/90 hover:bg-white/10 hover:text-white"
//                   >
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
//                     <Button
//                       variant="ghost"
//                       className="w-full text-white/90 hover:bg-white/10 hover:text-white"
//                     >
//                       Sign In
//                     </Button>
//                   </Link>
//                   <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
//                     <Button className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90">
//                       Sign Up
//                     </Button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   )
// }

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useUser } from "@/app/context/UserContext"
import { createClient } from "@/utils/supabase/client"

export function Header() {
  const { user, loading } = useUser()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/" // keep the redirect
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Extension", href: "/extension" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="border-b border-white/10 bg-gradient-from/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-bold text-primary-foreground">A</span>
          </div>
          <span className="font-semibold text-white">AutoFiller</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={pathname === item.href ? "text-white" : "text-white/70 hover:text-white"}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            {!loading && (user ? (
              <>
                <Link href="/account">
                  <Button className="bg-primary font-medium hover:bg-primary/90 text-white">
                    Account
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}  // ✅ keep your logout logic
                  variant="ghost"
                  className="text-white/90 hover:bg-white/10 hover:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-white/90 hover:bg-white/10 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-primary font-medium text-primary-foreground hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-md">
          <nav className="flex flex-col items-start gap-4 px-6 py-4 text-white text-sm">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </Link>
            ))}

            <div className="flex flex-col gap-2 w-full pt-2">
              {!loading && (user ? (
                <>
                  <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90">
                      Account
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}  // ✅ again, original logout
                    variant="ghost"
                    className="w-full text-white/90 hover:bg-white/10 hover:text-white"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full text-white/90 hover:bg-white/10 hover:text-white"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

