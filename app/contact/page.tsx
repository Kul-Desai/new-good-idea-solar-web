import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Start a conversation with Good Idea Solar about farms, land, community partnerships, or current projects.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main">
      <Section tone="mist">
        <Container>
          <div className="max-w-4xl">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
              Contact
            </p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Let&apos;s Start the Conversation
            </h1>
            <p className="mt-6 text-xl leading-9 text-charcoal/80">
              Whether you are a farmer interested in exploring solar, a community partner, or simply want to learn more
              about our projects, we would love to hear from you.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <SectionHeader eyebrow="Send a Message" heading="Tell us what you are exploring" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </Card>
          <div className="grid gap-5 self-start">
            <Card>
              <Mail aria-hidden="true" className="mb-4 size-7 text-brand-green" />
              <h2 className="font-heading text-2xl font-medium text-ink">Email</h2>
              <a className="mt-3 inline-flex rounded-md text-brand-blue hover:text-brand-green focus-visible:outline-focus" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </Card>
            <Card>
              <MapPin aria-hidden="true" className="mb-4 size-7 text-brand-green" />
              <h2 className="font-heading text-2xl font-medium text-ink">Address</h2>
              <p className="mt-3 leading-7 text-charcoal/75">{siteConfig.address}</p>
            </Card>
            <Card>
              <ExternalLink aria-hidden="true" className="mb-4 size-7 text-brand-green" />
              <h2 className="font-heading text-2xl font-medium text-ink">LinkedIn</h2>
              <a className="mt-3 inline-flex rounded-md text-brand-blue hover:text-brand-green focus-visible:outline-focus" href={siteConfig.linkedIn}>
                linkedin.com/company/goodideasolar
              </a>
            </Card>
          </div>
        </Container>
      </Section>
      <TrustStrip />
    </main>
  );
}
