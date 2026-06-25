import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
};

export function pageMetadata({ title, description, path = "" }: SeoOptions): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: "/logo/final-01.png", width: 1200, height: 800, alt: "Good Idea Solar logo" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo/final-01.png"],
    },
  };
}
