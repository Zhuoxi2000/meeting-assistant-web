import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  glow?: boolean;
}

export default function PrimaryButton({
  children,
  className,
  size = "md",
  fullWidth = false,
  glow = true,
  ...props
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-13 px-8 text-base",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-medium",
        "bg-[#6366F1] text-white",
        "hover:bg-[#5558E8] active:bg-[#4F52D9]",
        "transition-all duration-300",
        glow && "btn-glow hover:shadow-lg hover:shadow-[#6366F1]/30",
        sizeClasses[size],
        fullWidth && "w-full",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Link variant that looks like a button
interface PrimaryButtonLinkProps {
  children: ReactNode;
  href: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  glow?: boolean;
}

export function PrimaryButtonLink({
  children,
  href,
  size = "md",
  className,
  glow = true,
}: PrimaryButtonLinkProps) {
  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-13 px-8 text-base",
  };

  return (
    <a
      href={href}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-medium",
        "bg-[#6366F1] text-white",
        "hover:bg-[#5558E8] active:bg-[#4F52D9]",
        "transition-all duration-300",
        glow && "btn-glow hover:shadow-lg hover:shadow-[#6366F1]/30",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </a>
  );
}

