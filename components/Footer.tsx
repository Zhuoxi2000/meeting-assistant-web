import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5">
      {/* Top gradient line */}
      <div className="gradient-line" />
      
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                <span className="text-white font-bold">智</span>
              </div>
              <span className="text-base font-semibold text-[#EDEFF7]">
                AI智语面试
              </span>
            </div>
            <p className="text-sm text-[#AAB0C0]">
              © {currentYear} AI智语面试. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link 
              href="/privacy" 
              className="text-[#AAB0C0] hover:text-[#EDEFF7] transition-colors duration-200"
            >
              隐私政策
            </Link>
            <Link 
              href="/terms" 
              className="text-[#AAB0C0] hover:text-[#EDEFF7] transition-colors duration-200"
            >
              用户协议
            </Link>
            <Link 
              href="/docs" 
              className="text-[#AAB0C0] hover:text-[#EDEFF7] transition-colors duration-200"
            >
              帮助中心
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent" />
    </footer>
  );
}

