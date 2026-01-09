"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  benefits?: string[];
  className?: string;
  variant?: "default" | "horizontal" | "step";
  stepNumber?: number;
  href?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  benefits,
  className,
  variant = "default",
  stepNumber,
  href,
}: FeatureCardProps) {
  const content = (
    <>
      {variant === "step" && stepNumber && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center text-[#030712] font-bold mb-4">
          {stepNumber}
        </div>
      )}
      
      {icon && variant !== "step" && (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#0066FF]/10 border border-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] mb-4 group-hover:border-[#00D4FF]/40 group-hover:shadow-lg group-hover:shadow-[#00D4FF]/20 transition-all duration-300">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-[#F0F4FF] mb-2 group-hover:text-[#00D4FF] transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-[#94A3C8] leading-relaxed">
        {description}
      </p>
      
      {benefits && benefits.length > 0 && (
        <ul className="mt-4 space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-[#94A3C8]">
              <Check className="w-4 h-4 text-[#00FF88] flex-shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      )}
      
      {href && (
        <div className="mt-4 flex items-center gap-1 text-sm text-[#00D4FF] font-medium group-hover:gap-2 transition-all">
          了解更多 <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </>
  );

  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "group p-6 rounded-xl glass-card hover:border-[#00D4FF]/30 transition-all duration-300 flex gap-5",
          className
        )}
      >
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#0066FF]/10 border border-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] flex-shrink-0 group-hover:border-[#00D4FF]/40 group-hover:shadow-lg group-hover:shadow-[#00D4FF]/20 transition-all duration-300">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#F0F4FF] mb-1 group-hover:text-[#00D4FF] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-[#94A3C8] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  }

  const Wrapper = href ? 'a' : 'div';

  return (
    <Wrapper
      href={href}
      className={cn(
        "group p-6 rounded-xl glass-card hover:border-[#00D4FF]/30 transition-all duration-300",
        href && "cursor-pointer",
        className
      )}
    >
      {content}
    </Wrapper>
  );
}

// Step flow component for process visualization
export function StepFlow({
  steps,
  className,
}: {
  steps: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 relative", className)}>
      {/* Connection lines (desktop only) */}
      <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-[#00D4FF]/50 via-[#00D4FF] to-[#00D4FF]/50 z-0" />
      
      {steps.map((step, index) => (
        <div key={index} className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] text-[#030712] mb-4 shadow-lg shadow-[#00D4FF]/30">
            {step.icon}
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#030712] border-2 border-[#00D4FF] flex items-center justify-center text-[#00D4FF] text-xs font-bold md:hidden">
            {index + 1}
          </div>
          <h3 className="text-base font-semibold text-[#F0F4FF] mb-2">{step.title}</h3>
          <p className="text-sm text-[#94A3C8]">{step.description}</p>
        </div>
      ))}
    </div>
  );
}

// Comparison card for before/after or feature comparison
export function ComparisonCard({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
  leftImage,
  rightImage,
  className,
}: {
  leftTitle: string;
  rightTitle: string;
  leftContent?: string;
  rightContent?: string;
  leftImage?: string;
  rightImage?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      <div className="p-6 rounded-xl glass-card border-[#00FF88]/20">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
          <span className="text-sm font-medium text-[#F0F4FF]">{leftTitle}</span>
        </div>
        {leftImage ? (
          <div className="aspect-video rounded-lg bg-[#0066FF]/5 border border-[#00D4FF]/10 overflow-hidden">
            <img src={leftImage} alt={leftTitle} className="w-full h-full object-cover" />
          </div>
        ) : leftContent ? (
          <p className="text-sm text-[#94A3C8]">{leftContent}</p>
        ) : (
          <div className="aspect-video rounded-lg bg-[#0066FF]/5 border border-[#00D4FF]/10 flex items-center justify-center">
            <span className="text-xs text-[#94A3C8]">占位图片</span>
          </div>
        )}
      </div>
      
      <div className="p-6 rounded-xl glass-card border-[#FF5F57]/20">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <span className="text-sm font-medium text-[#F0F4FF]">{rightTitle}</span>
        </div>
        {rightImage ? (
          <div className="aspect-video rounded-lg bg-[#0066FF]/5 border border-[#00D4FF]/10 overflow-hidden">
            <img src={rightImage} alt={rightTitle} className="w-full h-full object-cover" />
          </div>
        ) : rightContent ? (
          <p className="text-sm text-[#94A3C8]">{rightContent}</p>
        ) : (
          <div className="aspect-video rounded-lg bg-[#0066FF]/5 border border-[#00D4FF]/10 flex items-center justify-center">
            <span className="text-xs text-[#94A3C8]">占位图片</span>
          </div>
        )}
      </div>
    </div>
  );
}

