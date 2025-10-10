import { Header } from "@/components/header"
import { FeaturesSection } from "@/components/feature"
import { HeroSection } from "@/components/hero"

export default function Home() {
  return (
    // This div now acts as the main container for the entire page,
    // providing a consistent background for all sections within it.
    <div className="bg-gradient-to-br from-[#1a1f3a] via-[#2d2550] to-[#3d2d5f]">
      <Header />

      <main>
        {/* Hero Section Container */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <HeroSection />
        </div>

        {/* Features Section is now inside the main container */}
        <FeaturesSection />
      </main>
    </div>
  )
}

