import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "alt" | "cyan";
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function GradientText({
  children,
  className,
  variant = "default",
  as: Component = "span",
}: GradientTextProps) {
  const gradientClasses = {
    default: "bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4]",
    alt: "bg-gradient-to-r from-[#007AFF] via-[#6366F1] to-[#8B5CF6]",
    cyan: "bg-gradient-to-r from-[#06B6D4] via-[#6366F1] to-[#8B5CF6]",
  };

  return (
    <Component
      className={cn(
        "bg-clip-text text-transparent",
        gradientClasses[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}

