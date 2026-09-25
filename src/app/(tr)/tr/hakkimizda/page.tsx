import { contentFor } from "@/content/index.ts";
import { pagePaths } from "@/content/routes.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import AboutPage from "@/components/pages/AboutPage.tsx";

export const metadata = pageMetadata(
  "tr",
  contentFor("tr").about.meta,
  pagePaths("about"),
);

export default function Page() {
  return <AboutPage language="tr" />;
}
