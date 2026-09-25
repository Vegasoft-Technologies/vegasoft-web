import { contentFor } from "@/content/index.ts";
import { pagePaths } from "@/content/routes.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import HomePage from "@/components/pages/HomePage.tsx";

export const metadata = pageMetadata(
  "tr",
  { ...contentFor("tr").home.meta, absoluteTitle: true },
  pagePaths("home"),
);

export default function Page() {
  return <HomePage language="tr" />;
}
