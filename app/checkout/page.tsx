"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Section from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { 
  CreditCard, Smartphone, Check, ArrowLeft, Shield, 
  Clock, Zap, AlertCircle, CheckCircle2 
} from "lucide-react";
import { apiClient, type OrderResponse, type PackageResponse } from "@/lib/api";

// Helper to format minutes
function formatMinutes(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
  }
  return `${minutes}分钟`;
}

// Payment method icons
function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 00.186-.059l1.807-1.003a.593.593 0 01.527-.058c1.06.348 2.216.549 3.422.549.225 0 .447-.009.667-.023-.168-.519-.257-1.065-.257-1.627 0-3.617 3.499-6.55 7.811-6.55.176 0 .349.008.521.018C16.737 4.97 13.022 2.188 8.691 2.188zm-2.24 3.802a1.087 1.087 0 11-.001 2.174 1.087 1.087 0 01.001-2.174zm5.108 0a1.087 1.087 0 110 2.174 1.087 1.087 0 010-2.174z"/>
      <path d="M23.982 14.841c0-3.231-3.12-5.852-6.97-5.852-3.848 0-6.97 2.621-6.97 5.852 0 3.232 3.122 5.853 6.97 5.853.742 0 1.458-.092 2.131-.259a.47.47 0 01.417.046l1.427.793a.26.26 0 00.147.047.232.232 0 00.23-.234c0-.058-.023-.113-.038-.168l-.308-1.17a.467.467 0 01.168-.527c1.426-1.067 2.796-2.685 2.796-4.381zm-9.463-.342a.862.862 0 11.002-1.724.862.862 0 01-.002 1.724zm4.986 0a.862.862 0 110-1.724.862.862 0 010 1.724z"/>
    </svg>
  );
}

function AlipayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.422 15.358c-1.426-.538-3.18-1.192-5.166-1.96a25.96 25.96 0 001.672-3.877h-4.084V7.893h5.035V6.864h-5.035V4.5h-2.5v2.364H6.31v1.029h5.035v1.628H7.201v1.029h8.751a20.37 20.37 0 01-1.067 2.5c-2.314-.816-4.37-1.446-5.97-1.446-3.071 0-4.496 1.786-4.496 3.5 0 2.143 1.714 3.572 4.857 3.572 2.357 0 4.643-1.214 6.5-3.357 2.393 1.071 5.179 2.357 7.714 3.571L24 17.604c-.857-.393-1.714-.821-2.578-1.246zM9.086 17.604c-2.214 0-2.928-.929-2.928-1.929 0-1.071.786-1.857 2.214-1.857 1.214 0 2.786.464 5.072 1.464-1.572 1.607-3.143 2.322-4.358 2.322z"/>
    </svg>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [packageInfo, setPackageInfo] = useState<PackageResponse | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>("mock");
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push(`/user?redirect=/checkout?orderId=${orderId}`);
      return;
    }

    if (!orderId) {
      router.push("/pricing");
      return;
    }

    loadOrder();
  }, [session, status, orderId]);

  const loadOrder = async () => {
    if (!orderId || !session?.accessToken) return;

    setIsLoading(true);
    setError(null);

    try {
      apiClient.setAccessToken(session.accessToken);
      const orderData = await apiClient.getOrder(orderId);
      setOrder(orderData);

      // Load package info
      const pkgData = await apiClient.getPackage(orderData.package_id);
      setPackageInfo(pkgData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载订单失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!order || !session?.accessToken) return;

    setIsPaying(true);
    setError(null);

    try {
      apiClient.setAccessToken(session.accessToken);
      const result = await apiClient.payOrder(order.id, selectedPayment);
      
      if (result.success) {
        setPaymentSuccess(true);
        // Redirect to success page after a delay
        setTimeout(() => {
          router.push("/user");
        }, 2000);
      } else {
        setError(result.message || "支付失败");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "支付失败");
    } finally {
      setIsPaying(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#00D4FF] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-[#94A3C8]">加载中...</p>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Section className="max-w-lg mx-auto">
          <GlassCard className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-[#00FF88]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#00FF88]" />
            </div>
            <h2 className="text-2xl font-bold text-[#F0F4FF] mb-2">支付成功</h2>
            <p className="text-[#94A3C8] mb-6">您的套餐已激活，即将跳转到用户中心...</p>
            <PrimaryButton onClick={() => router.push("/user")}>
              立即前往
            </PrimaryButton>
          </GlassCard>
        </Section>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Section className="max-w-lg mx-auto">
          <GlassCard className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#F0F4FF] mb-2">加载失败</h2>
            <p className="text-[#94A3C8] mb-6">{error}</p>
            <SecondaryButton onClick={() => router.push("/pricing")}>
              返回套餐页
            </SecondaryButton>
          </GlassCard>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <Section className="py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push("/pricing")}
              className="p-2 rounded-lg hover:bg-[#00D4FF]/10 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#94A3C8]" />
            </button>
            <h1 className="text-2xl font-bold text-[#F0F4FF]">确认订单</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Package Info */}
              <GlassCard>
                <h2 className="text-lg font-semibold text-[#F0F4FF] mb-4">套餐详情</h2>
                {packageInfo && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center">
                        <Zap className="w-7 h-7 text-[#030712]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#F0F4FF]">{packageInfo.name}</h3>
                        <p className="text-sm text-[#94A3C8]">{packageInfo.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#00D4FF]/10">
                      <div className="p-3 rounded-xl bg-[#0066FF]/5 border border-[#00D4FF]/10">
                        <p className="text-sm text-[#94A3C8] mb-1">基础模型时间</p>
                        <p className="text-lg font-semibold text-[#F0F4FF]">
                          {formatMinutes(packageInfo.basic_minutes)}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0066FF]/5 border border-[#00D4FF]/10">
                        <p className="text-sm text-[#94A3C8] mb-1">强模型时间</p>
                        <p className="text-lg font-semibold text-[#F0F4FF]">
                          {formatMinutes(packageInfo.premium_minutes)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#94A3C8]">
                      <Clock className="w-4 h-4 text-[#00D4FF]" />
                      <span>
                        {packageInfo.validity_days === 0 
                          ? "永久有效，用完为止" 
                          : `有效期 ${packageInfo.validity_days} 天`
                        }
                      </span>
                    </div>
                  </div>
                )}
              </GlassCard>

              {/* Payment Method */}
              <GlassCard>
                <h2 className="text-lg font-semibold text-[#F0F4FF] mb-4">支付方式</h2>
                <div className="space-y-3">
                  {[
                    { id: "mock", name: "模拟支付", icon: <CreditCard className="w-6 h-6" />, desc: "测试环境" },
                    { id: "wechat", name: "微信支付", icon: <WeChatIcon className="w-6 h-6" />, desc: "即将上线" },
                    { id: "alipay", name: "支付宝", icon: <AlipayIcon className="w-6 h-6" />, desc: "即将上线" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => method.id === "mock" && setSelectedPayment(method.id)}
                      disabled={method.id !== "mock"}
                      className={`w-full p-4 rounded-xl border transition-all ${
                        selectedPayment === method.id
                          ? "border-[#00D4FF] bg-[#00D4FF]/10"
                          : method.id === "mock"
                          ? "border-[#00D4FF]/20 hover:border-[#00D4FF]/40"
                          : "border-[#00D4FF]/10 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          method.id === "wechat" ? "bg-[#07C160]/20 text-[#07C160]" :
                          method.id === "alipay" ? "bg-[#1677FF]/20 text-[#1677FF]" :
                          "bg-[#00D4FF]/20 text-[#00D4FF]"
                        }`}>
                          {method.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-[#F0F4FF]">{method.name}</p>
                          <p className="text-sm text-[#94A3C8]">{method.desc}</p>
                        </div>
                        {selectedPayment === method.id && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center">
                            <Check className="w-4 h-4 text-[#030712]" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <GlassCard>
                  <h2 className="text-lg font-semibold text-[#F0F4FF] mb-4">订单摘要</h2>
                  
                  {order && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#94A3C8]">订单号</span>
                        <span className="text-[#F0F4FF] font-mono">{order.order_no}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-[#94A3C8]">套餐</span>
                        <span className="text-[#F0F4FF]">{order.package_name}</span>
                      </div>

                      <div className="pt-4 border-t border-[#00D4FF]/10">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[#94A3C8]">应付金额</span>
                          <span className="text-3xl font-bold text-[#00D4FF]">
                            ¥{(order.amount_cents / 100).toFixed(0)}
                          </span>
                        </div>
                      </div>

                      {error && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                          {error}
                        </div>
                      )}

                      <PrimaryButton
                        fullWidth
                        size="lg"
                        onClick={handlePayment}
                        disabled={isPaying || !selectedPayment}
                      >
                        {isPaying ? (
                          <span className="flex items-center">
                            <div className="w-5 h-5 rounded-full border-2 border-[#030712]/30 border-t-[#030712] animate-spin mr-2" />
                            处理中...
                          </span>
                        ) : (
                          `支付 ¥${(order.amount_cents / 100).toFixed(0)}`
                        )}
                      </PrimaryButton>

                      <div className="flex items-center justify-center gap-2 text-xs text-[#94A3C8]">
                        <Shield className="w-4 h-4 text-[#00FF88]" />
                        <span>安全支付，资金有保障</span>
                      </div>
                    </div>
                  )}
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#00D4FF] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-[#94A3C8]">加载中...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
