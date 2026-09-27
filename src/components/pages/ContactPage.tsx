import { company } from "@/content/company.ts";
import { contentFor } from "@/content/index.ts";
import { pagePaths, type Language } from "@/content/routes.ts";
import PageFrame from "@/components/layout/PageFrame.tsx";
import { site } from "@/content/site.ts";
import { showSoon } from "@/lib/soon.ts";
import Container from "@/components/ui/Container.tsx";
import DetailList, { type Detail } from "@/components/ui/DetailList.tsx";
import PageIntro from "@/components/ui/PageIntro.tsx";
import PageSection from "@/components/ui/PageSection.tsx";
import Soon from "@/components/ui/Soon.tsx";
import styles from "./ContactPage.module.css";

export default function ContactPage({ language }: { language: Language }) {
  const { commitments, companyLabels, contact, home } = contentFor(language);
  const reply = commitments.items.find((item) => item.id === "reply" && item.approved);
  const details: Detail[] = [
    {
      label: home.contact.emailLabel,
      node: <a href={`mailto:${site.email}`}>{site.email}</a>,
    },
    { label: home.contact.phoneLabel, node: <a href={site.phoneHref}>{site.phone}</a> },
    ...(reply ? [{ label: contact.details.replyLabel, value: reply.text }] : []),
    { label: companyLabels.location, value: company.location },
    { label: companyLabels.serviceArea, value: company.serviceArea },
    { label: companyLabels.social, value: company.social },
  ];
  return (
    <PageFrame language={language} paths={pagePaths("contact")}>
      <main id="main">
        <PageIntro
          title={contact.title}
          lead={home.contact.body}
          note={home.contact.hint}
        />
        <PageSection id="details" title={contact.details.title}>
          <DetailList language={language} details={details} />
        </PageSection>
        {showSoon && (
          <div className={styles.form}>
            <Container>
              <Soon language={language} label={contact.formLabel} />
            </Container>
          </div>
        )}
      </main>
    </PageFrame>
  );
}
