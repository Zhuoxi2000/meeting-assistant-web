"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/download", label: "客户端下载" },
  { href: "/pricing", label: "购买套餐" },
  { href: "/docs", label: "使用文档" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 glass-card" />
      
      <nav className="relative container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo icon - gradient square */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg group-hover:shadow-[#6366F1]/30 transition-shadow duration-300">
              <span className="text-white font-bold text-lg">智</span>
            </div>
            <span className="text-lg font-semibold text-[#EDEFF7] hidden sm:block">
              AI智语面试
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-[#AAB0C0] hover:text-[#EDEFF7] transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - User Center button */}
          <div className="hidden md:flex items-center">
            <Link href="/user">
              <Button 
                className="bg-[#6366F1] hover:bg-[#5558E8] text-white rounded-full px-6 h-10 font-medium btn-glow transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                用户中心
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#AAB0C0] hover:text-[#EDEFF7] transition-colors"
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
                className="block px-4 py-3 text-[#AAB0C0] hover:text-[#EDEFF7] hover:bg-white/5 rounded-xl transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Link href="/user" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  className="w-full bg-[#6366F1] hover:bg-[#5558E8] text-white rounded-full h-11 font-medium"
                >
                  <User className="w-4 h-4 mr-2" />
                  用户中心
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

