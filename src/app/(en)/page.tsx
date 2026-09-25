import type { Metadata } from "next";
import { home } from "@/content/en/home.ts";
import { site } from "@/content/site.ts";
import { structuredDataJson } from "@/lib/structured-data.ts";
import Approach from "@/components/sections/Approach.tsx";
import Contact from "@/components/sections/Contact.tsx";
import Hero from "@/components/sections/Hero.tsx";
import HowWePrice from "@/components/sections/HowWePrice.tsx";
import HowWeWork from "@/components/sections/HowWeWork.tsx";
import Problems from "@/components/sections/Problems.tsx";
import Questions from "@/components/sections/Questions.tsx";
import Services from "@/components/sections/Services.tsx";

export const metadata: Metadata = {
  title: { absolute: home.meta.title },
  description: home.meta.description,
  alternates: { canonical: "/" },
  // A page's openGraph replaces the layout's rather than merging with it, so the
  // fields the layout sets are repeated here.
  openGraph: {
    title: home.meta.title,
    description: home.meta.description,
    url: "/",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <Problems />
        <Services />
        <Approach />
        <HowWeWork />
        <HowWePrice />
        <Questions />
        <Contact />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson() }}
      />
    </>
  );
}
