"use client";

import { useState, ReactNode } from "react";
import Section from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import { 
  BookOpen, Zap, Shield, HelpCircle, ChevronRight, ChevronDown,
  Download, Settings, Mic, Monitor, Globe, Lock, Eye, MessageSquare,
  Keyboard, Video, FileText, CreditCard, RefreshCw, Mail, Play
} from "lucide-react";
import { cn } from "@/lib/utils";

// Step Card Component
function StepCard({ 
  step, 
  title, 
  description, 
  icon 
}: { 
  step: number; 
  title: string; 
  description: string; 
  icon: ReactNode;
}) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-300">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
          <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary text-xs font-bold flex items-center justify-center text-background">
            {step}
          </span>
          <span className="text-primary">{icon}</span>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ 
  question, 
  answer, 
  isOpen, 
  onToggle 
}: { 
  question: string; 
  answer: string | ReactNode; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.01] hover:border-white/10 transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

// Feature Highlight Component
function FeatureHighlight({ 
  icon, 
  title, 
  description 
}: { 
  icon: ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
        {icon}
      </div>
      <div>
        <h5 className="font-medium text-foreground text-sm mb-1">{title}</h5>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// Content Sections
function QuickStartContent() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center pb-6 border-b border-white/5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          3分钟快速上手
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          开始使用智谈AI
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          按照以下步骤，即可开始享受AI智能面试助手带来的全新体验
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Play className="w-5 h-5 text-primary" />
          安装步骤
        </h3>
        <div className="grid gap-4">
          <StepCard
            step={1}
            icon={<Download className="w-5 h-5" />}
            title="下载客户端"
            description="访问下载页面，选择适合您操作系统的版本（macOS 12.0+ / Windows 10 64位+），下载并完成安装"
          />
          <StepCard
            step={2}
            icon={<Settings className="w-5 h-5" />}
            title="授权系统权限"
            description="首次启动时，请依次授权：麦克风（语音识别）、屏幕录制（截图分析）、辅助功能（全局快捷键）"
          />
          <StepCard
            step={3}
            icon={<CreditCard className="w-5 h-5" />}
            title="注册并登录"
            description="使用邮箱快速注册，或直接登录已有账号。新用户可免费体验所有核心功能"
          />
          <StepCard
            step={4}
            icon={<MessageSquare className="w-5 h-5" />}
            title="开始面试"
            description="打开会议软件，启动智谈AI，即可获得实时转录、智能应答、多语言翻译等全方位支持"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-primary" />
          常用快捷键
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-sm text-muted-foreground">唤起/隐藏主窗口</span>
            <kbd className="px-2 py-1 rounded bg-white/10 text-xs font-mono text-foreground">⌘ + Shift + A</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-sm text-muted-foreground">开始/暂停转录</span>
            <kbd className="px-2 py-1 rounded bg-white/10 text-xs font-mono text-foreground">⌘ + Shift + R</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-sm text-muted-foreground">截图提问</span>
            <kbd className="px-2 py-1 rounded bg-white/10 text-xs font-mono text-foreground">⌘ + Shift + S</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-sm text-muted-foreground">快速复制回答</span>
            <kbd className="px-2 py-1 rounded bg-white/10 text-xs font-mono text-foreground">⌘ + Shift + C</kbd>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          使用小技巧
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>面试前先测试麦克风和系统音频捕获是否正常工作</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>上传简历可获得更精准的个性化回答建议</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>需要屏幕共享时，智谈AI窗口会自动隐藏</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>遇到问题可随时通过 "帮助 → 反馈" 联系我们</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function FeaturesContent() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center pb-6 border-b border-white/5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          核心能力
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          功能详解
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          了解智谈AI的强大功能，助您在面试中脱颖而出
        </p>
      </div>

      {/* Feature Sections */}
      <div className="space-y-6">
        {/* Real-time Transcription */}
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center">
              <Mic className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">实时语音转录</h3>
          </div>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            采用先进的语音识别引擎，支持麦克风和系统音频双通道同步转录。无论是线上会议还是电话面试，都能精准捕捉每一句对话。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FeatureHighlight
              icon={<Mic className="w-4 h-4" />}
              title="双通道采集"
              description="麦克风+系统音频，精准分离说话人"
            />
            <FeatureHighlight
              icon={<RefreshCw className="w-4 h-4" />}
              title="实时显示"
              description="延迟<500ms，边说边看"
            />
          </div>
        </div>

        {/* AI Response */}
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">智能应答</h3>
          </div>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            基于 GPT-4 等顶级大语言模型，结合面试场景深度优化。能够理解技术问题、行为面试、案例分析等多种题型，给出专业、有条理的回答建议。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FeatureHighlight
              icon={<Zap className="w-4 h-4" />}
              title="快速响应"
              description="平均响应时间<1秒"
            />
            <FeatureHighlight
              icon={<FileText className="w-4 h-4" />}
              title="代码高亮"
              description="支持50+编程语言语法高亮"
            />
          </div>
        </div>

        {/* Translation */}
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">多语言翻译</h3>
          </div>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            跨语言面试不再是障碍。实时翻译对话内容，支持中英日韩法德西俄等8+语言互译，让您自如应对海外公司面试。
          </p>
          <div className="flex flex-wrap gap-2">
            {["中文", "English", "日本語", "한국어", "Français", "Deutsch", "Español", "Русский"].map((lang) => (
              <span 
                key={lang}
                className="px-3 py-1 rounded-full bg-white/5 text-xs text-muted-foreground border border-white/10"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Screen Share Safe */}
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center">
              <Eye className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">屏幕共享安全</h3>
          </div>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            采用特殊窗口层级技术，在屏幕共享时智谈AI窗口自动隐藏，面试官无法看到任何辅助工具痕迹。同时支持一键隐藏，双重保障。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FeatureHighlight
              icon={<Monitor className="w-4 h-4" />}
              title="智能隐藏"
              description="共享时自动从捕获画面中消失"
            />
            <FeatureHighlight
              icon={<Keyboard className="w-4 h-4" />}
              title="一键隐藏"
              description="快捷键瞬间隐藏所有界面"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQContent() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "账号与订阅",
      items: [
        {
          question: "如何注册账号？",
          answer: "打开智谈AI客户端，点击\"注册\"，输入邮箱和密码即可完成注册。我们会发送验证邮件到您的邮箱，点击链接完成验证。"
        },
        {
          question: "忘记密码怎么办？",
          answer: "在登录页面点击\"忘记密码\"，输入注册邮箱，我们会发送密码重置链接到您的邮箱。"
        },
        {
          question: "可以在多台设备上使用吗？",
          answer: "专业版支持同时在2台设备上登录使用，团队版支持最多5台设备。切换设备时，之前的设备会自动下线。"
        },
        {
          question: "套餐到期后数据会丢失吗？",
          answer: "不会。套餐到期后，您的账号和设置都会保留，只是无法使用付费功能。续费后可立即恢复使用。"
        }
      ]
    },
    {
      category: "功能使用",
      items: [
        {
          question: "支持哪些会议软件？",
          answer: (
            <div>
              <p className="mb-2">我们支持市面上所有主流会议软件：</p>
              <ul className="grid grid-cols-2 gap-1">
                <li>• 腾讯会议</li>
                <li>• 飞书会议</li>
                <li>• 钉钉会议</li>
                <li>• 企业微信</li>
                <li>• Zoom</li>
                <li>• Google Meet</li>
                <li>• Microsoft Teams</li>
                <li>• Amazon Chime</li>
              </ul>
            </div>
          )
        },
        {
          question: "语音识别不准确怎么办？",
          answer: "请确保：1) 使用质量较好的麦克风；2) 保持安静的环境；3) 检查系统音频权限是否正确授予。如仍有问题，可在设置中切换语音识别引擎。"
        },
        {
          question: "AI回答有延迟怎么办？",
          answer: "正常情况下AI响应时间在1-3秒。如果延迟较高，请检查网络连接，或在设置中选择响应更快的模型（如GPT-4o-mini）。"
        },
        {
          question: "如何上传简历获得个性化回答？",
          answer: "在客户端首页点击\"上传简历\"，支持PDF、Word、TXT格式。上传后，AI会根据您的经历生成更贴合的回答建议。简历仅存储在本地，不会上传到服务器。"
        }
      ]
    },
    {
      category: "隐私与安全",
      items: [
        {
          question: "我的对话会被记录吗？",
          answer: "不会。所有语音转录和AI对话都是实时处理的，我们不会在服务器上存储任何面试内容。"
        },
        {
          question: "屏幕共享时会被发现吗？",
          answer: "智谈AI采用特殊窗口层级技术，在屏幕共享时完全隐形。我们已在所有主流会议软件上进行过测试验证。同时请注意遵守所在平台和面试的相关规则。"
        },
        {
          question: "上传的简历安全吗？",
          answer: "简历仅存储在您的本地设备上，不会上传到任何服务器。您可以随时在设置中删除已上传的简历。"
        }
      ]
    },
    {
      category: "付款与退款",
      items: [
        {
          question: "支持哪些支付方式？",
          answer: "支持支付宝、微信支付。企业采购可联系我们开具发票。"
        },
        {
          question: "可以退款吗？",
          answer: "如果您在购买后7天内未使用过付费功能，可申请全额退款。请通过客服邮箱 support@zhitanai.com 联系我们。"
        }
      ]
    }
  ];

  let globalIndex = 0;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center pb-6 border-b border-white/5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
          <HelpCircle className="w-4 h-4" />
          有问必答
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          常见问题
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          快速找到您需要的答案
        </p>
      </div>

      {/* FAQ Categories */}
      {faqs.map((category) => (
        <div key={category.category} className="space-y-3">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
            {category.category}
          </h3>
          <div className="space-y-2">
            {category.items.map((item) => {
              const currentIndex = globalIndex++;
              return (
                <FAQItem
                  key={currentIndex}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems.includes(currentIndex)}
                  onToggle={() => toggleItem(currentIndex)}
                />
              );
            })}
          </div>
        </div>
      ))}

      {/* Contact */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 text-center">
        <p className="text-muted-foreground mb-3">
          没有找到您的问题？
        </p>
        <a 
          href="mailto:support@zhitanai.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
        >
          <Mail className="w-4 h-4" />
          联系客服
        </a>
      </div>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center pb-6 border-b border-white/5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-4">
          <Shield className="w-4 h-4" />
          数据安全
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          隐私保护声明
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          我们高度重视您的隐私和数据安全
        </p>
      </div>

      {/* Key Points */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-green-400" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">端到端加密</h4>
          <p className="text-xs text-muted-foreground">所有数据传输均采用TLS 1.3加密</p>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
            <Monitor className="w-6 h-6 text-green-400" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">本地处理</h4>
          <p className="text-xs text-muted-foreground">简历等敏感文件仅在本地存储和处理</p>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
            <Eye className="w-6 h-6 text-green-400" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">无内容存储</h4>
          <p className="text-xs text-muted-foreground">面试对话实时处理，不存储任何内容</p>
        </div>
      </div>

      {/* Detailed Content */}
      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">信息收集</h3>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <div>
              <h4 className="font-medium text-foreground mb-1">我们收集的信息</h4>
              <ul className="space-y-1 ml-4">
                <li>• 账号信息：注册邮箱</li>
                <li>• 设备信息：操作系统版本（用于兼容性优化）</li>
                <li>• 使用数据：功能使用频率（匿名化处理）</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">我们不收集的信息</h4>
              <ul className="space-y-1 ml-4">
                <li>• ❌ 面试对话内容</li>
                <li>• ❌ 简历文件</li>
                <li>• ❌ 麦克风录音</li>
                <li>• ❌ 屏幕截图</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">信息使用</h3>
          <p>我们收集的信息仅用于：</p>
          <ul className="mt-2 space-y-1 ml-4">
            <li>1. 提供和改进服务</li>
            <li>2. 发送重要通知（如安全更新）</li>
            <li>3. 防止欺诈和滥用</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">第三方服务</h3>
          <p>我们使用以下第三方服务：</p>
          <ul className="mt-2 space-y-1 ml-4">
            <li>• 支付处理：支付宝、微信支付（仅处理支付信息）</li>
            <li>• AI服务：OpenAI、Anthropic（仅传输当前对话上下文）</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">您的权利</h3>
          <p>您有权：</p>
          <ul className="mt-2 space-y-1 ml-4">
            <li>• 访问您的个人数据</li>
            <li>• 更正不准确的数据</li>
            <li>• 删除您的账号和相关数据</li>
            <li>• 导出您的数据</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-center">
            如有任何隐私相关问题，请联系：
            <a href="mailto:privacy@zhitanai.com" className="text-primary ml-1 hover:underline">
              privacy@zhitanai.com
            </a>
          </p>
          <p className="text-center text-xs mt-2 text-muted-foreground/60">
            最后更新：2026年1月
          </p>
        </div>
      </div>
    </div>
  );
}

// Document Types
type DocKey = "quickstart" | "features" | "faq" | "privacy";

const docList: { key: DocKey; title: string; description: string; icon: ReactNode }[] = [
  { 
    key: "quickstart", 
    title: "快速开始", 
    description: "3分钟上手指南",
    icon: <Zap className="w-5 h-5" /> 
  },
  { 
    key: "features", 
    title: "功能详解", 
    description: "核心能力介绍",
    icon: <Video className="w-5 h-5" /> 
  },
  { 
    key: "faq", 
    title: "常见问题", 
    description: "快速找到答案",
    icon: <HelpCircle className="w-5 h-5" /> 
  },
  { 
    key: "privacy", 
    title: "隐私声明", 
    description: "数据安全保护",
    icon: <Shield className="w-5 h-5" /> 
  },
];

export default function DocsPage() {
  const [activeDoc, setActiveDoc] = useState<DocKey>("quickstart");

  const renderContent = () => {
    switch (activeDoc) {
      case "quickstart":
        return <QuickStartContent />;
      case "features":
        return <FeaturesContent />;
      case "faq":
        return <FAQContent />;
      case "privacy":
        return <PrivacyContent />;
      default:
        return <QuickStartContent />;
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <Section className="pt-16">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">帮助中心</h1>
            <p className="text-muted-foreground">全面了解智谈AI的使用方法</p>
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
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200",
                      activeDoc === doc.key
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "transition-colors",
                        activeDoc === doc.key ? "text-primary" : "text-muted-foreground"
                      )}>
                        {doc.icon}
                      </span>
                      <div>
                        <span className={cn(
                          "text-sm font-medium block",
                          activeDoc === doc.key ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {doc.title}
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          {doc.description}
                        </span>
                      </div>
                    </div>
                    {activeDoc === doc.key && (
                      <ChevronRight className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-xs text-muted-foreground/60 px-4 mb-3">快速链接</p>
                <div className="space-y-1">
                  <a 
                    href="/download" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    下载客户端
                  </a>
                  <a 
                    href="/pricing" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    查看定价
                  </a>
                  <a 
                    href="mailto:support@zhitanai.com" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    联系客服
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <GlassCard>
              {renderContent()}
            </GlassCard>
          </div>
        </div>
      </Section>
    </div>
  );
}
