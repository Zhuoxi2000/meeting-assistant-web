import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "智谈AI - 让AI成为你的面试优势",
  description: "智谈AI是专业的AI面试辅助工具，实时语音转录、智能面试回答、8种语言同声传译，助你轻松拿下心仪Offer",
  keywords: ["智谈AI", "AI面试", "面试助手", "智能面试", "Offer", "求职", "面试辅导", "AI面试辅助"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${outfit.variable} ${jakarta.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#030712] text-[#F0F4FF] min-h-screen`}
      >
        <SessionProvider>
          <Header />
          <main className="relative">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
