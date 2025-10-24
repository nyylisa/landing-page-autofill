"use client"

import { Loader2 } from "lucide-react"

export default function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-[9999]">
      <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
      <p className="text-white text-lg font-medium">{text}</p>
    </div>
  )
}
