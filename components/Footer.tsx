import Link from "next/link";
import { Sparkles, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#00D4FF]/10">
      {/* Top gradient line */}
      <div className="gradient-line" />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712] to-transparent pointer-events-none" />
      
      <div className="container-custom py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] via-[#0066FF] to-[#00FF88] flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                <Sparkles className="w-5 h-5 text-[#030712] relative z-10" />
              </div>
              <div>
                <span className="text-lg font-bold text-[#F0F4FF] tracking-tight">
                  智谈<span className="text-[#00D4FF]">AI</span>
                </span>
              </div>
            </div>
            <p className="text-sm text-[#94A3C8] max-w-sm mb-6 leading-relaxed">
              智谈AI是新一代AI面试辅助工具，运用先进的人工智能技术，为求职者提供实时智能辅导，助你在面试中脱颖而出。
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center text-[#94A3C8] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center text-[#94A3C8] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center text-[#94A3C8] hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold text-[#F0F4FF] mb-4 uppercase tracking-wider">产品</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/download" className="text-sm text-[#94A3C8] hover:text-[#00D4FF] transition-colors duration-200">
                  客户端下载
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-[#94A3C8] hover:text-[#00D4FF] transition-colors duration-200">
                  购买套餐
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-[#94A3C8] hover:text-[#00D4FF] transition-colors duration-200">
                  使用文档
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-sm font-semibold text-[#F0F4FF] mb-4 uppercase tracking-wider">法律</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-[#94A3C8] hover:text-[#00D4FF] transition-colors duration-200">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#94A3C8] hover:text-[#00D4FF] transition-colors duration-200">
                  用户协议
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-[#94A3C8] hover:text-[#00D4FF] transition-colors duration-200">
                  帮助中心
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#00D4FF]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#94A3C8]">
              © {currentYear} 智谈AI. All rights reserved.
            </p>
            <p className="text-xs text-[#94A3C8]/60">
              Powered by Advanced AI Technology
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />
    </footer>
  );
}
