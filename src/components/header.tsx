import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-white/10 bg-gradient-from/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 1. The Logo is now by itself on the left */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-sans text-xl font-bold text-primary-foreground">A</span>
          </div>
          <span className="font-sans text-xl font-semibold text-white">AutoFiller</span>
        </Link>

        {/* 2. The <nav> element is now in the center */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link href="/" className="text-sm font-medium text-white/90 transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
            Pricing
          </Link>
          {/* <Link
            href="/configuration"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Configuration
          </Link> */}
          <Link href="/extension" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
            Extension
          </Link>
          <Link href="/about" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
            About
          </Link>
        </nav>

        {/* 3. The buttons remain on the right */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/10 hover:text-white">
            <Moon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="text-white/90 hover:bg-white/10 hover:text-white">
            Sign In
          </Button>
          <Button className="bg-primary font-medium text-primary-foreground hover:bg-primary/90">Sign Up</Button>
        </div>
      </div>
    </header>
  )
}