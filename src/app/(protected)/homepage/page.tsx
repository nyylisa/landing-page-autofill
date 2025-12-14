import { Header } from "@/components/header"
import { FeaturesSection } from "@/components/feature"
import { HeroSection } from "@/components/hero"
import {Footer} from "@/components/footer"
import { createClient } from "@/utils/supabase/client";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  

  return (
    <div className="bg-gradient-to-br from-[#1a1f3a] via-[#2d2550] to-[#3d2d5f] overflow-x-hidden">
      <div className="fixed w-full z-50">
        <Header />
      </div>

      <main>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <HeroSection />
        </div>
        <FeaturesSection />
      </main>
      <footer className="mt-20">
        <Footer />
      </footer>
    </div>
  )
}

