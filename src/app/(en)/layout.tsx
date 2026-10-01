import type { Metadata, Viewport } from "next";
import "@/styles/tokens.css";
import "@/styles/base.css";
import { languageNames } from "@/content/routes.ts";
import { site } from "@/content/site.ts";
import { shareImage } from "@/lib/metadata.ts";
import Analytics from "@/components/layout/Analytics.tsx";
import SiteLayout from "@/components/layout/SiteLayout.tsx";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  openGraph: {
    siteName: site.name,
    locale: languageNames.en.locale,
    type: "website",
    images: [shareImage("en")],
  },
  twitter: { card: "summary_large_image", images: [shareImage("en").url] },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteLayout language="en">
      {children}
      <Analytics />
    </SiteLayout>
  );
}
