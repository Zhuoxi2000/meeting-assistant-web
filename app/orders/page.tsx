"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Section from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import SecondaryButton from "@/components/SecondaryButton";
import { 
  Clock, CheckCircle, XCircle, AlertCircle, 
  ArrowLeft, Package, RefreshCw 
} from "lucide-react";
import { apiClient, type OrderResponse } from "@/lib/api";

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending: { 
      label: "待支付", 
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      icon: <Clock className="w-3.5 h-3.5" />
    },
    paid: { 
      label: "已支付", 
      color: "bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]/30",
      icon: <CheckCircle className="w-3.5 h-3.5" />
    },
    cancelled: { 
      label: "已取消", 
      color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      icon: <XCircle className="w-3.5 h-3.5" />
    },
    refunded: { 
      label: "已退款", 
      color: "bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/30",
      icon: <RefreshCw className="w-3.5 h-3.5" />
    },
    failed: { 
      label: "支付失败", 
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      icon: <AlertCircle className="w-3.5 h-3.5" />
    },
  };

  const { label, color, icon } = config[status] || config.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${color}`}>
      {icon}
      {label}
    </span>
  );
}

// Format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrdersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/user?redirect=/orders");
      return;
    }

    loadOrders();
  }, [session, status]);

  const loadOrders = async () => {
    if (!session?.accessToken) return;

    setIsLoading(true);
    setError(null);

    try {
      apiClient.setAccessToken(session.accessToken);
      const response = await apiClient.getOrders();
      setOrders(response.orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载订单失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinuePayment = (orderId: string) => {
    router.push(`/checkout?orderId=${orderId}`);
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

  return (
    <div className="min-h-screen pt-24">
      <Section className="py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push("/user")}
              className="p-2 rounded-lg hover:bg-[#00D4FF]/10 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#94A3C8]" />
            </button>
            <h1 className="text-2xl font-bold text-[#F0F4FF]">我的订单</h1>
          </div>

          {error && (
            <GlassCard className="mb-6">
              <div className="flex items-center gap-3 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </GlassCard>
          )}

          {orders.length === 0 ? (
            <GlassCard className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#00D4FF]/10 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-[#00D4FF]" />
              </div>
              <h3 className="text-lg font-medium text-[#F0F4FF] mb-2">暂无订单</h3>
              <p className="text-[#94A3C8] mb-6">您还没有购买任何套餐</p>
              <SecondaryButton onClick={() => router.push("/pricing")}>
                查看套餐
              </SecondaryButton>
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <GlassCard key={order.id} hover>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#F0F4FF]">
                          {order.package_name}
                        </h3>
                        <StatusBadge status={order.status} />
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#94A3C8]">
                        <span>订单号: <span className="font-mono text-[#00D4FF]">{order.order_no}</span></span>
                        <span>创建时间: {formatDate(order.created_at)}</span>
                        {order.paid_at && (
                          <span>支付时间: {formatDate(order.paid_at)}</span>
                        )}
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#F0F4FF]">
                          ¥{(order.amount_cents / 100).toFixed(0)}
                        </p>
                        {order.payment_method && (
                          <p className="text-xs text-[#94A3C8]">
                            {order.payment_method === "mock" ? "模拟支付" : order.payment_method}
                          </p>
                        )}
                      </div>

                      {order.status === "pending" && (
                        <SecondaryButton
                          onClick={() => handleContinuePayment(order.id)}
                        >
                          继续支付
                        </SecondaryButton>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
