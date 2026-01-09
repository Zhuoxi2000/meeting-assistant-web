"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Section, { SectionHeader } from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { Check, Clock, Zap, Sparkles, Gift, Crown, Rocket } from "lucide-react";
import { apiClient, type PackageResponse } from "@/lib/api";

// Helper to format minutes into readable time
function formatMinutes(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
  }
  return `${minutes}分钟`;
}

// Helper to format price from cents to yuan
function formatPrice(cents: number): string {
  return (cents / 100).toFixed(0);
}

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [packages, setPackages] = useState<PackageResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const response = await apiClient.getPackages();
      setPackages(response.packages);
    } catch (error) {
      console.error("Failed to load packages:", error);
      // Use fallback packages
      setPackages([
        {
          id: "basic_40",
          name: "入门套餐",
          description: "适合轻度使用用户",
          price_cents: 9800,
          basic_minutes: 40,
          premium_minutes: 15,
          validity_days: 0,
          sort_order: 1,
          is_active: true,
          is_trial: false,
        },
        {
          id: "pro_120",
          name: "专业套餐",
          description: "适合日常使用用户",
          price_cents: 29800,
          basic_minutes: 120,
          premium_minutes: 30,
          validity_days: 0,
          sort_order: 2,
          is_active: true,
          is_trial: false,
        },
        {
          id: "premium_300",
          name: "高级套餐",
          description: "适合重度使用用户",
          price_cents: 68800,
          basic_minutes: 300,
          premium_minutes: 60,
          validity_days: 0,
          sort_order: 3,
          is_active: true,
          is_trial: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (packageId: string) => {
    if (!session) {
      router.push("/user?redirect=/pricing");
      return;
    }

    setPurchasingId(packageId);
    try {
      if (session?.accessToken) {
        apiClient.setAccessToken(session.accessToken);
      }
      const order = await apiClient.createOrder(packageId);
      router.push(`/checkout?orderId=${order.id}`);
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("创建订单失败，请重试");
    } finally {
      setPurchasingId(null);
    }
  };

  // Map package IDs to icons
  const packageIcons: Record<string, React.ReactNode> = {
    basic_40: <Zap className="w-6 h-6" />,
    pro_120: <Rocket className="w-6 h-6" />,
    premium_300: <Crown className="w-6 h-6" />,
  };

  // Map package IDs to accent colors
  const packageColors: Record<string, string> = {
    basic_40: "from-[#00D4FF] to-[#0066FF]",
    pro_120: "from-[#0066FF] to-[#A855F7]",
    premium_300: "from-[#00FF88] to-[#00D4FF]",
  };

  // Mark the middle package as popular
  const getPopularIndex = () => {
    if (packages.length === 3) return 1;
    return -1;
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <Section className="pt-16 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F0F4FF] mb-4">
            选择您的<span className="text-[#00D4FF]">套餐</span>
          </h1>
          <p className="text-lg text-[#94A3C8] max-w-2xl mx-auto mb-6">
            灵活的定价方案，满足不同面试需求
          </p>

          {/* Trial Banner */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-sm">
            <Gift className="w-4 h-4" />
            <span>新用户专享：7天体验 + 30分钟基础模型</span>
          </div>
        </div>

        {/* Pricing Cards */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-[#00D4FF] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, index) => {
              const isPopular = index === getPopularIndex();
              const gradientColor = packageColors[pkg.id] || "from-[#00D4FF] to-[#0066FF]";
              
              return (
                <div
                  key={pkg.id}
                  className={`relative ${isPopular ? "md:-mt-4 md:mb-4" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0066FF] text-[#030712] text-sm font-semibold z-10 shadow-lg shadow-[#00D4FF]/30">
                      最受欢迎
                    </div>
                  )}
                  <GlassCard
                    className={`h-full flex flex-col ${
                      isPopular ? "border-[#00D4FF]/40 shadow-lg shadow-[#00D4FF]/10" : ""
                    }`}
                    hover
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColor} bg-opacity-20 flex items-center justify-center text-[#030712]`}>
                        {packageIcons[pkg.id] || <Zap className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#F0F4FF]">{pkg.name}</h3>
                        <p className="text-sm text-[#94A3C8]">{pkg.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-[#F0F4FF]">
                          ¥{formatPrice(pkg.price_cents)}
                        </span>
                      </div>
                      <p className="text-sm text-[#94A3C8] mt-1">
                        {pkg.validity_days === 0 ? "永久有效，用完为止" : `有效期 ${pkg.validity_days} 天`}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#00FF88]" />
                        </div>
                        <span className="text-[#94A3C8]">
                          <span className="text-[#F0F4FF] font-medium">{formatMinutes(pkg.basic_minutes)}</span> 基础模型
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#00FF88]" />
                        </div>
                        <span className="text-[#94A3C8]">
                          <span className="text-[#F0F4FF] font-medium">{formatMinutes(pkg.premium_minutes)}</span> 强模型
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#00FF88]" />
                        </div>
                        <span className="text-[#94A3C8]">DeepSeek、GPT-4o Mini</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#00FF88]" />
                        </div>
                        <span className="text-[#94A3C8]">GPT-4o、Claude 3.5 Sonnet</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#00FF88]" />
                        </div>
                        <span className="text-[#94A3C8]">实时语音转写</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#00FF88]" />
                        </div>
                        <span className="text-[#94A3C8]">屏幕上下文识别</span>
                      </li>
                    </ul>

                    {isPopular ? (
                      <PrimaryButton
                        fullWidth
                        onClick={() => handlePurchase(pkg.id)}
                        disabled={purchasingId === pkg.id}
                      >
                        {purchasingId === pkg.id ? "处理中..." : "立即购买"}
                      </PrimaryButton>
                    ) : (
                      <SecondaryButton
                        fullWidth
                        onClick={() => handlePurchase(pkg.id)}
                        disabled={purchasingId === pkg.id}
                      >
                        {purchasingId === pkg.id ? "处理中..." : "立即购买"}
                      </SecondaryButton>
                    )}
                  </GlassCard>
                </div>
              );
            })}
          </div>
        )}

        {/* Model Info */}
        <div className="mt-12 max-w-3xl mx-auto">
          <GlassCard>
            <h3 className="text-lg font-semibold text-[#F0F4FF] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00D4FF]" />
              模型说明
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0066FF]/5 border border-[#00D4FF]/10">
                <h4 className="text-sm font-medium text-[#F0F4FF] mb-2">基础模型</h4>
                <p className="text-sm text-[#94A3C8]">
                  包括 DeepSeek Chat、GPT-4o Mini，适合日常对话和快速问答
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0066FF]/5 border border-[#00D4FF]/10">
                <h4 className="text-sm font-medium text-[#F0F4FF] mb-2">强模型</h4>
                <p className="text-sm text-[#94A3C8]">
                  包括 GPT-4o、Claude 3.5 Sonnet，适合复杂推理和深度分析
                </p>
              </div>
            </div>
          </GlassCard>
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
              q: "套餐有效期是多久？",
              a: "购买的套餐永久有效，用完为止。新用户的7天体验套餐有7天有效期限制。",
            },
            {
              q: "支持哪些支付方式？",
              a: "目前支持支付宝、微信支付等主流支付方式，更多支付方式即将上线。",
            },
            {
              q: "可以叠加购买多个套餐吗？",
              a: "可以！多个套餐的额度会叠加计算，您可以根据需要随时购买。",
            },
            {
              q: "用量是如何计算的？",
              a: "按实际使用AI对话的时长计费，精确到分钟，不足一分钟按一分钟计算。",
            },
          ].map((item, i) => (
            <GlassCard key={i} hover>
              <h3 className="text-base font-semibold text-[#F0F4FF] mb-2">{item.q}</h3>
              <p className="text-sm text-[#94A3C8]">{item.a}</p>
            </GlassCard>
          ))}
        </div>
      </Section>
    </div>
  );
}
