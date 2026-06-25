import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Poppins, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { siteConfig } from "@/content/site";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Good Idea Solar | Farmer-First Solar Development",
    template: "%s | Good Idea Solar",
  },
  description: siteConfig.description,
  icons: {
    icon: "/logo/Meatball.jpg",
    shortcut: "/logo/Meatball.jpg",
    apple: "/logo/Meatball.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.variable} ${sourceSans.variable} h-full antialiased`} lang="en">
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <Header />
        {children}
        <Footer />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
          type="application/ld+json"
        />
        <Analytics />
      </body>
    </html>
  );
}
