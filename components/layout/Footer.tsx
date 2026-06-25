import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-charcoal py-12 text-white">
      <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link aria-label="Good Idea Solar home" className="inline-flex rounded-md bg-white p-3 focus-visible:outline-focus" href="/">
            <Image alt="Good Idea Solar" className="h-12 w-auto object-contain" height={570} src="/logo/final-01.png" width={1525} />
          </Link>
          <p className="mt-5 max-w-sm text-lg text-white/80">{siteConfig.tagline}</p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-medium">Contact</h2>
          <ul className="mt-4 space-y-3 text-white/80">
            <li>
              <a className="rounded-sm hover:text-white focus-visible:outline-focus" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.address}</li>
            <li>
              <a className="rounded-sm hover:text-white focus-visible:outline-focus" href={siteConfig.linkedIn}>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-lg font-medium">Trust Signals</h2>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Image alt="Service-Disabled Veteran-Owned Small Business badge" className="h-14 w-auto rounded bg-white p-1" height={1513} src="/badges/SDVOSB.png" width={1210} />
            <Image alt="TenneSEIA member badge" className="h-14 w-auto rounded bg-white p-1" height={396} src="/badges/TenneSEIA.jpg" width={1195} />
            <span className="rounded-md border border-white/20 px-3 py-2 text-sm text-white/80">Bethesda Green TODO</span>
          </div>
          <p className="mt-6 text-sm text-white/60">© {new Date().getFullYear()} Good Idea Solar.</p>
        </div>
      </Container>
    </footer>
  );
}
