"use client"

import { motion } from "framer-motion"
import { Zap, Brain, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-40 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-2">Our Features</h2>
          <div className="mx-auto mt-4 h-1 w-24 sm:w-32 bg-cyan-400" />
        </motion.div>

        {/* Feature 1 */}
        <motion.div
          className="grid gap-10 items-center sm:gap-12 md:gap-16 lg:grid-cols-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 p-4 mx-auto sm:mx-0">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="heading-2">One-Click Auto Fill Form</h3>
            <p className="body-text">
              Stop wasting time typing the same details over and over. With a single
              click, Auto Filler instantly completes any online form — fast, accurate,
              and hassle-free.
            </p>
          </div>

          <motion.div
            className="rounded-3xl bg-slate-800/50 p-6 sm:p-8 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="mb-6 text-xl sm:text-2xl font-semibold text-white">Contact Form</h3>
            <form className="space-y-6">
              {["Name", "Email", "Company"].map((label) => (
                <div key={label}>
                  <label className="block mb-2 text-sm text-slate-300">{label}</label>
                  <input
                    type="text"
                    placeholder={label}
                    className="w-full rounded-lg bg-slate-900/80 px-4 py-3 text-white ring-1 ring-slate-700 focus:ring-2 focus:ring-cyan-400 outline-none transition"
                  />
                </div>
              ))}
              <div>
                <label className="block mb-2 text-sm text-slate-300">Message</label>
                <textarea
                  rows={3}
                  placeholder="Your message..."
                  className="w-full rounded-lg bg-slate-900/80 px-4 py-3 text-white ring-1 ring-slate-700 focus:ring-2 focus:ring-cyan-400 outline-none transition"
                />
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          className="mt-24 grid gap-10 sm:gap-12 md:gap-16 items-center lg:grid-cols-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="order-2 lg:order-1 bg-[#3d3464]/80 border-[#4a3d6b] p-6 sm:p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-3">
              <Brain className="h-5 w-5 text-purple-300" />
              <h4 className="text-lg font-semibold text-white">AI Data Generator</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="bg-[#1a2332] border-[#2d3a4f] text-purple-300 hover:bg-[#243041] hover:text-purple-200"
              >
                Realistic Names
              </Button>
              <Button
                variant="outline"
                className="bg-[#1a2332] border-[#2d3a4f] text-purple-300 hover:bg-[#243041] hover:text-purple-200"
              >
                Valid Emails
              </Button>
              <Button
                variant="outline"
                className="bg-[#1a2332] border-[#2d3a4f] text-purple-300 hover:bg-[#243041] hover:text-purple-200"
              >
                Phone Numbers
              </Button>
              <Button
                variant="outline"
                className="bg-[#1a2332] border-[#2d3a4f] text-purple-300 hover:bg-[#243041] hover:text-purple-200"
              >
                Addresses
              </Button>
            </div>
          </Card>

          <div className="order-1 lg:order-2 space-y-6 text-center sm:text-left">
            <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 mx-auto sm:mx-0">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="heading-2">AI-Generated Dummy Data Fill</h3>
            <p className="body-text">
              Need to test a website or preview a form? Auto Filler can generate
              realistic dummy data using AI — perfect for developers, testers, and
              designers who want quick, smart form fills without using real information.
            </p>
          </div>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          className="mt-24 grid gap-10 sm:gap-12 md:gap-16 items-center lg:grid-cols-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6 text-center sm:text-left">
            <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-green-400 mx-auto sm:mx-0">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h3 className="heading-2">Advanced Profile Management</h3>
            <p className="body-text">
              Easily manage multiple profiles with options to add, edit, or delete stored data.
              Whether for work, testing, or personal use, Auto Filler keeps everything organized
              and ready anytime.
            </p>
          </div>

          <Card className="bg-[#3d3464]/80 border-[#4a3d6b] p-6 sm:p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-3">
              <Settings className="h-5 w-5 text-cyan-400" />
              <h4 className="text-lg font-semibold text-white">Profile Manager</h4>
            </div>
            <div className="space-y-3">
              {["Work Profile", "Personal Profile", "Testing Profile"].map((profile) => (
                <motion.div
                  key={profile}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center justify-between rounded-lg bg-[#1a2332] border border-[#2d3a4f] px-4 py-3"
                >
                  <span className="font-medium text-white">{profile}</span>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                    <div className="h-2 w-2 rounded-full bg-gray-600" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
