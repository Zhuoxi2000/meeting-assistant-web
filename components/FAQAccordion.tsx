"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className={cn("w-full space-y-4", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="glass-card rounded-2xl border-0 px-6 overflow-hidden"
        >
          <AccordionTrigger className="py-5 text-left text-[#EDEFF7] hover:text-[#EDEFF7] hover:no-underline [&[data-state=open]>svg]:rotate-45 [&>svg]:transition-transform [&>svg]:duration-200">
            <span className="text-base font-medium pr-4">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-[#AAB0C0] leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

