"use client";

import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  companyLogo?: string;
  tag?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

export default function TestimonialCard({
  testimonial,
  className,
  variant = "default",
}: TestimonialCardProps) {
  const { quote, author, role, company, avatar, tag } = testimonial;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "p-5 rounded-xl glass-card hover:border-[#00D4FF]/30 transition-all duration-300",
          className
        )}
      >
        <p className="text-sm text-[#94A3C8] leading-relaxed mb-4 line-clamp-3">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center text-[#030712] text-xs font-bold">
            {author[0]}
          </div>
          <div>
            <p className="text-xs font-medium text-[#F0F4FF]">{author}</p>
            <p className="text-[10px] text-[#94A3C8]">{role} @ {company}</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div
        className={cn(
          "p-8 rounded-2xl glass-card relative overflow-hidden",
          className
        )}
      >
        {/* Quote Icon */}
        <Quote className="absolute top-6 right-6 w-12 h-12 text-[#00D4FF]/10" />
        
        {tag && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#00D4FF]/15 text-[#00D4FF] mb-4">
            {tag}
          </span>
        )}
        
        <p className="text-lg text-[#F0F4FF] leading-relaxed mb-6">
          &ldquo;{quote}&rdquo;
        </p>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center text-[#030712] text-lg font-bold">
            {avatar ? (
              <img src={avatar} alt={author} className="w-full h-full rounded-full object-cover" />
            ) : (
              author[0]
            )}
          </div>
          <div>
            <p className="font-semibold text-[#F0F4FF]">{author}</p>
            <p className="text-sm text-[#94A3C8]">{role}</p>
            <p className="text-xs text-[#00D4FF]">{company}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-6 rounded-xl glass-card hover:border-[#00D4FF]/30 transition-all duration-300 group",
        className
      )}
    >
      {tag && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#00D4FF]/15 text-[#00D4FF] mb-4">
          {tag}
        </span>
      )}
      
      <p className="text-sm text-[#94A3C8] leading-relaxed mb-6 min-h-[80px]">
        &ldquo;{quote}&rdquo;
      </p>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center text-[#030712] text-sm font-bold group-hover:shadow-lg group-hover:shadow-[#00D4FF]/30 transition-all">
          {avatar ? (
            <img src={avatar} alt={author} className="w-full h-full rounded-full object-cover" />
          ) : (
            author[0]
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-[#F0F4FF]">{author}</p>
          <p className="text-xs text-[#94A3C8]">{role} @ {company}</p>
        </div>
      </div>
    </div>
  );
}

// Scrolling testimonials for social proof
export function TestimonialScroller({
  testimonials,
  className,
}: {
  testimonials: Testimonial[];
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      {/* Gradient masks */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#030712] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#030712] to-transparent z-10" />
        
        <div className="flex gap-6 animate-scroll-slow">
          {[...testimonials, ...testimonials].map((t, index) => (
            <TestimonialCard
              key={`${t.author}-${index}`}
              testimonial={t}
              variant="compact"
              className="flex-shrink-0 w-80"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Company logo carousel
export function CompanyLogoCarousel({
  companies,
  className,
}: {
  companies: string[];
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden py-4", className)}>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030712] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030712] to-transparent z-10" />
        
        <div className="flex items-center gap-12 animate-scroll-slow">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="flex-shrink-0 px-6 py-3 rounded-lg glass-card text-[#94A3C8] hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all duration-300 cursor-default font-medium"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

