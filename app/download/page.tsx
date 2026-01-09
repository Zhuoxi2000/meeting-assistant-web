"use client";

import Section, { SectionHeader } from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import { Apple, Monitor, Download, CheckCircle, ArrowRight, Sparkles, Cpu } from "lucide-react";

export default function DownloadPage() {
  const downloadCards = [
    {
      icon: <Apple className="w-10 h-10" />,
      title: "macOS",
      version: "v2.5.1",
      requirements: "macOS 10.15+",
      size: "128 MB",
      features: ["Apple Silicon 原生支持", "Touch Bar 集成", "系统通知集成"],
      gradient: "from-[#00D4FF] to-[#0066FF]",
    },
    {
      icon: <Monitor className="w-10 h-10" />,
      title: "Windows",
      version: "v2.5.1",
      requirements: "Windows 10+",
      size: "156 MB",
      features: ["64位系统支持", "自动更新", "开机自启动"],
      gradient: "from-[#0066FF] to-[#A855F7]",
    },
  ];

  const installSteps = [
    {
      step: 1,
      title: "下载安装包",
      description: "根据您的操作系统选择对应的安装包进行下载",
    },
    {
      step: 2,
      title: "运行安装程序",
      description: "双击下载的安装包，按照提示完成安装流程",
    },
    {
      step: 3,
      title: "登录账号",
      description: "打开应用，使用您的账号登录即可开始使用",
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <Section className="pt-16 pb-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] mb-6 shadow-lg shadow-[#00D4FF]/30">
            <Download className="w-10 h-10 text-[#030712]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F0F4FF] mb-4">
            下载<span className="text-[#00D4FF]">智谈AI</span>客户端
          </h1>
          <p className="text-lg text-[#94A3C8] max-w-2xl mx-auto">
            获取最佳的AI面试辅助体验，支持macOS和Windows系统
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {downloadCards.map((card) => (
            <GlassCard key={card.title} hover className="text-center">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-[#030712] mx-auto mb-6 shadow-lg`}>
                {card.icon}
              </div>
              <h2 className="text-2xl font-bold text-[#F0F4FF] mb-2">{card.title}</h2>
              <p className="text-sm text-[#94A3C8] mb-6">
                {card.version} · {card.requirements} · {card.size}
              </p>
              
              <ul className="space-y-3 mb-8 text-left">
                {card.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#94A3C8]">
                    <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-[#00FF88]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <PrimaryButton fullWidth>
                <Download className="w-4 h-4 mr-2" />
                立即下载
              </PrimaryButton>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Installation Steps */}
      <Section withGradient="center">
        <SectionHeader
          title="安装步骤"
          subtitle="简单三步，即可开始使用智谈AI"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {installSteps.map((step, index) => (
            <div key={step.step} className="relative">
              <GlassCard className="text-center h-full">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] text-[#030712] flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-[#00D4FF]/30">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-[#F0F4FF] mb-2">{step.title}</h3>
                <p className="text-sm text-[#94A3C8]">{step.description}</p>
              </GlassCard>
              
              {/* Arrow connector */}
              {index < installSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-[#00D4FF]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* System Requirements */}
      <Section>
        <SectionHeader
          title="系统要求"
          subtitle="请确保您的设备满足以下最低配置要求"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center">
                <Apple className="w-5 h-5 text-[#030712]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F0F4FF]">macOS</h3>
            </div>
            <ul className="space-y-2 text-sm text-[#94A3C8]">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                macOS 10.15 Catalina 或更高版本
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                4GB RAM（推荐 8GB）
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                500MB 可用磁盘空间
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                支持 Intel 和 Apple Silicon
              </li>
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#A855F7] flex items-center justify-center">
                <Monitor className="w-5 h-5 text-[#030712]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F0F4FF]">Windows</h3>
            </div>
            <ul className="space-y-2 text-sm text-[#94A3C8]">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                Windows 10 (64位) 或更高版本
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                4GB RAM（推荐 8GB）
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                500MB 可用磁盘空间
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                .NET Framework 4.7.2+
              </li>
            </ul>
          </GlassCard>
        </div>
      </Section>

      {/* Features Highlight */}
      <Section withGradient="left">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00FF88] to-[#00D4FF] flex items-center justify-center shadow-lg shadow-[#00FF88]/30">
                  <Sparkles className="w-10 h-10 text-[#030712]" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#F0F4FF] mb-2">
                  准备好提升你的面试表现了吗？
                </h3>
                <p className="text-[#94A3C8] mb-4">
                  立即下载智谈AI客户端，体验AI驱动的面试辅助功能
                </p>
              </div>
              <PrimaryButton size="lg" className="flex-shrink-0">
                <Download className="w-5 h-5 mr-2" />
                免费下载
              </PrimaryButton>
            </div>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}
