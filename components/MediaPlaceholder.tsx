import { cn } from "@/lib/utils";
import { Image, Play, FileImage } from "lucide-react";

interface MediaPlaceholderProps {
  type?: "image" | "video" | "avatar";
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  className?: string;
  label?: string;
  showIcon?: boolean;
}

export default function MediaPlaceholder({
  type = "image",
  aspectRatio = "video",
  className,
  label,
  showIcon = true,
}: MediaPlaceholderProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  };

  const Icon = type === "video" ? Play : type === "avatar" ? FileImage : Image;

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl glass-card overflow-hidden flex items-center justify-center",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Gradient background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#8B5CF6]/10" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-[#AAB0C0]">
        {showIcon && (
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
            <Icon className="w-8 h-8" />
          </div>
        )}
        {label && (
          <span className="text-sm font-medium">{label}</span>
        )}
      </div>
    </div>
  );
}

// Avatar placeholder variant
interface AvatarPlaceholderProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withBorder?: boolean;
}

export function AvatarPlaceholder({
  size = "md",
  className,
  withBorder = true,
}: AvatarPlaceholderProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  return (
    <div
      className={cn(
        "rounded-full glass flex items-center justify-center",
        sizeClasses[size],
        withBorder && "ring-2 ring-[#6366F1]/30",
        className
      )}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#6366F1]/30 to-[#8B5CF6]/30 flex items-center justify-center">
        <FileImage className="w-1/3 h-1/3 text-[#AAB0C0]" />
      </div>
    </div>
  );
}

// Screenshot placeholder - for app screenshots
interface ScreenshotPlaceholderProps {
  className?: string;
  title?: string;
}

export function ScreenshotPlaceholder({
  className,
  title,
}: ScreenshotPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden glass-card",
        className
      )}
    >
      {/* Window header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        {title && (
          <span className="text-xs text-[#AAB0C0] ml-2">{title}</span>
        )}
      </div>
      
      {/* Content area */}
      <div className="aspect-video p-4">
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#6366F1]/5 to-[#8B5CF6]/5 flex items-center justify-center">
          <Image className="w-12 h-12 text-[#AAB0C0]/50" />
        </div>
      </div>
    </div>
  );
}

