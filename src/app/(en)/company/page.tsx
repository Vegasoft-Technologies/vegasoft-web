import { company, companyLabels } from "@/content/company.ts";
import { companyPage } from "@/content/en/company-page.ts";
import { site } from "@/content/site.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import Container from "@/components/ui/Container.tsx";
import DetailList, { type Detail } from "@/components/ui/DetailList.tsx";
import PageIntro from "@/components/ui/PageIntro.tsx";
import styles from "./page.module.css";

export const metadata = pageMetadata(companyPage.meta, "/company");

export default function CompanyPage() {
  const details: Detail[] = companyPage.rows.map((row) => {
    if (row === "email") {
      return {
        label: companyPage.emailLabel,
        node: <a href={`mailto:${site.email}`}>{site.email}</a>,
      };
    }
    if (row === "phone") {
      return {
        label: companyPage.phoneLabel,
        node: <a href={site.phoneHref}>{site.phone}</a>,
      };
    }
    // The company number links to the public register, so anyone can check it.
    if (row === "companyNumber" && company.companyNumber !== null) {
      return {
        label: companyLabels.companyNumber,
        node: (
          <a href={`${companyPage.registerUrl}${company.companyNumber}`}>
            {company.companyNumber}
          </a>
        ),
      };
    }
    return { label: companyLabels[row], value: company[row] };
  });
  return (
    <main id="main">
      <PageIntro title={companyPage.title} lead={companyPage.lead} />
      <div className={styles.details}>
        <Container>
          <DetailList details={details} />
        </Container>
      </div>
    </main>
  );
}
