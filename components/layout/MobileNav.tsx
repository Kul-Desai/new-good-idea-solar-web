"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex size-12 items-center justify-center rounded-md text-brand-blue focus-visible:outline-focus"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        {isOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </button>
      {isOpen ? (
        <div className="absolute inset-x-0 top-full border-y border-charcoal/10 bg-white shadow-soft" id="mobile-menu">
          <div className="mx-auto flex max-w-[var(--container-page)] flex-col gap-2 px-5 py-5">
            <Link
              aria-label="Good Idea Solar home"
              className="mb-2 inline-flex size-12 items-center justify-center rounded-md focus-visible:outline-focus"
              href="/"
              onClick={() => setIsOpen(false)}
            >
              <Image alt="Good Idea Solar icon" height={44} priority src="/logo/Meatball.jpg" width={48} />
            </Link>
            {siteConfig.nav.map((item) => (
              <Link
                className="rounded-md px-3 py-3 font-heading font-medium text-ink hover:bg-mist focus-visible:outline-focus"
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="mt-2 w-full" href={siteConfig.cta.href}>
              {siteConfig.cta.label}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
