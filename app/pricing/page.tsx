"use client";

import { useState } from "react";
import Section, { SectionHeader } from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { Check, X, Zap, Users, Building } from "lucide-react";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: <Zap className="w-6 h-6" />,
      description: "适合个人用户体验",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { text: "每天30分钟免费使用", included: true },
        { text: "基础AI面试辅导", included: true },
        { text: "中文语言支持", included: true },
        { text: "多语言翻译", included: false },
        { text: "简历个性化", included: false },
        { text: "优先客服支持", included: false },
      ],
      cta: "免费开始",
      popular: false,
    },
    {
      name: "Pro",
      icon: <Users className="w-6 h-6" />,
      description: "适合求职者深度使用",
      monthlyPrice: 99,
      yearlyPrice: 999,
      features: [
        { text: "无限时长使用", included: true },
        { text: "高级AI面试辅导", included: true },
        { text: "8种语言支持", included: true },
        { text: "实时多语言翻译", included: true },
        { text: "简历个性化回答", included: true },
        { text: "优先客服支持", included: false },
      ],
      cta: "升级 Pro",
      popular: true,
    },
    {
      name: "Team",
      icon: <Building className="w-6 h-6" />,
      description: "适合企业和团队",
      monthlyPrice: 299,
      yearlyPrice: 2999,
      features: [
        { text: "无限时长使用", included: true },
        { text: "高级AI面试辅导", included: true },
        { text: "8种语言支持", included: true },
        { text: "实时多语言翻译", included: true },
        { text: "简历个性化回答", included: true },
        { text: "专属客服 & 培训", included: true },
      ],
      cta: "联系销售",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <Section className="pt-16 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#EDEFF7] mb-4">
            购买套餐
          </h1>
          <p className="text-lg text-[#AAB0C0] max-w-2xl mx-auto mb-8">
            选择适合你的套餐，开启高效面试之旅
          </p>

          {/* Monthly/Yearly Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-full glass-card">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                !isYearly
                  ? "bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/30"
                  : "text-[#AAB0C0] hover:text-[#EDEFF7]"
              }`}
            >
              月付
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isYearly
                  ? "bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/30"
                  : "text-[#AAB0C0] hover:text-[#EDEFF7]"
              }`}
            >
              年付
              <span className="ml-2 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                省20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#6366F1] text-white text-sm font-medium z-10">
                  最受欢迎
                </div>
              )}
              <GlassCard
                className={`h-full flex flex-col ${
                  plan.popular ? "border-[#6366F1]/50 shadow-lg shadow-[#6366F1]/10" : ""
                }`}
                hover
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1]">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#EDEFF7]">{plan.name}</h3>
                    <p className="text-sm text-[#AAB0C0]">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#EDEFF7]">
                      ¥{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-[#AAB0C0]">
                      /{isYearly ? "年" : "月"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-[#AAB0C0]/50 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-[#AAB0C0]" : "text-[#AAB0C0]/50"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.popular ? (
                  <PrimaryButton fullWidth>{plan.cta}</PrimaryButton>
                ) : (
                  <SecondaryButton fullWidth>{plan.cta}</SecondaryButton>
                )}
              </GlassCard>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Preview */}
      <Section withGradient="center">
        <SectionHeader
          title="常见问题"
          subtitle="关于定价的常见问题"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              q: "可以随时取消订阅吗？",
              a: "是的，您可以随时取消订阅。取消后，您可以继续使用服务直到当前计费周期结束。",
            },
            {
              q: "支持哪些支付方式？",
              a: "我们支持支付宝、微信支付、银行卡等主流支付方式，企业用户也可以选择对公转账。",
            },
            {
              q: "年付套餐可以退款吗？",
              a: "年付套餐在购买后7天内可以申请全额退款，超过7天则按已使用月份计算退款金额。",
            },
            {
              q: "团队版有折扣吗？",
              a: "团队版超过10人有额外折扣，具体优惠请联系我们的销售团队获取报价。",
            },
          ].map((item, i) => (
            <GlassCard key={i}>
              <h3 className="text-base font-semibold text-[#EDEFF7] mb-2">{item.q}</h3>
              <p className="text-sm text-[#AAB0C0]">{item.a}</p>
            </GlassCard>
          ))}
        </div>
      </Section>
    </div>
  );
}

