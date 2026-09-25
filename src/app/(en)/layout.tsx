import type { Metadata, Viewport } from "next";
import "@/styles/tokens.css";
import "@/styles/base.css";
import { site } from "@/content/site.ts";
import { archivo, plexMono, plexSans } from "@/lib/fonts.ts";
import SiteFooter from "@/components/layout/SiteFooter.tsx";
import SiteHeader from "@/components/layout/SiteHeader.tsx";
import SkipLink from "@/components/layout/SkipLink.tsx";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  openGraph: { siteName: site.name, locale: "en_GB", type: "website" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
