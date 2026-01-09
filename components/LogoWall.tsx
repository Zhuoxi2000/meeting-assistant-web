"use client";

import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  icon?: React.ReactNode;
}

interface LogoWallProps {
  title?: string;
  logos: Logo[];
  className?: string;
  variant?: "default" | "scroll";
}

// SVG placeholder icons for meeting software
const MeetingIcons: Record<string, React.ReactNode> = {
  "腾讯会议": (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="0" />
      <circle cx="9" cy="12" r="2" fill="#030712" />
      <circle cx="15" cy="12" r="2" fill="#030712" />
    </svg>
  ),
  "飞书会议": (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 4L4 8v8l8 4 8-4V8l-8-4zm0 2.5L17 9v6l-5 2.5L7 15V9l5-2.5z" />
    </svg>
  ),
  "钉钉": (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
    </svg>
  ),
  "企业微信": (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
    </svg>
  ),
  "牛客": (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  ),
  "Zoom": (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M4 5.5a2.5 2.5 0 012.5-2.5h11a2.5 2.5 0 012.5 2.5v9a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 14.5v-9zm14.5 0l3 2v5l-3 2v-9z" />
    </svg>
  ),
  "Google Meet": (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 11.5V7.75l3.5 3.5-3.5 3.5v-3.25z" />
      <rect x="3" y="5" width="12" height="14" rx="2" />
    </svg>
  ),
  "Teams": (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M19.5 7.5h-3v-3h3v3zm-12 0h9v12h-9v-12zm-3 3h-3v9h3v-9z" />
    </svg>
  ),
  "Chime": (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" stroke="#030712" strokeWidth="2" fill="none" />
    </svg>
  ),
  "Webex": (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="#030712" />
    </svg>
  ),
};

export default function LogoWall({
  title,
  logos,
  className,
  variant = "default",
}: LogoWallProps) {
  if (variant === "scroll") {
    return (
      <div className={cn("overflow-hidden", className)}>
        {title && (
          <p className="text-sm text-[#94A3C8] text-center mb-6">{title}</p>
        )}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#030712] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#030712] to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="flex animate-scroll">
            {[...logos, ...logos].map((logo, index) => (
              <LogoItem key={`${logo.name}-${index}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("", className)}>
      {title && (
        <p className="text-sm text-[#94A3C8] text-center mb-6">{title}</p>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {logos.map((logo) => (
          <LogoItem key={logo.name} logo={logo} />
        ))}
      </div>
    </div>
  );
}

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <div
      className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0066FF]/5 border border-[#00D4FF]/10 hover:border-[#00D4FF]/30 hover:bg-[#00D4FF]/10 transition-all duration-300 cursor-default"
    >
      <div className="text-[#94A3C8] group-hover:text-[#00D4FF] transition-colors">
        {logo.icon || MeetingIcons[logo.name] || (
          <div className="w-6 h-6 rounded bg-[#00D4FF]/20" />
        )}
      </div>
      <span className="text-sm text-[#94A3C8] group-hover:text-[#F0F4FF] transition-colors whitespace-nowrap">
        {logo.name}
      </span>
    </div>
  );
}

// Two-row logo wall for domestic vs international
export function LogoWallGrouped({
  domesticLogos,
  internationalLogos,
  className,
}: {
  domesticLogos: Logo[];
  internationalLogos: Logo[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <p className="text-xs text-[#94A3C8]/60 mb-3 text-center uppercase tracking-wider">国内平台</p>
        <div className="flex flex-wrap justify-center gap-3">
          {domesticLogos.map((logo) => (
            <LogoItem key={logo.name} logo={logo} />
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00D4FF]/20 to-transparent" />
      <div>
        <p className="text-xs text-[#94A3C8]/60 mb-3 text-center uppercase tracking-wider">海外平台</p>
        <div className="flex flex-wrap justify-center gap-3">
          {internationalLogos.map((logo) => (
            <LogoItem key={logo.name} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}

