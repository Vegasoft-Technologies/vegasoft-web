import { contentFor } from "@/content/index.ts";
import { pagePaths } from "@/content/routes.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import PrivacyPage from "@/components/pages/PrivacyPage.tsx";

export const metadata = pageMetadata(
  "tr",
  contentFor("tr").privacy.meta,
  pagePaths("privacy"),
);

export default function Page() {
  return <PrivacyPage language="tr" />;
}
