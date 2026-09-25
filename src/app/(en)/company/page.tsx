import { company, companyLabels, formatAddress } from "@/content/company.ts";
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
    if (row === "address") {
      return {
        label: companyLabels.address,
        value: company.address === null ? null : formatAddress(company.address),
      };
    }
    // The company number is coming, so its row is marked; once it is known it links to
    // the register, where anyone can check it.
    if (row === "companyNumber") {
      if (company.companyNumber === null) {
        return { label: companyLabels.companyNumber, value: null, soon: true };
      }
      return {
        label: companyLabels.companyNumber,
        node: (
          <a href={`${companyPage.registerUrl}${company.companyNumber}`}>
            {company.companyNumber}
          </a>
        ),
      };
    }
    const value = company[row];
    return {
      label: companyLabels[row],
      value: typeof value === "string" || value === null ? value : null,
    };
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
