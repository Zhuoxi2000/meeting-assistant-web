"use client";

import { useState } from "react";
import Section from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import { Book, Zap, Shield, HelpCircle, ChevronRight } from "lucide-react";

const docsContent = {
  quickstart: {
    title: "快速开始",
    icon: <Zap className="w-5 h-5" />,
    content: `
# 快速开始

欢迎使用智语面试！本指南将帮助您在几分钟内开始使用我们的产品。

## 1. 下载并安装

首先，请访问我们的[下载页面](/download)，根据您的操作系统选择对应的安装包：

- **macOS**: 支持 macOS 10.15 及以上版本
- **Windows**: 支持 Windows 10 64位及以上版本

下载完成后，双击安装包按照提示完成安装。

## 2. 注册账号

打开智语面试客户端，点击"注册"按钮：

1. 输入您的邮箱地址
2. 设置密码（至少8位，包含字母和数字）
3. 验证邮箱
4. 完成注册

## 3. 开始第一次面试辅导

登录后，您可以：

1. **选择面试类型**: 技术面试、产品面试、HR面试等
2. **上传简历**（可选）: 上传简历可获得更个性化的回答
3. **选择语言**: 支持中文、英文、日语等8种语言
4. **开始面试**: 点击"开始"按钮，AI助手将实时为您提供面试辅导

## 4. 使用技巧

- 保持麦克风清晰，确保语音识别准确
- 在面试前测试一下软件是否正常工作
- 如需屏幕共享，请确保开启"隐身模式"

祝您面试顺利！
    `,
  },
  faq: {
    title: "常见问题",
    icon: <HelpCircle className="w-5 h-5" />,
    content: `
# 常见问题

## 账号相关

### 如何找回密码？

如果您忘记了密码，可以在登录页面点击"忘记密码"，输入注册邮箱后，我们会发送重置密码的链接到您的邮箱。

### 可以在多台设备上使用吗？

Pro 套餐支持同时在 2 台设备上登录使用，Team 套餐支持最多 5 台设备。

## 功能相关

### 支持哪些会议软件？

我们支持主流的会议软件，包括：
- 腾讯会议
- Zoom
- 飞书会议
- 钉钉会议
- Google Meet
- Microsoft Teams
- Amazon Chime

### 语音识别准确率如何？

在正常的网络环境和安静的环境下，我们的语音识别准确率可以达到 95% 以上。建议使用外置麦克风以获得更好的效果。

### AI 回答的延迟是多少？

通常情况下，AI 生成回答的延迟在 1-3 秒之间，具体取决于问题的复杂程度和网络状况。

## 隐私与安全

### 我的对话会被记录吗？

我们不会记录您的面试对话内容。所有的语音转文字和 AI 回答生成都是实时处理的，不会存储在我们的服务器上。

### 屏幕共享时会被发现吗？

我们采用了先进的窗口隐藏技术，在屏幕共享时，智语面试窗口对其他人是不可见的。我们已经在各大主流会议软件上进行了充分测试。
    `,
  },
  privacy: {
    title: "隐私说明",
    icon: <Shield className="w-5 h-5" />,
    content: `
# 隐私说明

智语面试高度重视用户的隐私保护。本说明将详细介绍我们如何收集、使用和保护您的个人信息。

## 信息收集

### 我们收集的信息

1. **账号信息**: 注册时提供的邮箱地址
2. **设备信息**: 操作系统版本、设备型号（用于优化产品体验）
3. **使用数据**: 功能使用频率、错误日志（匿名化处理）

### 我们不收集的信息

- 面试对话内容
- 简历文件（仅在本地处理）
- 麦克风录音
- 屏幕截图

## 信息使用

我们收集的信息仅用于：

1. 提供和改进服务
2. 发送重要通知（如安全更新）
3. 防止欺诈和滥用

## 信息保护

我们采取以下措施保护您的信息：

- **端到端加密**: 所有数据传输都经过加密处理
- **本地处理**: 敏感数据（如简历）仅在本地处理，不上传到服务器
- **访问控制**: 严格限制内部人员对用户数据的访问
- **安全审计**: 定期进行安全审计和漏洞扫描

## 第三方服务

我们使用以下第三方服务：

- **支付处理**: 支付宝、微信支付（仅处理支付信息）
- **分析服务**: 匿名化的使用统计

## 您的权利

您有权：

- 访问您的个人数据
- 更正不准确的数据
- 删除您的账号和相关数据
- 导出您的数据

如有任何隐私相关问题，请联系：privacy@aizhiyu.com

## 更新

本隐私说明可能会不时更新。重大变更时，我们会通过邮件通知您。

最后更新：2026年1月
    `,
  },
};

type DocKey = keyof typeof docsContent;

export default function DocsPage() {
  const [activeDoc, setActiveDoc] = useState<DocKey>("quickstart");

  const docList: { key: DocKey; title: string; icon: React.ReactNode }[] = [
    { key: "quickstart", title: "快速开始", icon: <Zap className="w-5 h-5" /> },
    { key: "faq", title: "常见问题", icon: <HelpCircle className="w-5 h-5" /> },
    { key: "privacy", title: "隐私说明", icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen pt-24">
      <Section className="pt-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/20 flex items-center justify-center">
            <Book className="w-7 h-7 text-[#6366F1]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#EDEFF7]">使用文档</h1>
            <p className="text-[#AAB0C0]">了解如何使用智语面试</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <GlassCard padding="sm" className="sticky top-24">
              <nav className="space-y-1">
                {docList.map((doc) => (
                  <button
                    key={doc.key}
                    onClick={() => setActiveDoc(doc.key)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeDoc === doc.key
                        ? "bg-[#6366F1]/20 text-[#EDEFF7]"
                        : "text-[#AAB0C0] hover:bg-white/5 hover:text-[#EDEFF7]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={activeDoc === doc.key ? "text-[#6366F1]" : ""}>
                        {doc.icon}
                      </span>
                      <span className="text-sm font-medium">{doc.title}</span>
                    </div>
                    {activeDoc === doc.key && (
                      <ChevronRight className="w-4 h-4 text-[#6366F1]" />
                    )}
                  </button>
                ))}
              </nav>
            </GlassCard>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <GlassCard>
              <article className="prose prose-invert max-w-none">
                <div className="markdown-content text-[#AAB0C0] leading-relaxed">
                  {docsContent[activeDoc].content.split('\n').map((line, i) => {
                    // Simple markdown rendering
                    if (line.startsWith('# ')) {
                      return (
                        <h1 key={i} className="text-3xl font-bold text-[#EDEFF7] mb-6 mt-8 first:mt-0">
                          {line.replace('# ', '')}
                        </h1>
                      );
                    }
                    if (line.startsWith('## ')) {
                      return (
                        <h2 key={i} className="text-xl font-semibold text-[#EDEFF7] mb-4 mt-8">
                          {line.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (line.startsWith('### ')) {
                      return (
                        <h3 key={i} className="text-lg font-medium text-[#EDEFF7] mb-3 mt-6">
                          {line.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (line.startsWith('- ')) {
                      return (
                        <li key={i} className="ml-4 mb-2">
                          {line.replace('- ', '')}
                        </li>
                      );
                    }
                    if (line.match(/^\d+\./)) {
                      return (
                        <li key={i} className="ml-4 mb-2 list-decimal">
                          {line.replace(/^\d+\.\s*/, '')}
                        </li>
                      );
                    }
                    if (line.trim() === '') {
                      return <br key={i} />;
                    }
                    // Handle links
                    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                    if (linkRegex.test(line)) {
                      const parts = line.split(linkRegex);
                      return (
                        <p key={i} className="mb-4">
                          {line.replace(linkRegex, (_, text, url) => text)}
                        </p>
                      );
                    }
                    // Handle bold
                    if (line.includes('**')) {
                      const parts = line.split(/\*\*([^*]+)\*\*/g);
                      return (
                        <p key={i} className="mb-4">
                          {parts.map((part, j) =>
                            j % 2 === 1 ? (
                              <strong key={j} className="text-[#EDEFF7] font-medium">
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      );
                    }
                    return (
                      <p key={i} className="mb-4">
                        {line}
                      </p>
                    );
                  })}
                </div>
              </article>
            </GlassCard>
          </div>
        </div>
      </Section>
    </div>
  );
}

