import { contentFor } from "@/content/index.ts";
import { pagePaths } from "@/content/routes.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import HomePage from "@/components/pages/HomePage.tsx";

export const metadata = pageMetadata(
  "en",
  { ...contentFor("en").home.meta, absoluteTitle: true },
  pagePaths("home"),
);

export default function Page() {
  return <HomePage language="en" />;
}
