import { company, formatAddress } from "@/content/company.ts";
import { contentFor } from "@/content/index.ts";
import { pagePaths, type Language } from "@/content/routes.ts";
import PageFrame from "@/components/layout/PageFrame.tsx";
import { site } from "@/content/site.ts";
import Container from "@/components/ui/Container.tsx";
import DetailList, { type Detail } from "@/components/ui/DetailList.tsx";
import PageIntro from "@/components/ui/PageIntro.tsx";
import styles from "./CompanyInfoPage.module.css";

export default function CompanyInfoPage({ language }: { language: Language }) {
  const { companyLabels, companyPage } = contentFor(language);
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
    <PageFrame language={language} paths={pagePaths("company")}>
      <main id="main">
        <PageIntro title={companyPage.title} lead={companyPage.lead} />
        <div className={styles.details}>
          <Container>
            <DetailList language={language} details={details} />
          </Container>
        </div>
      </main>
    </PageFrame>
  );
}
