

import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a1a3e] via-[#2d1b4e] to-[#4a2c5e] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl sm:text-2xl">A</span>
              </div>
              <span className="text-xl sm:text-2xl font-semibold">AutoFiller</span>
            </div>
            <p className="text-purple-200 text-sm sm:text-base leading-relaxed mb-6">
              The smartest way to fill forms with dummy data. Save time, increase productivity, and focus on what
              matters most.
            </p>
            <div className="flex justify-center sm:justify-start gap-3">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-[#2a2a4e] hover:bg-[#3a3a5e] rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {["Product", "Company", "Support", "Legal"].map((section, i) => (
            <div key={i} className="text-center sm:text-left">
              <h3 className="font-semibold text-lg sm:text-xl mb-4">{section}</h3>
              <ul className="space-y-3">
                {["Features", "Pricing", "Demo", "Download"].map(
                  (item, j) =>
                    section === "Product" && (
                      <li key={j}>
                        <a
                          href="#"
                          className="text-purple-200 hover:text-cyan-400 transition-colors text-sm sm:text-base"
                        >
                          {item}
                        </a>
                      </li>
                    )
                )}
                {section === "Company" &&
                  ["About Us", "Blog", "Careers", "Contact"].map((item, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-purple-200 hover:text-cyan-400 transition-colors text-sm sm:text-base"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                {section === "Support" &&
                  ["Help Center", "Documentation", "API", "Status"].map((item, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-purple-200 hover:text-cyan-400 transition-colors text-sm sm:text-base"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                {section === "Legal" &&
                  ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((item, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-purple-200 hover:text-cyan-400 transition-colors text-sm sm:text-base"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-800/30 mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm md:text-base text-purple-200 text-center md:text-left">
            <p>
              © 2025 AutoFiller. Made with <span className="text-red-500">❤️</span> for developers and testers worldwide.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-6">
              <span className="text-purple-300">v1.0.0</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
