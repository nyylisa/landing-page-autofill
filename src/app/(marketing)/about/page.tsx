import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#2d1b4e] to-[#1a1a2e]">
      {/* Navigation */}
      <div className="fixed w-full z-50">
        <Header />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="text-cyan-400 text-sm font-medium px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10">
              About AutoFiller
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
            Empowering Everyone to Save Time
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            We believe automation should be effortless. AutoFiller aims to become the most
    reliable and user-friendly autofill tool designed not just for developers,
    but for anyone who wants to save time, reduce repetition, and focus on what truly matters.
          </p>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-8">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The Problem</h3>
            <p className="text-gray-300 leading-relaxed">
              Everyone wastes countless minutes each day filling out the same forms over and over again, whether signing up for services, testing features, or completing online tasks. It’s repetitive, time-consuming, and takes focus away from what truly matters.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-2xl p-8">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
            <p className="text-gray-300 leading-relaxed">
              AutoFiller instantly fills any form with realistic, AI generated data in a single click. Save time,
              increase productivity, and focus on what matters most building amazing products.
            </p>
          </div>
        </div>
      </section>

      

      {/* Values Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-300">The principles that guide everything we build</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Speed First</h3>
              <p className="text-gray-300 leading-relaxed">
                We obsess over performance. Every feature is designed to save you time and accelerate your workflow.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Privacy Matters</h3>
              <p className="text-gray-300 leading-relaxed">
                Your data stays yours. We generate dummy data locally and never store your personal information.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Effortless Experience</h3>
              <p className="text-gray-300 leading-relaxed">
                Built for everyone who values simplicity and ease. Our goal is to make every interaction seamless, intuitive, and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            To help everyone save time by removing repetitive form-filling tasks, so they can focus on what truly matters. We’re shaping the future of effortless form completion one click at a time.
          </p>
          </div>
      </section>

      {/* CTA Section */}
      <div>
        <Footer />
      </div>
    </div>
  )
}
