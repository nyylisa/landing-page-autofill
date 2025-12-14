
export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a1a3e] via-[#2d1b4e] to-[#4a2c5e] text-white">
      

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
