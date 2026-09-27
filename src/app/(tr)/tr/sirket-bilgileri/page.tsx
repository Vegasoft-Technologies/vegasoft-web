import { contentFor } from "@/content/index.ts";
import { pagePaths } from "@/content/routes.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import CompanyInfoPage from "@/components/pages/CompanyInfoPage.tsx";

export const metadata = pageMetadata(
  "tr",
  contentFor("tr").companyPage.meta,
  pagePaths("company"),
);

export default function Page() {
  return <CompanyInfoPage language="tr" />;
}
