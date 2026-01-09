import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function SecondaryButton({
  children,
  className,
  size = "md",
  fullWidth = false,
  ...props
}: SecondaryButtonProps) {
  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-13 px-8 text-base",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-semibold",
        "bg-transparent text-[#F0F4FF]",
        "border border-[#00D4FF]/30",
        "hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/50 hover:text-[#00D4FF]",
        "active:bg-[#00D4FF]/5",
        "transition-all duration-300",
        sizeClasses[size],
        fullWidth && "w-full",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Link variant
interface SecondaryButtonLinkProps {
  children: ReactNode;
  href: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SecondaryButtonLink({
  children,
  href,
  size = "md",
  className,
}: SecondaryButtonLinkProps) {
  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-13 px-8 text-base",
  };

  return (
    <a
      href={href}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-semibold",
        "bg-transparent text-[#F0F4FF]",
        "border border-[#00D4FF]/30",
        "hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/50 hover:text-[#00D4FF]",
        "active:bg-[#00D4FF]/5",
        "transition-all duration-300",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </a>
  );
}
