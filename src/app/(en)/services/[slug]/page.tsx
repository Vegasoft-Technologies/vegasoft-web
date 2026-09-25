import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { areaSlugs } from "@/content/en/areas.ts";
import { contentFor } from "@/content/index.ts";
import { areaForSegment, areaSegment, servicePaths } from "@/content/routes.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import ServiceAreaPage from "@/components/pages/ServiceAreaPage.tsx";

type Params = { params: Promise<{ slug: string }> };

// The seven areas are the only pages; anything else is answered by the not-found page.
export const dynamicParams = false;

export function generateStaticParams() {
  return areaSlugs.map((slug) => ({ slug: areaSegment(slug, "en") }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const area = areaForSegment(slug, "en");
  if (!area) return {};
  const content = contentFor("en").areas.find((item) => item.slug === area);
  if (!content) return {};
  return pageMetadata(
    "en",
    { title: content.name, description: content.promise },
    servicePaths(area),
  );
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const area = areaForSegment(slug, "en");
  if (!area) notFound();
  return <ServiceAreaPage language="en" slug={area} />;
}
