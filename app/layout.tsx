import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI智语面试 - 每一个人都可能成为Offer达人",
  description: "智语面试用AI帮你直达梦想Offer，实时语音转录，高质量面试回答，支持8种语言，同声传译",
  keywords: ["AI面试", "面试助手", "智能面试", "Offer", "求职", "面试辅导"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#050505] text-[#EDEFF7] min-h-screen`}
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
