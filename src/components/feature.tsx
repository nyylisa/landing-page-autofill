// import { Zap, ArrowRight,Brain, Settings } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

// export function FeaturesSection() {
//   return (
//     <section className="">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-20 text-center">
//           <h2 className="text-balance font-bold text-5xl text-white md:text-6xl">
//             Our Features
//           </h2>
//           <div className="mx-auto mt-4 h-1 w-32 bg-cyan-400" />
//         </div>

//         {/* Feature Content */}
//         <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 lg:mx-10 sm:mx-5 md:mx-5">
//           {/* Left Side - Feature Description */}
//           <div className="space-y-6">
//             <div className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 p-4">
//               <Zap className="h-8 w-8 text-white" />
//             </div>
            
//             <h3 className="text-balance font-bold text-4xl text-white">
//               One-Click Auto Fill Form
//             </h3>
            
//             <p className="text-pretty text-lg leading-relaxed text-slate-300">
//               Stop wasting time typing the same details over and over. With a single
//               click, Auto Filler instantly completes any online form — fast, accurate,
//               and hassle-free.
//             </p>
            
//             <a
//               href="#"
//               className="inline-flex items-center gap-2 font-semibold text-cyan-400 text-lg transition-colors hover:text-cyan-300"
//             >
//               Learn more <ArrowRight className="h-5 w-5" />
//             </a>
//           </div>

//           {/* Right Side - Contact Form */}
//           <div className="rounded-3xl bg-slate-800/50 p-8 backdrop-blur-sm">
//             <h3 className="mb-6 font-semibold text-2xl text-white">Contact Form</h3>
            
//             <form className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="mb-2 block text-slate-300 text-sm">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   defaultValue="John Smith"
//                   className="w-full rounded-lg bg-slate-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none ring-1 ring-slate-700 transition-all focus:ring-2 focus:ring-cyan-400"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="email" className="mb-2 block text-slate-300 text-sm">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   defaultValue="john@company.com"
//                   className="w-full rounded-lg bg-slate-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none ring-1 ring-slate-700 transition-all focus:ring-2 focus:ring-cyan-400"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="company" className="mb-2 block text-slate-300 text-sm">
//                   Company
//                 </label>
//                 <input
//                   type="text"
//                   id="company"
//                   defaultValue="TechCorp Inc."
//                   className="w-full rounded-lg bg-slate-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none ring-1 ring-slate-700 transition-all focus:ring-2 focus:ring-cyan-400"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="message" className="mb-2 block text-slate-300 text-sm">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   rows={3}
//                   defaultValue="Hello, I'm interested in..."
//                   className="w-full rounded-lg bg-slate-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none ring-1 ring-slate-700 transition-all focus:ring-2 focus:ring-cyan-400"
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//         {/* Feature 2: AI-Generated Dummy Data Fill */}
//         <div className="mt-24 mb-24 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
//           <Card className="bg-[#3d3464]/80 border-[#4a3d6b] p-8 backdrop-blur-sm">
//             <div className="mb-6 flex items-center gap-3">
//               <Brain className="h-5 w-5 text-purple-300" />
//               <h4 className="text-lg font-semibold text-white">AI Data Generator</h4>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <Button
//                 variant="outline"
//                 className="bg-[#1a2332] border-[#2d3a4f] text-purple-300 hover:bg-[#243041] hover:text-purple-200"
//               >
//                 Realistic Names
//               </Button>
//               <Button
//                 variant="outline"
//                 className="bg-[#1a2332] border-[#2d3a4f] text-purple-300 hover:bg-[#243041] hover:text-purple-200"
//               >
//                 Valid Emails
//               </Button>
//               <Button
//                 variant="outline"
//                 className="bg-[#1a2332] border-[#2d3a4f] text-purple-300 hover:bg-[#243041] hover:text-purple-200"
//               >
//                 Phone Numbers
//               </Button>
//               <Button
//                 variant="outline"
//                 className="bg-[#1a2332] border-[#2d3a4f] text-purple-300 hover:bg-[#243041] hover:text-purple-200"
//               >
//                 Addresses
//               </Button>
//             </div>
//           </Card>

//           <div className="space-y-6">
//             <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600">
//               <Brain className="h-8 w-8 text-white" />
//             </div>
//             <h3 className="text-4xl font-bold text-balance text-white">AI-Generated Dummy Data Fill</h3>
//             <p className="text-lg text-gray-300 leading-relaxed">
//               Need to test a website or preview a form? Auto Filler can generate realistic dummy data using AI — perfect
//               for developers, testers, and designers who want quick, smart form fills without using real information.
//             </p>
//             <a
//               href="#"
//               className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
//             >
//               Learn more →
//             </a>
//           </div>
//         </div>

//         {/* Feature 3: Advanced Profile Management */}
//         <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
//           <div className="space-y-6">
//             <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-green-400">
//               <Settings className="h-8 w-8 text-white" />
//             </div>
//             <h3 className="text-4xl font-bold text-balance text-white">Advanced Profile Management</h3>
//             <p className="text-lg text-gray-300 leading-relaxed">
//               Easily manage multiple profiles with options to add, edit, or delete stored data. Whether you use
//               different info for work, testing, or personal tasks, Auto Filler keeps everything organized and ready to
//               fill anytime.
//             </p>
//             <a
//               href="#"
//               className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
//             >
//               Learn more →
//             </a>
//           </div>

//           <Card className="bg-[#3d3464]/80 border-[#4a3d6b] p-8 backdrop-blur-sm">
//             <div className="mb-6 flex items-center gap-3">
//               <Settings className="h-5 w-5 text-cyan-400" />
//               <h4 className="text-lg font-semibold text-white">Profile Manager</h4>
//             </div>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between rounded-lg bg-[#1a2332] border border-[#2d3a4f] px-4 py-3">
//                 <span className="font-medium text-white">Work Profile</span>
//                 <div className="flex gap-2">
//                   <div className="h-2 w-2 rounded-full bg-green-400" />
//                   <div className="h-2 w-2 rounded-full bg-gray-600" />
//                 </div>
//               </div>
//               <div className="flex items-center justify-between rounded-lg bg-[#1a2332] border border-[#2d3a4f] px-4 py-3">
//                 <span className="font-medium text-white">Personal Profile</span>
//                 <div className="flex gap-2">
//                   <div className="h-2 w-2 rounded-full bg-green-400" />
//                   <div className="h-2 w-2 rounded-full bg-gray-600" />
//                 </div>
//               </div>
//               <div className="flex items-center justify-between rounded-lg bg-[#1a2332] border border-[#2d3a4f] px-4 py-3">
//                 <span className="font-medium text-white">Testing Profile</span>
//                 <div className="flex gap-2">
//                   <div className="h-2 w-2 rounded-full bg-green-400" />
//                   <div className="h-2 w-2 rounded-full bg-gray-600" />
//                 </div>
//               </div>
//             </div>
//           </Card>
//           </div>
//       </div>
//     </section>
//   )
// }


import { Zap, ArrowRight, Brain, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-40 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="heading-1">
            Our Features
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 sm:w-32 bg-cyan-400" />
        </div>

        {/* ========== Feature 1 ========== */}
        <div className="grid gap-10 items-center sm:gap-12 md:gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <div className="space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 p-4 mx-auto sm:mx-0">
              <Zap className="h-8 w-8 text-white" />
            </div>

            <h3 className="heading-2">
              One-Click Auto Fill Form
            </h3>

            <p className="body-text">
              Stop wasting time typing the same details over and over. With a single
              click, Auto Filler instantly completes any online form — fast, accurate,
              and hassle-free.
            </p>
          </div>

          {/* Right Side */}
          <div className="rounded-3xl bg-slate-800/50 p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="mb-6 text-xl sm:text-2xl font-semibold text-white">
              Contact Form
            </h3>

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
          </div>
        </div>

        {/* ========== Feature 2 ========== */}
        <div className="mt-24 grid gap-10 sm:gap-12 md:gap-16 items-center lg:grid-cols-2">
          <Card className="order-2 lg:order-1 bg-[#3d3464]/80 border-[#4a3d6b] p-6 sm:p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-3">
              <Brain className="h-5 w-5 text-purple-300" />
              <h4 className="text-lg font-semibold text-white">AI Data Generator</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Realistic Names", "Valid Emails", "Phone Numbers", "Addresses"].map(
                (item) => (
                  <Button
                    key={item}
                    variant="outline"
                    className="bg-[#1a2332] border-[#2d3a4f] text-purple-300 hover:bg-[#243041] hover:text-purple-200"
                  >
                    {item}
                  </Button>
                )
              )}
            </div>
          </Card>

          <div className="order-1 lg:order-2 space-y-6 text-center sm:text-left">
            <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 mx-auto sm:mx-0">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="heading-2">
              AI-Generated Dummy Data Fill
            </h3>
            <p className="body-text">
              Need to test a website or preview a form? Auto Filler can generate
              realistic dummy data using AI — perfect for developers, testers, and
              designers who want quick, smart form fills without using real information.
            </p>
            
          </div>
        </div>

        {/* ========== Feature 3 ========== */}
        <div className="mt-24 grid gap-10 sm:gap-12 md:gap-16 items-center lg:grid-cols-2">
          <div className="space-y-6 text-center sm:text-left">
            <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-green-400 mx-auto sm:mx-0">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h3 className="heading-2">
              Advanced Profile Management
            </h3>
            <p className="body-text">
              Easily manage multiple profiles with options to add, edit, or delete
              stored data. Whether you use different info for work, testing, or
              personal tasks, Auto Filler keeps everything organized and ready to fill
              anytime.
            </p>
            
          </div>

          <Card className="bg-[#3d3464]/80 border-[#4a3d6b] p-6 sm:p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-3">
              <Settings className="h-5 w-5 text-cyan-400" />
              <h4 className="text-lg font-semibold text-white">Profile Manager</h4>
            </div>
            <div className="space-y-3">
              {["Work Profile", "Personal Profile", "Testing Profile"].map(
                (profile) => (
                  <div
                    key={profile}
                    className="flex items-center justify-between rounded-lg bg-[#1a2332] border border-[#2d3a4f] px-4 py-3"
                  >
                    <span className="font-medium text-white">{profile}</span>
                    <div className="flex gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                      <div className="h-2 w-2 rounded-full bg-gray-600" />
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
