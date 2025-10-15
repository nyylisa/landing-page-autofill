

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname()

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
            <span className="font-sans text-xl font-bold text-primary-foreground">A</span>
          </div>
          <span className="font-sans text-xl font-semibold text-white sm:text-sm">
            AutoFiller
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {name}
            </Link>
          ))}
        
        
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Button */}
          

          {/* Sign In + Sign Up Buttons (hidden on sm) */}
          <div className="hidden sm:flex items-center gap-2">
  <Link href="/sign-in">
    <Button
      variant="ghost"
      className="text-white/90 hover:bg-white/10 hover:text-white"
    >
      Sign In
    </Button>
  </Link>

  <Link href="/sign-up">
    <Button className="bg-primary font-medium text-primary-foreground hover:bg-primary/90">
      Sign Up
    </Button>
  </Link>
</div>

          {/* Hamburger Menu (visible only on sm and below) */}
          <button
            className="md:hidden text-white hover:text-primary transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (only visible when open) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-md">
          <nav className="flex flex-col items-start gap-4 px-6 py-4 text-white text-sm">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/extension" onClick={() => setIsMenuOpen(false)}>
              Extension
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>

            {/* Move Sign In + Sign Up here for mobile */}
            <div className="flex flex-col gap-2 w-full pt-2">
              <Button
                variant="ghost"
                className="w-full text-white/90 hover:bg-white/10 hover:text-white"
              >
                Sign In
              </Button>
              <Button className="w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
