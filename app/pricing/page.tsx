"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Section, { SectionHeader } from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { Check, Clock, Zap, Sparkles, Gift } from "lucide-react";
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
    pro_120: <Sparkles className="w-6 h-6" />,
    premium_300: <Clock className="w-6 h-6" />,
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#EDEFF7] mb-4">
            购买套餐
          </h1>
          <p className="text-lg text-[#AAB0C0] max-w-2xl mx-auto mb-4">
            选择适合你的套餐，开启高效面试之旅
          </p>

          {/* Trial Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
            <Gift className="w-4 h-4" />
            <span>新用户专享：7天体验 + 30分钟基础模型</span>
          </div>
        </div>

        {/* Pricing Cards */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-[#6366F1] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, index) => {
              const isPopular = index === getPopularIndex();
              
              return (
                <div
                  key={pkg.id}
                  className={`relative ${isPopular ? "md:-mt-4 md:mb-4" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#6366F1] text-white text-sm font-medium z-10">
                      最受欢迎
                    </div>
                  )}
                  <GlassCard
                    className={`h-full flex flex-col ${
                      isPopular ? "border-[#6366F1]/50 shadow-lg shadow-[#6366F1]/10" : ""
                    }`}
                    hover
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1]">
                        {packageIcons[pkg.id] || <Zap className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#EDEFF7]">{pkg.name}</h3>
                        <p className="text-sm text-[#AAB0C0]">{pkg.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-[#EDEFF7]">
                          ¥{formatPrice(pkg.price_cents)}
                        </span>
                      </div>
                      <p className="text-sm text-[#AAB0C0] mt-1">
                        {pkg.validity_days === 0 ? "永久有效，用完为止" : `有效期 ${pkg.validity_days} 天`}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-center gap-3 text-sm">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-[#AAB0C0]">
                          <span className="text-[#EDEFF7] font-medium">{formatMinutes(pkg.basic_minutes)}</span> 基础模型
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-[#AAB0C0]">
                          <span className="text-[#EDEFF7] font-medium">{formatMinutes(pkg.premium_minutes)}</span> 强模型
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-[#AAB0C0]">DeepSeek、GPT-4o Mini</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-[#AAB0C0]">GPT-4o、Claude 3.5 Sonnet</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-[#AAB0C0]">实时语音转写</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-[#AAB0C0]">屏幕上下文识别</span>
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
            <h3 className="text-lg font-semibold text-[#EDEFF7] mb-4">模型说明</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="text-sm font-medium text-[#EDEFF7] mb-2">基础模型</h4>
                <p className="text-sm text-[#AAB0C0]">
                  包括 DeepSeek Chat、GPT-4o Mini，适合日常对话和快速问答
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="text-sm font-medium text-[#EDEFF7] mb-2">强模型</h4>
                <p className="text-sm text-[#AAB0C0]">
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
