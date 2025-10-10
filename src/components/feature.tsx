import { Zap, ArrowRight } from 'lucide-react'

export function FeaturesSection() {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-balance font-bold text-5xl text-white md:text-6xl">
            Our Features
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 bg-cyan-400" />
        </div>

        {/* Feature Content */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side - Feature Description */}
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 p-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-balance font-bold text-4xl text-white">
              One-Click Auto Fill Form
            </h3>
            
            <p className="text-pretty text-lg leading-relaxed text-slate-300">
              Stop wasting time typing the same details over and over. With a single
              click, Auto Filler instantly completes any online form — fast, accurate,
              and hassle-free.
            </p>
            
            <a
              href="#"
              className="inline-flex items-center gap-2 font-semibold text-cyan-400 text-lg transition-colors hover:text-cyan-300"
            >
              Learn more <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          {/* Right Side - Contact Form */}
          <div className="rounded-3xl bg-slate-800/50 p-8 backdrop-blur-sm">
            <h3 className="mb-6 font-semibold text-2xl text-white">Contact Form</h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-slate-300 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue="John Smith"
                  className="w-full rounded-lg bg-slate-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none ring-1 ring-slate-700 transition-all focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="mb-2 block text-slate-300 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue="john@company.com"
                  className="w-full rounded-lg bg-slate-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none ring-1 ring-slate-700 transition-all focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="mb-2 block text-slate-300 text-sm">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  defaultValue="TechCorp Inc."
                  className="w-full rounded-lg bg-slate-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none ring-1 ring-slate-700 transition-all focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="mb-2 block text-slate-300 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  defaultValue="Hello, I'm interested in..."
                  className="w-full rounded-lg bg-slate-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none ring-1 ring-slate-700 transition-all focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
