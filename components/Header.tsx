"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Sparkles, Download, CreditCard, BookOpen, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "产品介绍", icon: <Home className="w-4 h-4" /> },
  { href: "/download", label: "下载", icon: <Download className="w-4 h-4" /> },
  { href: "/pricing", label: "定价", icon: <CreditCard className="w-4 h-4" /> },
  { href: "/docs", label: "帮助", icon: <BookOpen className="w-4 h-4" /> },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background with subtle grid */}
      <div className="absolute inset-0 glass-card" />
      
      <nav className="relative container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo icon - Tech gradient with glow */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] via-[#0066FF] to-[#00FF88] flex items-center justify-center shadow-lg group-hover:shadow-[#00D4FF]/40 transition-all duration-300">
              {/* Inner glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
              <Sparkles className="w-5 h-5 text-[#030712] relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#F0F4FF] tracking-tight hidden sm:block">
                智谈<span className="text-[#00D4FF]">AI</span>
              </span>
              <span className="text-[10px] text-[#94A3C8] hidden sm:block tracking-wider">
                AI INTERVIEW ASSISTANT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#94A3C8] hover:text-[#00D4FF] transition-colors duration-200 rounded-lg hover:bg-[#00D4FF]/5"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - User Center button */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/user">
              <Button 
                className="bg-gradient-to-r from-[#00D4FF] to-[#0066FF] hover:from-[#00B8E0] hover:to-[#0055DD] text-[#030712] rounded-full px-6 h-10 font-semibold btn-glow transition-all duration-300 shadow-lg shadow-[#00D4FF]/20"
              >
                <User className="w-4 h-4 mr-2" />
                登录
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#94A3C8] hover:text-[#00D4FF] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Gradient line */}
        <div className="gradient-line" />
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card border-t-0 rounded-b-2xl overflow-hidden">
          <div className="container-custom py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-[#94A3C8] hover:text-[#00D4FF] hover:bg-[#00D4FF]/5 rounded-xl transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Link href="/user" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  className="w-full bg-gradient-to-r from-[#00D4FF] to-[#0066FF] hover:from-[#00B8E0] hover:to-[#0055DD] text-[#030712] rounded-full h-11 font-semibold shadow-lg shadow-[#00D4FF]/20"
                >
                  <User className="w-4 h-4 mr-2" />
                  登录
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
