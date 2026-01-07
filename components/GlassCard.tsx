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
        "rounded-2xl",
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

// Variant: Glass card with gradient top border
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
    primary: "from-[#6366F1] to-[#8B5CF6]",
    purple: "from-[#8B5CF6] to-[#A855F7]",
    cyan: "from-[#06B6D4] to-[#6366F1]",
  };

  return (
    <div
      className={cn(
        "rounded-2xl glass-card overflow-hidden",
        hover && "card-hover cursor-pointer",
        className
      )}
    >
      {/* Gradient top border */}
      <div
        className={cn(
          "h-1 bg-gradient-to-r",
          gradientColors[accentColor]
        )}
      />
      <div className="p-6">{children}</div>
    </div>
  );
}

// Variant: Feature card with icon
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
        <div className="w-12 h-12 rounded-xl bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1] mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#EDEFF7] mb-2">{title}</h3>
      <p className="text-sm text-[#AAB0C0] leading-relaxed">{description}</p>
    </GlassCard>
  );
}

