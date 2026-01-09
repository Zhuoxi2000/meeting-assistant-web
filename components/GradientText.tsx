import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "alt" | "cyan" | "green";
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function GradientText({
  children,
  className,
  variant = "default",
  as: Component = "span",
}: GradientTextProps) {
  const gradientClasses = {
    default: "bg-gradient-to-r from-[#00D4FF] via-[#0066FF] to-[#00FF88]",
    alt: "bg-gradient-to-r from-[#00D4FF] to-[#0066FF]",
    cyan: "bg-gradient-to-r from-[#00FF88] via-[#00D4FF] to-[#0066FF]",
    green: "bg-gradient-to-r from-[#00FF88] to-[#00D4FF]",
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
