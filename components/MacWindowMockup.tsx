"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface MacWindowMockupProps {
  title?: string;
  type?: "image" | "video";
  src?: string;
  poster?: string;
  placeholder?: boolean;
  placeholderText?: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "auto";
}

export default function MacWindowMockup({
  title = "智谈AI",
  type = "image",
  src,
  poster,
  placeholder = true,
  placeholderText = "产品演示视频",
  className,
  aspectRatio = "16/9",
}: MacWindowMockupProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const aspectRatioClass = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "auto": "",
  };

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden glass-card shadow-2xl shadow-[#00D4FF]/10",
        className
      )}
    >
      {/* Window Header - macOS Style */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0f1a]/80 border-b border-[#00D4FF]/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#28CA41] hover:bg-[#28CA41]/80 transition-colors cursor-pointer" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-[#94A3C8] font-medium">{title}</span>
        </div>
        <div className="w-[52px]" /> {/* Spacer for balance */}
      </div>

      {/* Content Area */}
      <div
        className={cn(
          "relative bg-[#030712]",
          aspectRatioClass[aspectRatio]
        )}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {type === "video" && src ? (
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />
            {/* Video Controls */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                showControls || !isPlaying ? "opacity-100" : "opacity-0"
              )}
            >
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full bg-[#00D4FF]/20 backdrop-blur-sm border border-[#00D4FF]/30 flex items-center justify-center hover:bg-[#00D4FF]/30 transition-all group"
                >
                  <Play className="w-8 h-8 text-[#00D4FF] group-hover:scale-110 transition-transform ml-1" />
                </button>
              )}
            </div>
            {/* Bottom Controls */}
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300",
                showControls ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
                <div className="flex-1" />
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Maximize2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </>
        ) : type === "image" && src ? (
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : placeholder ? (
          /* Placeholder State */
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#00D4FF]/5 to-[#0066FF]/5">
            <div className="w-16 h-16 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-[#00D4FF]" />
            </div>
            <p className="text-sm text-[#94A3C8] text-center">{placeholderText}</p>
            <p className="text-xs text-[#94A3C8]/60 mt-2">占位 - 待替换素材</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Compact version for smaller displays
export function MacWindowMockupCompact({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden glass-card",
        className
      )}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0a0f1a]/80 border-b border-[#00D4FF]/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
        </div>
        {title && (
          <span className="text-[10px] text-[#94A3C8] ml-2">{title}</span>
        )}
      </div>
      <div className="bg-[#030712]">{children}</div>
    </div>
  );
}

