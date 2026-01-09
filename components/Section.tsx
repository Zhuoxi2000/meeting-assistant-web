import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  withGradient?: "left" | "right" | "center" | "none";
}

export default function Section({
  children,
  className,
  id,
  containerClassName,
  withGradient = "none",
}: SectionProps) {
  const gradientClasses = {
    left: "bg-gradient-spot-left",
    right: "bg-gradient-spot-right",
    center: "bg-gradient-spot-center",
    none: "",
  };

  return (
    <section
      id={id}
      className={cn(
        "section relative overflow-hidden",
        gradientClasses[withGradient],
        className
      )}
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      <div className={cn("container-custom relative z-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

// Section header component for consistent section titles - Tech style
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        centered && "text-center",
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F0F4FF] tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-[#94A3C8] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
