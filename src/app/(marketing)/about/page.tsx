"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#2d1b4e] to-[#1a1a2e] overflow-x-hidden">
      {/* Header */}
      <div className="fixed w-full z-50">
        <Header />
      </div>

      {/* Hero Section */}
      <motion.section
        className="container mx-auto px-6 py-20 md:py-32"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-cyan-400 text-sm font-medium px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10">
              About AutoFiller
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Empowering Everyone to Save Time
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            We believe automation should be effortless. AutoFiller aims to become the most reliable and
            user-friendly autofill tool designed not just for developers, but for anyone who wants to save time,
            reduce repetition, and focus on what truly matters.
          </motion.p>
        </div>
      </motion.section>

      {/* Problem / Solution Section */}
      <motion.section
        className="container mx-auto px-6 py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {[
            {
              title: "The Problem",
              color: "red",
              text: "Everyone wastes countless minutes each day filling out the same forms over and over again, whether signing up for services, testing features, or completing online tasks. It’s repetitive, time-consuming, and takes focus away from what truly matters.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ),
            },
            {
              title: "Our Solution",
              color: "cyan",
              text: "AutoFiller instantly fills any form with realistic, AI-generated data in a single click. Save time, increase productivity, and focus on what matters most — building amazing products.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ),
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`bg-gradient-to-br from-${item.color}-500/10 to-${item.color}-600/5 border border-${item.color}-500/20 rounded-2xl p-8`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div
                className={`w-12 h-12 bg-${item.color}-500/20 rounded-xl flex items-center justify-center mb-6`}
              >
                <svg className={`w-6 h-6 text-${item.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="container mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Our Values
            </motion.h2>
            <p className="text-xl text-gray-300">The principles that guide everything we build</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Speed First",
                color: "cyan",
                desc: "We obsess over performance. Every feature is designed to save you time and accelerate your workflow.",
              },
              {
                title: "Privacy Matters",
                color: "pink",
                desc: "Your data stays yours. We generate dummy data locally and never store your personal information.",
              },
              {
                title: "Effortless Experience",
                color: "purple",
                desc: "Built for everyone who values simplicity and ease. Our goal is to make every interaction seamless and enjoyable.",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br from-${v.color}-400 to-${v.color}-600 rounded-xl flex items-center justify-center mb-6`}
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-gray-300 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="container mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            To help everyone save time by removing repetitive form-filling tasks, so they can focus on what truly matters.
            We’re shaping the future of effortless form completion one click at a time.
          </p>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Footer />
      </motion.div>
    </div>
  )
}
