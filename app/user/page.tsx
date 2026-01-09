"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Section from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { 
  User, Lock, LogIn, UserPlus, Eye, EyeOff, LogOut, 
  Settings, CreditCard, History, Copy, Check, RefreshCw,
  Smartphone, Monitor, Zap, Clock, Gift, ChevronRight,
  Package, AlertCircle, Sparkles
} from "lucide-react";
import { apiClient, type DeviceClaimCodeResponse, type QuotaResponse } from "@/lib/api";

// 微信图标组件
function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 00.186-.059l1.807-1.003a.593.593 0 01.527-.058c1.06.348 2.216.549 3.422.549.225 0 .447-.009.667-.023-.168-.519-.257-1.065-.257-1.627 0-3.617 3.499-6.55 7.811-6.55.176 0 .349.008.521.018C16.737 4.97 13.022 2.188 8.691 2.188zm-2.24 3.802a1.087 1.087 0 11-.001 2.174 1.087 1.087 0 01.001-2.174zm5.108 0a1.087 1.087 0 110 2.174 1.087 1.087 0 010-2.174z"/>
      <path d="M23.982 14.841c0-3.231-3.12-5.852-6.97-5.852-3.848 0-6.97 2.621-6.97 5.852 0 3.232 3.122 5.853 6.97 5.853.742 0 1.458-.092 2.131-.259a.47.47 0 01.417.046l1.427.793a.26.26 0 00.147.047.232.232 0 00.23-.234c0-.058-.023-.113-.038-.168l-.308-1.17a.467.467 0 01.168-.527c1.426-1.067 2.796-2.685 2.796-4.381zm-9.463-.342a.862.862 0 11.002-1.724.862.862 0 01-.002 1.724zm4.986 0a.862.862 0 110-1.724.862.862 0 010 1.724z"/>
    </svg>
  );
}

// Helper to format minutes
function formatMinutes(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${minutes}m`;
}

// Progress bar component
function QuotaProgress({ 
  used, 
  total, 
  label,
  colorClass = "bg-gradient-to-r from-[#00D4FF] to-[#0066FF]"
}: { 
  used: number; 
  total: number; 
  label: string;
  colorClass?: string;
}) {
  const percentage = total > 0 ? Math.min(100, (used / total) * 100) : 0;
  const remaining = total - used;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[#94A3C8]">{label}</span>
        <span className="text-[#F0F4FF] font-medium">
          {formatMinutes(remaining)} / {formatMinutes(total)}
        </span>
      </div>
      <div className="h-2 rounded-full bg-[#0066FF]/10 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${100 - percentage}%` }}
        />
      </div>
    </div>
  );
}

// 设备绑定码组件
function DeviceClaimCodeCard() {
  const { data: session } = useSession();
  const [claimCode, setClaimCode] = useState<DeviceClaimCodeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  const generateClaimCode = async () => {
    if (!session?.accessToken) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      apiClient.setAccessToken(session.accessToken);
      const code = await apiClient.createDeviceClaimCode();
      setClaimCode(code);
      setCountdown(code.expires_in);
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成绑定码失败");
    } finally {
      setIsLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setClaimCode(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const copyToClipboard = async () => {
    if (!claimCode) return;
    
    try {
      await navigator.clipboard.writeText(claimCode.claim_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <GlassCard className="mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-[#030712]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#F0F4FF]">设备绑定</h3>
          <p className="text-sm text-[#94A3C8]">将您的 macOS 客户端绑定到此账号</p>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      {claimCode ? (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-[#0066FF]/5 border border-[#00D4FF]/20 text-center">
            <p className="text-sm text-[#94A3C8] mb-2">绑定码</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-mono font-bold text-[#00D4FF] tracking-wider text-glow">
                {claimCode.claim_code}
              </span>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-[#00FF88]" />
                ) : (
                  <Copy className="w-5 h-5 text-[#94A3C8]" />
                )}
              </button>
            </div>
            <p className="text-sm text-[#94A3C8] mt-3">
              有效时间: <span className="text-[#00D4FF] font-mono">{formatTime(countdown)}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30">
            <p className="text-sm text-[#94A3C8]">
              <strong className="text-[#F0F4FF]">使用方法：</strong>
            </p>
            <ol className="text-sm text-[#94A3C8] mt-2 space-y-1 list-decimal list-inside">
              <li>打开 macOS 客户端</li>
              <li>点击"登录"按钮</li>
              <li>输入上方的绑定码</li>
            </ol>
          </div>

          <SecondaryButton 
            fullWidth 
            onClick={generateClaimCode}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            重新生成
          </SecondaryButton>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0066FF]/5 border border-[#00D4FF]/10">
            <div className="flex items-center gap-3 mb-3">
              <Monitor className="w-5 h-5 text-[#00D4FF]" />
              <span className="text-sm text-[#94A3C8]">
                在 macOS 客户端中输入绑定码，即可将客户端与您的账号关联
              </span>
            </div>
          </div>

          <PrimaryButton 
            fullWidth 
            onClick={generateClaimCode}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                生成中...
              </span>
            ) : (
              "生成绑定码"
            )}
          </PrimaryButton>
        </div>
      )}
    </GlassCard>
  );
}

// 订阅和额度卡片
function SubscriptionCard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [quota, setQuota] = useState<QuotaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActivatingTrial, setIsActivatingTrial] = useState(false);

  useEffect(() => {
    loadQuota();
  }, [session]);

  const loadQuota = async () => {
    if (!session?.accessToken) return;

    try {
      apiClient.setAccessToken(session.accessToken);
      const quotaData = await apiClient.getQuota();
      setQuota(quotaData);
    } catch (err) {
      console.error("Failed to load quota:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const activateTrial = async () => {
    if (!session?.accessToken) return;

    setIsActivatingTrial(true);
    try {
      apiClient.setAccessToken(session.accessToken);
      await apiClient.createTrialSubscription();
      await loadQuota();
    } catch (err) {
      console.error("Failed to activate trial:", err);
      alert(err instanceof Error ? err.message : "激活体验失败");
    } finally {
      setIsActivatingTrial(false);
    }
  };

  if (isLoading) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-[#00D4FF]/10 rounded w-1/3"></div>
          <div className="h-4 bg-[#00D4FF]/10 rounded w-1/2"></div>
          <div className="h-2 bg-[#00D4FF]/10 rounded"></div>
        </div>
      </GlassCard>
    );
  }

  // No subscription
  if (!quota?.has_active_subscription) {
    return (
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center">
            <Package className="w-5 h-5 text-[#030712]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#F0F4FF]">我的套餐</h3>
            <p className="text-sm text-[#94A3C8]">暂无有效套餐</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/30 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-[#00FF88]" />
            <span className="font-medium text-[#00FF88]">新用户专享</span>
          </div>
          <p className="text-sm text-[#94A3C8]">
            激活 7 天体验套餐，获得 30 分钟基础模型使用时间
          </p>
        </div>

        <div className="flex gap-3">
          <SecondaryButton
            fullWidth
            onClick={activateTrial}
            disabled={isActivatingTrial}
          >
            {isActivatingTrial ? "激活中..." : "激活体验"}
          </SecondaryButton>
          <PrimaryButton
            fullWidth
            onClick={() => router.push("/pricing")}
          >
            购买套餐
          </PrimaryButton>
        </div>
      </GlassCard>
    );
  }

  // Has subscription
  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#030712]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#F0F4FF]">
              {quota.package_name || "当前套餐"}
            </h3>
            {quota.earliest_expires_at ? (
              <p className="text-sm text-[#94A3C8]">
                到期时间: {new Date(quota.earliest_expires_at).toLocaleDateString("zh-CN")}
              </p>
            ) : (
              <p className="text-sm text-[#00FF88]">永久有效</p>
            )}
          </div>
        </div>
        <SecondaryButton onClick={() => router.push("/pricing")}>
          续费
        </SecondaryButton>
      </div>

      {/* Quota Progress */}
      <div className="space-y-4">
        <QuotaProgress
          used={quota.basic_minutes_used}
          total={quota.basic_minutes_total}
          label="基础模型"
          colorClass="bg-gradient-to-r from-[#00D4FF] to-[#0066FF]"
        />
        <QuotaProgress
          used={quota.premium_minutes_used}
          total={quota.premium_minutes_total}
          label="强模型"
          colorClass="bg-gradient-to-r from-[#A855F7] to-[#0066FF]"
        />
      </div>

      {/* Warning if low quota */}
      {(quota.basic_minutes_remaining < 10 || quota.premium_minutes_remaining < 5) && (
        <div className="mt-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          <span className="text-sm text-yellow-400">
            额度即将用完，建议及时续费
          </span>
        </div>
      )}
    </GlassCard>
  );
}

// 未登录状态的登录表单
function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login flow - use NextAuth credentials provider
        const result = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("用户名或密码错误");
        } else if (result?.ok) {
          window.location.href = "/user";
        }
      } else {
        // Registration flow - call API directly
        if (password !== confirmPassword) {
          setError("两次输入的密码不一致");
          setIsLoading(false);
          return;
        }

        if (password.length < 6) {
          setError("密码长度至少为6位");
          setIsLoading(false);
          return;
        }

        // Register via API
        await apiClient.register({
          username,
          password,
          nickname: username,
        });

        // After successful registration, login
        const result = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });

        if (result?.ok) {
          window.location.href = "/user";
        } else {
          setError("注册成功，但登录失败，请重试");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "操作失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWeChatLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("wechat", { callbackUrl: "/user" });
    } catch (error) {
      console.error("微信登录失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset error when switching between login/register
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] mb-6 shadow-lg shadow-[#00D4FF]/30">
          <Sparkles className="w-10 h-10 text-[#030712]" />
        </div>
        <h1 className="text-3xl font-bold text-[#F0F4FF] mb-2">
          {isLogin ? "欢迎回来" : "创建账号"}
        </h1>
        <p className="text-[#94A3C8]">
          {isLogin ? "登录您的智谈AI账号" : "注册开始您的面试之旅"}
        </p>
      </div>

      {/* Form */}
      <GlassCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[#F0F4FF] mb-2">
              用户名
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3C8]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#0066FF]/5 border border-[#00D4FF]/20 text-[#F0F4FF] placeholder:text-[#94A3C8]/50 focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
                required
                minLength={3}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#F0F4FF] mb-2">
              密码
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3C8]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 pl-12 pr-12 rounded-xl bg-[#0066FF]/5 border border-[#00D4FF]/20 text-[#F0F4FF] placeholder:text-[#94A3C8]/50 focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3C8] hover:text-[#00D4FF] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-[#F0F4FF] mb-2">
                确认密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3C8]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#0066FF]/5 border border-[#00D4FF]/20 text-[#F0F4FF] placeholder:text-[#94A3C8]/50 focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          {/* Forgot password (Login only) */}
          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#00D4FF] hover:text-[#00B8E0] transition-colors"
              >
                忘记密码？
              </button>
            </div>
          )}

          {/* Submit Button */}
          <PrimaryButton fullWidth size="lg" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                处理中...
              </span>
            ) : isLogin ? (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                登录
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" />
                注册
              </>
            )}
          </PrimaryButton>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#00D4FF]/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#030712] px-4 text-sm text-[#94A3C8] rounded-full">
                或使用以下方式登录
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            {/* 微信登录按钮 */}
            <button
              type="button"
              onClick={handleWeChatLogin}
              disabled={isLoading}
              className="w-full h-12 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-[#07C160] hover:bg-[#06AD56] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <WeChatIcon className="w-6 h-6" />
              微信登录
            </button>
          </div>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center text-sm text-[#94A3C8]">
          {isLogin ? "还没有账号？" : "已有账号？"}
          <button
            onClick={toggleMode}
            className="ml-1 text-[#00D4FF] hover:text-[#00B8E0] font-medium transition-colors"
          >
            {isLogin ? "立即注册" : "立即登录"}
          </button>
        </div>
      </GlassCard>

      {/* Terms */}
      <p className="mt-6 text-center text-xs text-[#94A3C8]">
        {isLogin ? "登录即表示您同意我们的" : "注册即表示您同意我们的"}
        <a href="/terms" className="text-[#00D4FF] hover:underline mx-1">
          用户协议
        </a>
        和
        <a href="/privacy" className="text-[#00D4FF] hover:underline mx-1">
          隐私政策
        </a>
      </p>
    </div>
  );
}

// 已登录状态的用户中心
function UserDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const menuItems = [
    { 
      icon: <CreditCard className="w-5 h-5" />, 
      label: "我的订单", 
      description: "查看订单和付款记录",
      href: "/orders"
    },
    { 
      icon: <History className="w-5 h-5" />, 
      label: "使用记录", 
      description: "查看您的面试辅导历史",
      href: "#"
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      label: "账号设置", 
      description: "密码、通知和隐私设置",
      href: "#"
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* User Info Header */}
      <GlassCard className="mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center text-[#030712] text-3xl font-bold overflow-hidden shadow-lg shadow-[#00D4FF]/30">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || "用户头像"} 
                className="w-full h-full object-cover"
              />
            ) : (
              session?.user?.name?.[0] || session?.user?.email?.[0] || "U"
            )}
          </div>
          
          {/* User Details */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-[#F0F4FF] mb-1">
              {session?.user?.name || "用户"}
            </h1>
            <p className="text-[#94A3C8] mb-3">
              {session?.user?.email || "未设置邮箱"}
            </p>
          </div>

          {/* Logout Button */}
          <SecondaryButton 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex-shrink-0"
          >
            <LogOut className="w-4 h-4 mr-2" />
            退出登录
          </SecondaryButton>
        </div>
      </GlassCard>

      {/* Subscription Card */}
      <SubscriptionCard />

      {/* Device Claim Code Card */}
      <DeviceClaimCodeCard />

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {menuItems.map((item, i) => (
          <GlassCard 
            key={i} 
            hover 
            className="cursor-pointer group"
            onClick={() => item.href !== "#" && router.push(item.href)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] group-hover:bg-gradient-to-br group-hover:from-[#00D4FF] group-hover:to-[#0066FF] group-hover:text-[#030712] group-hover:border-transparent transition-all duration-300">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-[#F0F4FF]">
                  {item.label}
                </h3>
                <p className="text-xs text-[#94A3C8]">
                  {item.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#94A3C8] group-hover:text-[#00D4FF] transition-colors" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default function UserPage() {
  const { data: session, status } = useSession();

  // 加载状态
  if (status === "loading") {
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
    <div className="min-h-screen pt-24 flex items-center">
      <Section className="py-16 w-full">
        {session ? <UserDashboard /> : <LoginForm />}
      </Section>
    </div>
  );
}
