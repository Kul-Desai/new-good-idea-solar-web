"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FaqItem } from "@/content/faqs";
import { cn } from "@/lib/cn";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-charcoal/10 rounded-lg border border-charcoal/10 bg-white shadow-soft">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-heading text-lg font-medium text-ink focus-visible:outline-focus"
                id={buttonId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                type="button"
              >
                {item.question}
                <ChevronDown className={cn("size-5 shrink-0 text-brand-green transition-transform", isOpen && "rotate-180")} />
              </button>
            </h3>
            <div aria-labelledby={buttonId} hidden={!isOpen} id={panelId} role="region">
              <p className="px-5 pb-5 leading-7 text-charcoal/75">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
