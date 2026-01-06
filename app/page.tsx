"use client";

import { useState } from "react";
import Section, { SectionHeader } from "@/components/Section";
import GlassCard, { GlassCardGradientTop } from "@/components/GlassCard";
import GradientText from "@/components/GradientText";
import TabsPills from "@/components/TabsPills";
import MediaPlaceholder, { AvatarPlaceholder, ScreenshotPlaceholder } from "@/components/MediaPlaceholder";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import FAQAccordion from "@/components/FAQAccordion";
import { Users, Zap, Globe, Shield, Upload, ChevronDown, Check } from "lucide-react";

// ========================
// Section A: Hero
// ========================
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="gradient-blob gradient-blob-1" />
      <div className="gradient-blob gradient-blob-2" />
      <div className="gradient-blob gradient-blob-3" />

      <div className="container-custom relative z-10 text-center py-20">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="block text-[#EDEFF7] mb-2">每一个人</span>
          <span className="block">
            都可能成为{" "}
            <GradientText className="inline">Offer达人</GradientText>
          </span>
        </h1>

        {/* Pill tag */}
        <div className="flex justify-center mb-8">
          <span className="pill">
            互联网大厂
          </span>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-base md:text-lg text-[#AAB0C0] leading-relaxed">
            智语面试用AI帮你直达梦想Offer，实时语音转录，高质量面试回答
          </p>
          <p className="text-base md:text-lg text-[#AAB0C0] leading-relaxed">
            支持8种语言，同声传译
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-8">
          <PrimaryButton size="lg" className="animate-pulse-glow">
            免费试用
          </PrimaryButton>
        </div>

        {/* User count */}
        <div className="flex items-center justify-center gap-2 text-[#AAB0C0]">
          <Users className="w-5 h-5" />
          <span className="text-sm">
            面试助手用户数 / <span className="text-[#EDEFF7] font-semibold">758,399</span>
          </span>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
}

// ========================
// Section B: AI Interview Assistant
// ========================
function AIInterviewSection() {
  const [activeTab, setActiveTab] = useState("bilingual");

  const tabs = [
    { id: "chinese", label: "中文面试" },
    { id: "bilingual", label: "自带翻译的中英双语面试" },
    { id: "japanese", label: "日文面试" },
  ];

  return (
    <Section withGradient="left" className="pt-10">
      <SectionHeader
        title="最懂面试的AI助手"
        subtitle="无论你参加任何行业的面试，我们的AI都能为你提供最高效的面试辅导"
      />

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <TabsPills tabs={tabs} defaultTab="bilingual" onChange={setActiveTab} />
      </div>

      {/* Three column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Interviewer Card */}
        <GlassCard className="gradient-border">
          <div className="text-center mb-6">
            <div className="inline-block p-1 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] mb-4">
              <AvatarPlaceholder size="lg" withBorder={false} />
            </div>
            <h3 className="text-lg font-semibold text-[#EDEFF7] mb-1">Interviewer</h3>
            <p className="text-sm text-[#AAB0C0]">面试官</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-[#EDEFF7]">快速响应</h4>
                <p className="text-xs text-[#AAB0C0]">即时回答，智能即时</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-[#EDEFF7]">零延迟</h4>
                <p className="text-xs text-[#AAB0C0]">每一次提问几乎0延迟的转化</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-[#EDEFF7]">精确解答</h4>
                <p className="text-xs text-[#AAB0C0]">为你提供最精准的面试答案</p>
              </div>
            </div>
          </div>

          <PrimaryButton fullWidth size="sm">
            免费试用
          </PrimaryButton>
        </GlassCard>

        {/* Middle: Interview Questions */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-[#EDEFF7] mb-4">Interview Question</h3>
          <div className="space-y-3">
            {[
              { cn: "请介绍一下你自己", en: "Please introduce yourself" },
              { cn: "你的职业规划是什么？", en: "What is your career plan?" },
              { cn: "你最大的优点和缺点是什么？", en: "What are your strengths and weaknesses?" },
              { cn: "为什么选择我们公司？", en: "Why did you choose our company?" },
            ].map((q, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-sm text-[#EDEFF7] mb-1">{q.cn}</p>
                <p className="text-xs text-[#AAB0C0]">{q.en}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Right: AI Answer */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-[#EDEFF7] mb-4">AI Answer</h3>
          <div className="space-y-4 text-sm text-[#AAB0C0] leading-relaxed">
            <p>
              <span className="text-[#6366F1] font-medium">1.</span>{" "}
              我是一名有3年经验的产品经理，专注于B2B SaaS产品。
              <span className="block text-xs mt-1 text-[#AAB0C0]/70">
                I am a product manager with 3 years of experience, focusing on B2B SaaS products.
              </span>
            </p>
            <p>
              <span className="text-[#6366F1] font-medium">2.</span>{" "}
              我具备出色的跨部门沟通能力，曾成功推动多个复杂项目落地。
              <span className="block text-xs mt-1 text-[#AAB0C0]/70">
                I have excellent cross-department communication skills.
              </span>
            </p>
            <p>
              <span className="text-[#6366F1] font-medium">3.</span>{" "}
              我希望在贵公司发挥我的产品思维，创造更大的用户价值。
              <span className="block text-xs mt-1 text-[#AAB0C0]/70">
                I hope to apply my product thinking at your company.
              </span>
            </p>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

// ========================
// Section C: AI Coding Assistant
// ========================
function AICodingSection() {
  const [activeTab, setActiveTab] = useState("programmer");

  const tabs = [
    { id: "fmcg", label: "快消笔试" },
    { id: "programmer", label: "程序员笔试" },
    { id: "aptitude", label: "行测笔试" },
  ];

  return (
    <Section withGradient="right">
      <SectionHeader
        title="最会做题的AI助手"
        subtitle="大厂八股快消行测通通拿下 最强AI大模型为你提供最安全的一键解题"
      />

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <TabsPills tabs={tabs} defaultTab="programmer" onChange={setActiveTab} />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Screenshot placeholder */}
        <div className="space-y-6">
          <ScreenshotPlaceholder title="在线笔试系统" className="w-full" />
          <PrimaryButton className="mx-auto block">
            免费试用
          </PrimaryButton>
        </div>

        {/* Right: Question and Answer */}
        <div className="space-y-6">
          {/* Question */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-[#EDEFF7] mb-4">Written Test Question</h3>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-sm text-[#EDEFF7] mb-2">
                给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。
              </p>
              <p className="text-xs text-[#AAB0C0]">
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
              </p>
            </div>
          </GlassCard>

          {/* AI Answer */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-[#EDEFF7] mb-4">AI Answer</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-[#AAB0C0]">时间复杂度:</span>
                <span className="text-[#6366F1] font-mono">O(n)</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-[#AAB0C0]">空间复杂度:</span>
                <span className="text-[#6366F1] font-mono">O(n)</span>
              </div>

              {/* Code block */}
              <div className="code-block">
                <pre className="text-sm text-[#AAB0C0]">
{`def twoSum(nums, target):
    hashmap = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hashmap:
            return [hashmap[complement], i]
        hashmap[num] = i
    return []`}
                </pre>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}

// ========================
// Section D: Platform Support
// ========================
function PlatformSection() {
  const platforms = [
    "腾讯会议", "Zoom", "飞书会议", "钉钉", "牛客", "Teams", "Chime", "Google Meet"
  ];

  return (
    <Section className="py-12">
      <GlassCard className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="flex items-center gap-3 flex-shrink-0">
          <Globe className="w-6 h-6 text-[#6366F1]" />
          <span className="text-lg font-semibold text-[#EDEFF7]">广泛支持</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {platforms.map((platform) => (
            <span key={platform} className="text-sm text-[#AAB0C0] hover:text-[#EDEFF7] transition-colors">
              {platform}
            </span>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}

// ========================
// Section E: Multi-language Translation
// ========================
function TranslationSection() {
  const languages = [
    "英文", "中文", "日语", "韩语", "法语", "德语", "西班牙语", "俄语", "中英混合"
  ];

  return (
    <Section withGradient="left">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/20 flex items-center justify-center">
              <Globe className="w-7 h-7 text-[#6366F1]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#EDEFF7]">
              多语言实时翻译
            </h2>
          </div>
          <p className="text-[#AAB0C0] mb-4 leading-relaxed">
            支持全球主流语言的实时翻译，让语言不再是面试的障碍
          </p>
          <p className="text-[#AAB0C0] mb-8 leading-relaxed">
            无论是跨国企业面试还是海外求职，我们都能为你提供专业的语言支持
          </p>

          {/* Video placeholder */}
          <MediaPlaceholder type="video" aspectRatio="video" label="演示视频" />
        </div>

        {/* Right side - Language grid */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-[#EDEFF7] mb-6">选择语言</h3>
          <div className="grid grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang}
                className="px-4 py-3 rounded-xl text-sm font-medium text-[#AAB0C0] bg-white/[0.03] border border-white/5 hover:border-[#6366F1]/50 hover:text-[#EDEFF7] transition-all duration-200"
              >
                {lang}
              </button>
            ))}
            <button className="px-4 py-3 rounded-xl text-sm font-medium text-[#6366F1] bg-[#6366F1]/10 border border-[#6366F1]/30 hover:bg-[#6366F1]/20 transition-all duration-200">
              MORE...
            </button>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

// ========================
// Section F: Resume Personalization
// ========================
function ResumeSection() {
  const positions = [
    "产品经理", "留学面试", "教育培训", "金融咨询", "市场公关广告",
    "互联网运营", "财务审计", "销售采购", "法律", "设计", "其他"
  ];

  return (
    <Section withGradient="right">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Resume stack placeholder */}
        <div className="relative">
          <div className="relative mx-auto w-full max-w-md">
            {/* Stacked resume effect */}
            <div className="absolute top-4 left-4 right-4 h-full rounded-2xl glass opacity-40 transform rotate-2" />
            <div className="absolute top-2 left-2 right-2 h-full rounded-2xl glass opacity-60 transform -rotate-1" />
            <GlassCard className="relative">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]" />
                <div>
                  <p className="text-sm font-medium text-[#EDEFF7]">个人简历</p>
                  <p className="text-xs text-[#AAB0C0]">Resume.pdf</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-full" />
                <div className="h-3 bg-white/5 rounded w-5/6" />
                <div className="h-3 bg-white/5 rounded w-2/3" />
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right: Upload UI */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDEFF7] mb-4">
            结合简历的个性化回答
          </h2>
          <p className="text-[#AAB0C0] mb-8 leading-relaxed">
            上传你的简历，AI将根据你的背景和经历，生成最贴合你个人情况的面试回答
          </p>

          <GlassCard>
            {/* Upload area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#EDEFF7] mb-3">上传简历</label>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#6366F1]/50 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-[#AAB0C0] mx-auto mb-3" />
                <p className="text-sm text-[#EDEFF7] mb-1">点击或拖拽文件上传</p>
                <p className="text-xs text-[#AAB0C0]">支持 PDF / DOC / DOCX</p>
              </div>
            </div>

            {/* Position selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#EDEFF7] mb-3">选择岗位</label>
              <div className="relative">
                <select className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-[#EDEFF7] appearance-none cursor-pointer focus:outline-none focus:border-[#6366F1]/50">
                  <option value="">请选择目标岗位</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAB0C0] pointer-events-none" />
              </div>
            </div>

            {/* Privacy note */}
            <p className="text-xs text-[#AAB0C0] flex items-start gap-2">
              <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
              您的简历信息将被严格保密，仅用于生成个性化面试回答
            </p>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}

// ========================
// Section G: Screen Share Safe
// ========================
function ScreenShareSection() {
  return (
    <Section withGradient="center">
      <SectionHeader
        title="全程无痕，无惧共享屏幕"
        subtitle="我们的产品设计确保在屏幕共享时完全隐形，面试官无法察觉您正在使用任何辅助工具"
      />

      {/* Comparison images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-sm text-[#AAB0C0] mb-4 text-center">面试者视角</p>
          <ScreenshotPlaceholder title="您的屏幕 - 显示AI助手" />
        </div>
        <div>
          <p className="text-sm text-[#AAB0C0] mb-4 text-center">面试官共享屏幕视角</p>
          <ScreenshotPlaceholder title="面试官看到的 - 正常桌面" />
        </div>
      </div>

      {/* Safety banner */}
      <GlassCard className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
          <Shield className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#EDEFF7] mb-1">反检测 - 可担保的隐私安全</h3>
          <p className="text-sm text-[#AAB0C0]">
            采用先进的窗口隐藏技术，确保在任何屏幕共享场景下都不会被检测到
          </p>
        </div>
      </GlassCard>
    </Section>
  );
}

// ========================
// Section H: Company Logos
// ========================
function CompanyLogosSection() {
  const companies = [
    "Instacart", "Discord", "Canva", "Airbnb", "L'Oreal", "Microsoft",
    "Google", "Meta", "Amazon", "Apple", "ByteDance", "Alibaba"
  ];

  return (
    <Section>
      <SectionHeader
        title="5000+ Offer来自"
        subtitle="我们的用户已经成功获得这些顶级公司的Offer"
      />

      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {companies.map((company) => (
          <div
            key={company}
            className="px-6 py-3 rounded-xl glass-card text-[#AAB0C0] hover:text-[#EDEFF7] hover:border-[#6366F1]/30 transition-all duration-200 cursor-default"
          >
            {company}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ========================
// Section I: Testimonials
// ========================
function TestimonialsSection() {
  const testimonials = [
    {
      tag: "Associate",
      quote: "用了智语面试之后，我的面试通过率从30%提升到了80%，真的太神奇了！",
      name: "张明",
      role: "软件工程师 @ Google",
      color: "primary" as const,
    },
    {
      tag: "产品",
      quote: "AI给出的回答非常专业，帮我理清了很多产品思维的表达方式。",
      name: "李华",
      role: "产品经理 @ ByteDance",
      color: "purple" as const,
    },
    {
      tag: "市场",
      quote: "多语言翻译功能太棒了，让我顺利通过了外企的英文面试。",
      name: "王芳",
      role: "市场总监 @ Microsoft",
      color: "cyan" as const,
    },
    {
      tag: "咨询",
      quote: "作为咨询行业的求职者，智语面试帮我准备了大量的case interview回答。",
      name: "赵伟",
      role: "咨询顾问 @ McKinsey",
      color: "primary" as const,
    },
  ];

  return (
    <Section withGradient="left">
      <SectionHeader
        title="用真实的故事了解产品的力量"
        subtitle="听听我们用户的真实反馈"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <GlassCardGradientTop key={i} hover accentColor={t.color}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#6366F1]/20 text-[#6366F1] mb-4">
              {t.tag}
            </span>
            <p className="text-sm text-[#AAB0C0] leading-relaxed mb-6 min-h-[80px]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <AvatarPlaceholder size="sm" />
              <div>
                <p className="text-sm font-medium text-[#EDEFF7]">{t.name}</p>
                <p className="text-xs text-[#AAB0C0]">{t.role}</p>
              </div>
            </div>
          </GlassCardGradientTop>
        ))}
        </div>
    </Section>
  );
}

// ========================
// Section J: FAQ
// ========================
function FAQSection() {
  const faqItems = [
    {
      question: "哪些场景可以用？",
      answer: "智语面试适用于各类面试场景，包括但不限于：技术面试、产品面试、HR面试、群面、在线笔试等。无论是腾讯会议、Zoom、飞书还是其他主流会议软件，我们都能完美支持。",
    },
    {
      question: "运行系统的要求是什么？手机能用吗？",
      answer: "目前智语面试支持 macOS 10.15+ 和 Windows 10+ 系统。我们的客户端需要在电脑上运行以确保最佳的语音识别和屏幕隐藏效果。暂不支持手机端，但我们正在开发移动版本。",
    },
    {
      question: "怎么收费？",
      answer: "我们提供多种套餐选择：免费试用版每天可使用30分钟；Pro版本月费99元，无限时长使用；Team版本适合企业用户，提供更多高级功能和专属客服支持。详情请查看我们的定价页面。",
    },
    {
      question: "我的信息安全吗？",
      answer: "绝对安全。我们采用端到端加密技术，您的简历和对话内容不会被存储在我们的服务器上。所有数据处理都在本地完成，我们通过了ISO 27001信息安全认证，确保您的隐私得到最高级别的保护。",
    },
  ];

  return (
    <Section withGradient="right">
      <SectionHeader
        title="如果还有疑问，以下是答案"
        subtitle="常见问题解答"
      />

      <div className="max-w-3xl mx-auto">
        <FAQAccordion items={faqItems} />
    </div>
    </Section>
  );
}

// ========================
// Main Page Component
// ========================
export default function Home() {
  return (
    <>
      <HeroSection />
      <AIInterviewSection />
      <AICodingSection />
      <PlatformSection />
      <TranslationSection />
      <ResumeSection />
      <ScreenShareSection />
      <CompanyLogosSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
