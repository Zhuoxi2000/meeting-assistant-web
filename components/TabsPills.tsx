"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface TabsPillsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export default function TabsPills({
  tabs,
  defaultTab,
  onChange,
  className,
}: TabsPillsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 p-1.5 rounded-full glass-card",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
            activeTab === tab.id
              ? "bg-gradient-to-r from-[#00D4FF] to-[#0066FF] text-[#030712] shadow-lg shadow-[#00D4FF]/30"
              : "text-[#94A3C8] hover:text-[#F0F4FF] hover:bg-[#00D4FF]/5"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Controlled version
interface TabsPillsControlledProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabsPillsControlled({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabsPillsControlledProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 p-1.5 rounded-full glass-card",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
            activeTab === tab.id
              ? "bg-gradient-to-r from-[#00D4FF] to-[#0066FF] text-[#030712] shadow-lg shadow-[#00D4FF]/30"
              : "text-[#94A3C8] hover:text-[#F0F4FF] hover:bg-[#00D4FF]/5"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
