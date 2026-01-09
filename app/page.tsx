"use client";

import { useState } from "react";
import Link from "next/link";
import Section, { SectionHeader } from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import GradientText from "@/components/GradientText";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import FAQAccordion from "@/components/FAQAccordion";
import MacWindowMockup, { MacWindowMockupCompact } from "@/components/MacWindowMockup";
import { LogoWallGrouped } from "@/components/LogoWall";
import CodeBlockWithHighlight from "@/components/CodeBlockWithHighlight";
import TestimonialCard, { CompanyLogoCarousel } from "@/components/TestimonialCard";
import FeatureCard, { StepFlow, ComparisonCard } from "@/components/FeatureCard";
import { 
  Download, Play, Zap, Globe, Shield, Clock, Mic, Monitor, 
  FileText, Upload, Briefcase, MessageSquare, Languages,
  Eye, EyeOff, ChevronRight, Sparkles, Brain, Target,
  ArrowRight, Check, Star
} from "lucide-react";

// ========================
// A. Hero Section - 首屏
// ========================
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Animated blobs */}
      <div className="gradient-blob gradient-blob-1" />
      <div className="gradient-blob gradient-blob-2" />
      <div className="gradient-blob gradient-blob-3" />

      <div className="container-custom relative z-10 text-center py-16">
        {/* Badge */}
        <div className="flex justify-center mb-6 animate-fade-in-up">
          <div className="pill flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>AI驱动的面试革命</span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up animation-delay-100">
          <span className="block text-[#F0F4FF] mb-2">让<GradientText className="inline">智能</GradientText>成为你的</span>
          <span className="block text-[#F0F4FF]">
            面试<span className="text-glow text-[#00D4FF]">优势</span>
          </span>
        </h1>

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
          <p className="text-lg md:text-xl text-[#94A3C8] leading-relaxed mb-3">
            智谈AI运用前沿人工智能技术，为你的每一场面试提供
          </p>
          <p className="text-lg md:text-xl text-[#F0F4FF] font-medium">
            实时转录 · 智能应答 · 多语言翻译
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-300">
          <Link href="/download">
            <PrimaryButton size="lg" className="animate-pulse-glow min-w-[180px]">
              <Download className="w-5 h-5 mr-2" />
              免费下载
            </PrimaryButton>
          </Link>
          <SecondaryButton size="lg" className="min-w-[180px]">
            <Play className="w-5 h-5 mr-2" />
            观看 15 秒演示
          </SecondaryButton>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-in-up animation-delay-400">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <Zap className="w-4 h-4 text-[#00D4FF]" />
            <span className="text-sm text-[#94A3C8]">
              平均响应 <span className="text-[#F0F4FF] font-semibold">&lt;1s</span>
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <Globe className="w-4 h-4 text-[#00FF88]" />
            <span className="text-sm text-[#94A3C8]">
              支持 <span className="text-[#F0F4FF] font-semibold">8+</span> 语言
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <Monitor className="w-4 h-4 text-[#0066FF]" />
            <span className="text-sm text-[#94A3C8]">
              兼容 <span className="text-[#F0F4FF] font-semibold">10+</span> 会议软件
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent" />
    </section>
  );
}

// ========================
// B. How It Works - 三步上手
// ========================
function HowItWorksSection() {
  const steps = [
    {
      icon: <Download className="w-7 h-7" />,
      title: "下载客户端",
      description: "支持 macOS 和 Windows，一键安装即可使用",
    },
    {
      icon: <Mic className="w-7 h-7" />,
      title: "开启权限",
      description: "允许麦克风、系统音频和屏幕截图权限",
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "实时获得提示",
      description: "面试中自动转录对话，AI实时生成专业回答",
    },
  ];

  return (
    <Section className="py-20">
      <SectionHeader
        title="简单三步，开启 AI 面试"
        subtitle="无需复杂配置，下载即用"
      />
      <StepFlow steps={steps} />
      
      <div className="text-center mt-10">
        <Link href="/download">
          <PrimaryButton>
            立即下载体验
            <ArrowRight className="w-4 h-4 ml-2" />
          </PrimaryButton>
        </Link>
      </div>
    </Section>
  );
}

// ========================
// C. Product Demo - 产品演示
// ========================
function ProductDemoSection() {
  const benefits = [
    { icon: <Zap className="w-5 h-5" />, text: "毫秒级响应，比你想的更快" },
    { icon: <Eye className="w-5 h-5" />, text: "智能识别屏幕内容，精准理解上下文" },
    { icon: <Shield className="w-5 h-5" />, text: "隐私安全，数据本地处理" },
  ];

  return (
    <Section withGradient="left" className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Video Demo */}
        <div>
          <MacWindowMockup
            title="智谈AI - 实时面试助手"
            type="video"
            src="/product/demo.mp4"
            poster="/product/demo-poster.png"
            placeholder={true}
            placeholderText="产品演示视频 - /public/product/demo.mp4"
          />
        </div>

        {/* Right: Benefits */}
        <div>
          <span className="pill mb-4">核心功能</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-4">
            面试中的<GradientText>智能副驾驶</GradientText>
          </h2>
          <p className="text-[#94A3C8] mb-8 leading-relaxed">
            智谈AI实时监听面试对话，自动识别问题类型，在你需要时提供专业、精准的回答建议。
          </p>
          
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-[#00D4FF]/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF]">
                  {benefit.icon}
                </div>
                <span className="text-[#F0F4FF]">{benefit.text}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <Link href="/download">
              <PrimaryButton>
                免费试用
                <ChevronRight className="w-4 h-4 ml-1" />
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ========================
// D. Coding Assistant - 做题助手
// ========================
function CodingAssistantSection() {
  const [questionLang, setQuestionLang] = useState<"cn" | "en">("cn");
  
  const questions = {
    cn: {
      title: "两数之和",
      content: "给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。你可以假设每种输入只会对应一个答案，且同样的元素不能被重复利用。",
    },
    en: {
      title: "Two Sum",
      content: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    },
  };

  const solutionCode = `def twoSum(nums: List[int], target: int) -> List[int]:
    """
    使用哈希表实现 O(n) 时间复杂度
    思路：遍历数组，对于每个元素，检查 target - num 是否在哈希表中
    """
    hashmap = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hashmap:
            return [hashmap[complement], i]
        hashmap[num] = i
    return []

# 示例
nums = [2, 7, 11, 15]
target = 9
print(twoSum(nums, target))  # 输出: [0, 1]`;

  return (
    <Section withGradient="right" className="py-20">
      <SectionHeader
        title="最会做题的 AI 助手"
        subtitle="大厂八股、快消行测通通拿下，最强AI为你提供一键解题"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Question Card */}
        <div className="space-y-4">
          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuestionLang("cn")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                questionLang === "cn"
                  ? "bg-[#00D4FF] text-[#030712]"
                  : "glass-card text-[#94A3C8] hover:text-[#F0F4FF]"
              }`}
            >
              中文
            </button>
            <button
              onClick={() => setQuestionLang("en")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                questionLang === "en"
                  ? "bg-[#00D4FF] text-[#030712]"
                  : "glass-card text-[#94A3C8] hover:text-[#F0F4FF]"
              }`}
            >
              English
            </button>
          </div>

          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-[#00D4FF]" />
              <h3 className="text-lg font-semibold text-[#F0F4FF]">
                {questions[questionLang].title}
              </h3>
              <span className="ml-auto px-2 py-0.5 rounded text-xs bg-yellow-500/20 text-yellow-400">
                Medium
              </span>
            </div>
            <p className="text-sm text-[#94A3C8] leading-relaxed">
              {questions[questionLang].content}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-[#94A3C8]">
              <span>来源: LeetCode #1</span>
              <span>标签: 数组、哈希表</span>
            </div>
          </GlassCard>

          {/* Complexity Info */}
          <div className="grid grid-cols-2 gap-4">
            <GlassCard padding="sm">
              <p className="text-xs text-[#94A3C8] mb-1">时间复杂度</p>
              <p className="text-lg font-mono font-bold text-[#00D4FF]">O(n)</p>
            </GlassCard>
            <GlassCard padding="sm">
              <p className="text-xs text-[#94A3C8] mb-1">空间复杂度</p>
              <p className="text-lg font-mono font-bold text-[#00FF88]">O(n)</p>
            </GlassCard>
          </div>
        </div>

        {/* Right: AI Answer */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#00FF88]" />
            <h3 className="text-lg font-semibold text-[#F0F4FF]">AI 解答</h3>
          </div>
          <CodeBlockWithHighlight
            code={solutionCode}
            language="python"
            title="solution.py"
            maxHeight={400}
          />
        </div>
      </div>
    </Section>
  );
}

// ========================
// E. Meeting Software Support - 会议软件支持
// ========================
function MeetingSupportSection() {
  const domesticLogos = [
    { name: "腾讯会议" },
    { name: "飞书会议" },
    { name: "钉钉" },
    { name: "企业微信" },
    { name: "牛客" },
  ];

  const internationalLogos = [
    { name: "Zoom" },
    { name: "Google Meet" },
    { name: "Teams" },
    { name: "Chime" },
    { name: "Webex" },
  ];

  return (
    <Section className="py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#F0F4FF] mb-2">
          广泛兼容主流会议软件
        </h2>
        <p className="text-[#94A3C8]">无论国内外平台，智谈AI都能完美适配</p>
      </div>
      
      <LogoWallGrouped
        domesticLogos={domesticLogos}
        internationalLogos={internationalLogos}
      />
    </Section>
  );
}

// ========================
// F. Translation Feature - 多语言实时翻译
// ========================
function TranslationSection() {
  const languages = ["中文", "英语", "日语", "韩语", "法语", "德语", "西班牙语", "俄语"];

  return (
    <Section withGradient="left" className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Chat Demo */}
        <div>
          <span className="pill mb-4">多语言支持</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-4">
            实时翻译，跨越语言障碍
          </h2>
          <p className="text-[#94A3C8] mb-8 leading-relaxed">
            支持8种语言实时翻译，无论是跨国企业面试还是海外求职，语言不再是障碍。
          </p>

          {/* Chat bubbles demo */}
          <div className="space-y-4 mb-8">
            {/* Original */}
            <div className="flex justify-end">
              <div className="max-w-[80%] p-4 rounded-2xl rounded-tr-none bg-[#0066FF]/20 border border-[#0066FF]/30">
                <p className="text-xs text-[#94A3C8] mb-1">面试官 (English)</p>
                <p className="text-sm text-[#F0F4FF]">
                  Could you tell me about a challenging project you worked on?
                </p>
              </div>
            </div>
            
            {/* Translated */}
            <div className="flex justify-start">
              <div className="max-w-[80%] p-4 rounded-2xl rounded-tl-none bg-[#00D4FF]/10 border border-[#00D4FF]/30">
                <p className="text-xs text-[#00D4FF] mb-1">智谈AI 翻译</p>
                <p className="text-sm text-[#F0F4FF]">
                  你能谈谈你参与过的一个具有挑战性的项目吗？
                </p>
              </div>
            </div>
          </div>

          {/* Language tags */}
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 rounded-full text-xs bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#94A3C8]"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Video Demo */}
        <div>
          <MacWindowMockup
            title="实时翻译演示"
            type="video"
            src="/product/translate.mp4"
            placeholder={true}
            placeholderText="翻译演示视频 - /public/product/translate.mp4"
          />
        </div>
      </div>
    </Section>
  );
}

// ========================
// G. Resume Customization - 简历定制
// ========================
function ResumeSection() {
  const steps = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "上传简历",
      description: "支持 PDF、Word 格式",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "选择岗位方向",
      description: "AI 自动匹配行业知识库",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "生成个性化回答",
      description: "STAR 法则 / 要点提炼 / 30秒版本",
    },
  ];

  return (
    <Section withGradient="right" className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Steps */}
        <div>
          <span className="pill mb-4">简历定制</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-4">
            结合简历的<GradientText>个性化回答</GradientText>
          </h2>
          <p className="text-[#94A3C8] mb-8 leading-relaxed">
            上传你的简历，AI将根据你的背景和经历，生成最贴合你个人情况的面试回答。
          </p>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center text-[#030712] flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-[#F0F4FF] mb-1">{step.title}</h4>
                  <p className="text-sm text-[#94A3C8]">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-6 mt-14 w-px h-8 bg-[#00D4FF]/30" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mockup */}
        <div>
          <MacWindowMockup
            title="简历定制演示"
            type="image"
            src="/product/resume.png"
            placeholder={true}
            placeholderText="简历功能截图 - /public/product/resume.png"
          />
        </div>
      </div>
    </Section>
  );
}

// ========================
// H. Screen Share Safe - 全程无痕
// ========================
function ScreenShareSection() {
  return (
    <Section withGradient="center" className="py-20">
      <SectionHeader
        title="全程无痕，无惧共享屏幕"
        subtitle="采用先进的窗口隐藏技术，确保在任何屏幕共享场景下都不会被检测"
      />

      <ComparisonCard
        leftTitle="你的视角 - 显示AI提示"
        rightTitle="共享屏幕 - 仅显示目标窗口"
        leftImage="/product/screen-your-view.png"
        rightImage="/product/screen-shared-view.png"
      />

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
          <Shield className="w-4 h-4 text-[#00FF88]" />
          <span className="text-sm text-[#94A3C8]">
            反检测技术 · 可担保的隐私安全
          </span>
        </div>
        <p className="text-xs text-[#94A3C8]/60 mt-4">
          * 请遵守所在平台/面试/考试的相关规则
        </p>
      </div>
    </Section>
  );
}

// ========================
// I. Social Proof - 社会证明
// ========================
function SocialProofSection() {
  const companies = [
    "Google", "Meta", "Amazon", "Microsoft", "Apple", "ByteDance",
    "Alibaba", "Tencent", "Instacart", "Discord", "Canva", "Airbnb",
    "L'Oreal", "McKinsey", "Goldman Sachs", "JPMorgan"
  ];

  const testimonials = [
    {
      quote: "用了智谈AI后，面试通过率从30%提升到了85%。AI给出的回答非常专业，帮我理清了很多思路。",
      author: "张明",
      role: "软件工程师",
      company: "Google",
      tag: "技术岗",
    },
    {
      quote: "多语言翻译功能太棒了！让我顺利通过了全英文面试，现在已经在外企工作了。",
      author: "李华",
      role: "产品经理",
      company: "Meta",
      tag: "产品岗",
    },
    {
      quote: "作为咨询行业的求职者，智谈AI帮我准备了大量的case interview回答，非常精准。",
      author: "赵伟",
      role: "咨询顾问",
      company: "McKinsey",
      tag: "咨询岗",
    },
    {
      quote: "做题助手功能特别好用，笔试题直接截图就能出答案，节省了大量时间。",
      author: "王芳",
      role: "算法工程师",
      company: "ByteDance",
      tag: "技术岗",
    },
  ];

  const stats = [
    { value: "50,000+", label: "活跃用户" },
    { value: "92%", label: "面试成功率" },
    { value: "5,000+", label: "Offer 达成" },
    { value: "4.9/5", label: "用户评分" },
  ];

  return (
    <Section className="py-20">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#00D4FF] mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-[#94A3C8]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Company logos carousel */}
      <div className="mb-16">
        <p className="text-sm text-[#94A3C8] text-center mb-6">
          用户 Offer 来自全球顶级企业
        </p>
        <CompanyLogoCarousel companies={companies} />
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, index) => (
          <TestimonialCard
            key={index}
            testimonial={t}
          />
        ))}
      </div>
    </Section>
  );
}

// ========================
// J. FAQ Section
// ========================
function FAQSection() {
  const faqItems = [
    {
      question: "智谈AI支持哪些面试场景？",
      answer: "智谈AI支持各类面试场景：技术面试、产品面试、HR面试、群面、在线笔试等。兼容腾讯会议、Zoom、飞书、钉钉、Teams等所有主流会议软件。",
    },
    {
      question: "需要什么系统配置？",
      answer: "macOS 10.15+ 或 Windows 10+ 系统，4GB以上内存即可流畅运行。支持Intel和Apple Silicon芯片。",
    },
    {
      question: "如何保证屏幕共享时不被发现？",
      answer: "我们采用系统级窗口隐藏技术，智谈AI窗口在屏幕共享时完全不可见。这是操作系统层面的实现，不会被任何检测工具发现。",
    },
    {
      question: "怎么收费？",
      answer: "新用户免费试用7天，包含30分钟基础模型额度。正式套餐从98元起，按使用时长计费，购买后永久有效。详情请查看定价页面。",
    },
    {
      question: "我的数据安全吗？",
      answer: "绝对安全。所有语音转录和AI处理均在本地完成，我们不会上传任何面试内容到服务器。简历信息采用端到端加密，仅用于生成个性化回答。",
    },
  ];

  return (
    <Section withGradient="left" className="py-20">
      <SectionHeader
        title="常见问题"
        subtitle="如果还有其他疑问，欢迎联系我们"
      />
      <div className="max-w-3xl mx-auto">
        <FAQAccordion items={faqItems} />
      </div>
    </Section>
  );
}

// ========================
// K. Final CTA Section
// ========================
function CTASection() {
  return (
    <Section className="py-20">
      <div className="relative overflow-hidden rounded-3xl glass-card p-12 md:p-16 text-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 via-transparent to-[#0066FF]/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00D4FF]/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F0F4FF] mb-4">
            准备好拿下你的 Dream Offer 了吗？
          </h2>
          <p className="text-lg text-[#94A3C8] mb-8 max-w-2xl mx-auto">
            现在开始免费试用，7天体验全部功能
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/download">
              <PrimaryButton size="lg" className="animate-pulse-glow min-w-[200px]">
                <Download className="w-5 h-5 mr-2" />
                免费下载
              </PrimaryButton>
            </Link>
            <Link href="/pricing">
              <SecondaryButton size="lg" className="min-w-[200px]">
                查看定价
                <ChevronRight className="w-4 h-4 ml-1" />
              </SecondaryButton>
            </Link>
          </div>
        </div>
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
      <HowItWorksSection />
      <ProductDemoSection />
      <CodingAssistantSection />
      <MeetingSupportSection />
      <TranslationSection />
      <ResumeSection />
      <ScreenShareSection />
      <SocialProofSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
