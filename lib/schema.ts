import { siteConfig } from "@/content/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo/final-01.png`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "142 1/2 Monticello Ave",
      addressLocality: "Annapolis",
      addressRegion: "MD",
      postalCode: "21401",
      addressCountry: "US",
    },
    sameAs: [siteConfig.linkedIn],
  };
}
