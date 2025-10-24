"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { FeaturesSection } from "@/components/feature";
import { HeroSection } from "@/components/hero";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[#1a1f3a] via-[#2d2550] to-[#3d2d5f] overflow-x-hidden">
      <div className="fixed w-full z-50">
        <Header />
      </div>

      <main>
        {/* Hero Section with fade + slide animation */}
        <motion.div
          className="container mx-auto px-4 py-16 md:py-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroSection />
        </motion.div>

        {/* Features Section with slight delay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <FeaturesSection />
        </motion.div>
      </main>

      <motion.footer
        className="mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Footer />
      </motion.footer>
    </div>
  );
}
