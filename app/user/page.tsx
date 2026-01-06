"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Section from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { 
  User, Mail, Lock, LogIn, UserPlus, Eye, EyeOff, LogOut, 
  Settings, CreditCard, History, Copy, Check, RefreshCw,
  Smartphone, Monitor
} from "lucide-react";
import { apiClient, type DeviceClaimCodeResponse } from "@/lib/api";

// 微信图标组件
function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 00.186-.059l1.807-1.003a.593.593 0 01.527-.058c1.06.348 2.216.549 3.422.549.225 0 .447-.009.667-.023-.168-.519-.257-1.065-.257-1.627 0-3.617 3.499-6.55 7.811-6.55.176 0 .349.008.521.018C16.737 4.97 13.022 2.188 8.691 2.188zm-2.24 3.802a1.087 1.087 0 11-.001 2.174 1.087 1.087 0 01.001-2.174zm5.108 0a1.087 1.087 0 110 2.174 1.087 1.087 0 010-2.174z"/>
      <path d="M23.982 14.841c0-3.231-3.12-5.852-6.97-5.852-3.848 0-6.97 2.621-6.97 5.852 0 3.232 3.122 5.853 6.97 5.853.742 0 1.458-.092 2.131-.259a.47.47 0 01.417.046l1.427.793a.26.26 0 00.147.047.232.232 0 00.23-.234c0-.058-.023-.113-.038-.168l-.308-1.17a.467.467 0 01.168-.527c1.426-1.067 2.796-2.685 2.796-4.381zm-9.463-.342a.862.862 0 11.002-1.724.862.862 0 01-.002 1.724zm4.986 0a.862.862 0 110-1.724.862.862 0 010 1.724z"/>
    </svg>
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
        <div className="w-10 h-10 rounded-xl bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1]">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#EDEFF7]">设备绑定</h3>
          <p className="text-sm text-[#AAB0C0]">将您的 macOS 客户端绑定到此账号</p>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      {claimCode ? (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-sm text-[#AAB0C0] mb-2">绑定码</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-mono font-bold text-[#EDEFF7] tracking-wider">
                {claimCode.claim_code}
              </span>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-[#AAB0C0]" />
                )}
              </button>
            </div>
            <p className="text-sm text-[#AAB0C0] mt-3">
              有效时间: <span className="text-[#6366F1] font-mono">{formatTime(countdown)}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/30">
            <p className="text-sm text-[#AAB0C0]">
              <strong className="text-[#EDEFF7]">使用方法：</strong>
            </p>
            <ol className="text-sm text-[#AAB0C0] mt-2 space-y-1 list-decimal list-inside">
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
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Monitor className="w-5 h-5 text-[#AAB0C0]" />
              <span className="text-sm text-[#AAB0C0]">
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

// 未登录状态的登录表单
function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/user",
      });
    } catch (error) {
      console.error("登录失败:", error);
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

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] mb-6">
          <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-[#EDEFF7] mb-2">
          {isLogin ? "欢迎回来" : "创建账号"}
        </h1>
        <p className="text-[#AAB0C0]">
          {isLogin ? "登录您的智语面试账号" : "注册开始您的面试之旅"}
        </p>
      </div>

      {/* Form */}
      <GlassCard>
        <form onSubmit={handleEmailLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#EDEFF7] mb-2">
              邮箱地址
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAB0C0]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-[#EDEFF7] placeholder:text-[#AAB0C0]/50 focus:outline-none focus:border-[#6366F1]/50 transition-colors"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#EDEFF7] mb-2">
              密码
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAB0C0]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 pl-12 pr-12 rounded-xl bg-white/[0.03] border border-white/10 text-[#EDEFF7] placeholder:text-[#AAB0C0]/50 focus:outline-none focus:border-[#6366F1]/50 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAB0C0] hover:text-[#EDEFF7] transition-colors"
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
              <label className="block text-sm font-medium text-[#EDEFF7] mb-2">
                确认密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAB0C0]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.03] border border-white/10 text-[#EDEFF7] placeholder:text-[#AAB0C0]/50 focus:outline-none focus:border-[#6366F1]/50 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          {/* Forgot password (Login only) */}
          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#6366F1] hover:text-[#8B5CF6] transition-colors"
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
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[rgba(255,255,255,0.06)] px-4 text-sm text-[#AAB0C0] rounded-full">
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

            {/* Google 登录按钮 */}
            <SecondaryButton 
              fullWidth 
              onClick={() => signIn("google", { callbackUrl: "/user" })}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              使用 Google 账号{isLogin ? "登录" : "注册"}
            </SecondaryButton>
          </div>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center text-sm text-[#AAB0C0]">
          {isLogin ? "还没有账号？" : "已有账号？"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-[#6366F1] hover:text-[#8B5CF6] font-medium transition-colors"
          >
            {isLogin ? "立即注册" : "立即登录"}
          </button>
        </div>
      </GlassCard>

      {/* Terms */}
      <p className="mt-6 text-center text-xs text-[#AAB0C0]">
        {isLogin ? "登录即表示您同意我们的" : "注册即表示您同意我们的"}
        <a href="/terms" className="text-[#6366F1] hover:underline mx-1">
          用户协议
        </a>
        和
        <a href="/privacy" className="text-[#6366F1] hover:underline mx-1">
          隐私政策
        </a>
      </p>
    </div>
  );
}

// 已登录状态的用户中心
function UserDashboard() {
  const { data: session } = useSession();

  const menuItems = [
    { icon: <User className="w-5 h-5" />, label: "个人信息", description: "查看和编辑您的个人资料" },
    { icon: <CreditCard className="w-5 h-5" />, label: "我的订阅", description: "管理您的套餐和付款方式" },
    { icon: <History className="w-5 h-5" />, label: "使用记录", description: "查看您的面试辅导历史" },
    { icon: <Settings className="w-5 h-5" />, label: "账号设置", description: "密码、通知和隐私设置" },
  ];

  // Get tier display info
  const tierInfo = {
    free: { label: "免费版", color: "bg-gray-500/20 text-gray-400" },
    pro: { label: "Pro 会员", color: "bg-[#6366F1]/20 text-[#6366F1]" },
    enterprise: { label: "企业版", color: "bg-purple-500/20 text-purple-400" },
  };

  const currentTier = tierInfo[session?.user?.tier as keyof typeof tierInfo] || tierInfo.free;

  return (
    <div className="max-w-3xl mx-auto">
      {/* User Info Header */}
      <GlassCard className="mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
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
            <h1 className="text-2xl font-bold text-[#EDEFF7] mb-1">
              {session?.user?.name || "用户"}
            </h1>
            <p className="text-[#AAB0C0] mb-3">
              {session?.user?.email || "未设置邮箱"}
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentTier.color}`}>
                {currentTier.label}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                已认证
              </span>
            </div>
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

      {/* Device Claim Code Card */}
      <DeviceClaimCodeCard />

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {menuItems.map((item, i) => (
          <GlassCard 
            key={i} 
            hover 
            className="cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1] group-hover:bg-[#6366F1] group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#EDEFF7] mb-1">
                  {item.label}
                </h3>
                <p className="text-sm text-[#AAB0C0]">
                  {item.description}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { label: "面试次数", value: "28" },
          { label: "使用时长", value: "12h" },
          { label: "剩余天数", value: "25" },
        ].map((stat, i) => (
          <GlassCard key={i} className="text-center">
            <p className="text-3xl font-bold text-[#EDEFF7] mb-1">{stat.value}</p>
            <p className="text-sm text-[#AAB0C0]">{stat.label}</p>
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
          <div className="w-12 h-12 rounded-full border-4 border-[#6366F1] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-[#AAB0C0]">加载中...</p>
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
