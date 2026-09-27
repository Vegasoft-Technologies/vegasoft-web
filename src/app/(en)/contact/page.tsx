import { contentFor } from "@/content/index.ts";
import { pagePaths } from "@/content/routes.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import ContactPage from "@/components/pages/ContactPage.tsx";

export const metadata = pageMetadata(
  "en",
  contentFor("en").contact.meta,
  pagePaths("contact"),
);

export default function Page() {
  return <ContactPage language="en" />;
}
