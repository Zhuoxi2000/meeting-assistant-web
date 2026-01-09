import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  hover = false,
  gradient = false,
  padding = "md",
  onClick,
}: GlassCardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "rounded-2xl relative overflow-hidden",
        gradient ? "gradient-border" : "glass-card",
        hover && "card-hover cursor-pointer",
        paddingClasses[padding],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Variant: Glass card with gradient top border - Tech style
interface GlassCardGradientTopProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  accentColor?: "primary" | "purple" | "cyan";
}

export function GlassCardGradientTop({
  children,
  className,
  hover = false,
  accentColor = "primary",
}: GlassCardGradientTopProps) {
  const gradientColors = {
    primary: "from-[#00D4FF] to-[#0066FF]",
    purple: "from-[#0066FF] to-[#A855F7]",
    cyan: "from-[#00FF88] to-[#00D4FF]",
  };

  return (
    <div
      className={cn(
        "rounded-2xl glass-card overflow-hidden",
        hover && "card-hover cursor-pointer",
        className
      )}
    >
      {/* Gradient top border with glow effect */}
      <div className="relative">
        <div
          className={cn(
            "h-1 bg-gradient-to-r",
            gradientColors[accentColor]
          )}
        />
        {/* Glow effect */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-8 bg-gradient-to-b opacity-30",
            gradientColors[accentColor]
          )}
          style={{ filter: 'blur(12px)' }}
        />
      </div>
      <div className="p-6 relative">{children}</div>
    </div>
  );
}

// Variant: Feature card with icon - Tech style
interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <GlassCard hover className={cn("", className)}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#0066FF]/10 border border-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#F0F4FF] mb-2">{title}</h3>
      <p className="text-sm text-[#94A3C8] leading-relaxed">{description}</p>
    </GlassCard>
  );
}

// Variant: Neon bordered card
interface NeonCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "blue" | "green";
}

export function NeonCard({
  children,
  className,
  glowColor = "cyan",
}: NeonCardProps) {
  const glowColors = {
    cyan: "shadow-[#00D4FF]/20 border-[#00D4FF]/30 hover:border-[#00D4FF]/50 hover:shadow-[#00D4FF]/30",
    blue: "shadow-[#0066FF]/20 border-[#0066FF]/30 hover:border-[#0066FF]/50 hover:shadow-[#0066FF]/30",
    green: "shadow-[#00FF88]/20 border-[#00FF88]/30 hover:border-[#00FF88]/50 hover:shadow-[#00FF88]/30",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 bg-[#030712]/80 border backdrop-blur-xl transition-all duration-300",
        "shadow-lg",
        glowColors[glowColor],
        className
      )}
    >
      {children}
    </div>
  );
}
