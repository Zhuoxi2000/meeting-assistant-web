"use client";

import Section, { SectionHeader } from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import { Apple, Monitor, Download, CheckCircle, ArrowRight } from "lucide-react";

export default function DownloadPage() {
  const downloadCards = [
    {
      icon: <Apple className="w-10 h-10" />,
      title: "macOS",
      version: "v2.5.1",
      requirements: "macOS 10.15+",
      size: "128 MB",
      features: ["Apple Silicon 原生支持", "Touch Bar 集成", "系统通知集成"],
    },
    {
      icon: <Monitor className="w-10 h-10" />,
      title: "Windows",
      version: "v2.5.1",
      requirements: "Windows 10+",
      size: "156 MB",
      features: ["64位系统支持", "自动更新", "开机自启动"],
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] mb-6">
            <Download className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#EDEFF7] mb-4">
            客户端下载
          </h1>
          <p className="text-lg text-[#AAB0C0] max-w-2xl mx-auto">
            下载智语面试客户端，获得最佳的面试辅助体验
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {downloadCards.map((card) => (
            <GlassCard key={card.title} hover className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1] mx-auto mb-6">
                {card.icon}
              </div>
              <h2 className="text-2xl font-bold text-[#EDEFF7] mb-2">{card.title}</h2>
              <p className="text-sm text-[#AAB0C0] mb-6">
                {card.version} · {card.requirements} · {card.size}
              </p>
              
              <ul className="space-y-3 mb-8 text-left">
                {card.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#AAB0C0]">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
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
          subtitle="简单三步，即可开始使用智语面试"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {installSteps.map((step, index) => (
            <div key={step.step} className="relative">
              <GlassCard className="text-center h-full">
                <div className="w-12 h-12 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-[#EDEFF7] mb-2">{step.title}</h3>
                <p className="text-sm text-[#AAB0C0]">{step.description}</p>
              </GlassCard>
              
              {/* Arrow connector */}
              {index < installSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-[#6366F1]" />
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
              <Apple className="w-6 h-6 text-[#6366F1]" />
              <h3 className="text-lg font-semibold text-[#EDEFF7]">macOS</h3>
            </div>
            <ul className="space-y-2 text-sm text-[#AAB0C0]">
              <li>• macOS 10.15 Catalina 或更高版本</li>
              <li>• 4GB RAM（推荐 8GB）</li>
              <li>• 500MB 可用磁盘空间</li>
              <li>• 支持 Intel 和 Apple Silicon</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="w-6 h-6 text-[#6366F1]" />
              <h3 className="text-lg font-semibold text-[#EDEFF7]">Windows</h3>
            </div>
            <ul className="space-y-2 text-sm text-[#AAB0C0]">
              <li>• Windows 10 (64位) 或更高版本</li>
              <li>• 4GB RAM（推荐 8GB）</li>
              <li>• 500MB 可用磁盘空间</li>
              <li>• .NET Framework 4.7.2+</li>
            </ul>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}

