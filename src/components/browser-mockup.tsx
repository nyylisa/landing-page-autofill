export function BrowserMockup() {
  return (
    <div className="relative w-full max-w-2xl">
      {/* Auto Filler Extension Badge */}
      <div className="absolute -right-4 -top-4 z-10 flex items-center gap-2 rounded-full bg-primary px-4 py-2 shadow-lg">
        <div className="h-2 w-2 animate-pulse rounded-full bg-primary-foreground" />
        <span className="text-sm font-medium text-primary-foreground">Auto Filler Extension</span>
      </div>

      {/* Browser Window */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#2d3561] to-[#3d2d5f] p-1 shadow-2xl">
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 rounded-t-xl bg-[#2a2d4a] px-4 py-3">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-4 flex-1 rounded-md bg-[#1e2139] px-4 py-1.5">
            <span className="text-sm text-white/50">https://example.com/signup</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="rounded-b-xl bg-[#1e2139] p-8">
          <h2 className="mb-6 font-sans text-2xl font-semibold text-white">Sign Up Form</h2>

          <div className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Full Name</label>
              <div className="rounded-lg bg-[#2a2d4a] px-4 py-3">
                <span className="text-white">John Doe</span>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Email</label>
              <div className="rounded-lg bg-[#2a2d4a] px-4 py-3">
                <span className="text-white">john.doe@example.com</span>
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Phone</label>
              <div className="rounded-lg bg-[#2a2d4a] px-4 py-3">
                <span className="text-white">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
