import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-white/95 shadow-sm backdrop-blur-md">
      <Container className="relative flex min-h-20 items-center justify-between gap-8 py-3">
        <Link aria-label="Good Idea Solar home" className="inline-flex shrink-0 rounded-md pr-4 focus-visible:outline-focus" href="/">
          <Image
            alt="Good Idea Solar"
            className="hidden h-11 w-auto object-contain sm:block"
            height={570}
            priority
            src="/logo/final-01.png"
            width={1525}
          />
          <Image
            alt="Good Idea Solar"
            className="h-11 w-auto object-contain sm:hidden"
            height={558}
            priority
            src="/logo/Meatball.jpg"
            width={612}
          />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              className="rounded-md font-heading text-sm font-medium text-ink transition-colors hover:text-brand-blue focus-visible:outline-focus"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button href={siteConfig.cta.href} size="sm">
            {siteConfig.cta.label}
          </Button>
        </div>
        <MobileNav />
      </Container>
    </header>
  );
}
