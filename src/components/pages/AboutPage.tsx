import Link from "next/link";
import { company } from "@/content/company.ts";
import { contentFor } from "@/content/index.ts";
import { pagePaths, type Language } from "@/content/routes.ts";
import PageFrame from "@/components/layout/PageFrame.tsx";
import ButtonLink from "@/components/ui/ButtonLink.tsx";
import Container from "@/components/ui/Container.tsx";
import DetailList from "@/components/ui/DetailList.tsx";
import PageIntro from "@/components/ui/PageIntro.tsx";
import PageSection from "@/components/ui/PageSection.tsx";
import RowList from "@/components/ui/RowList.tsx";
import styles from "./AboutPage.module.css";

export default function AboutPage({ language }: { language: Language }) {
  const { about, commitments, companyLabels } = contentFor(language);
  const onSite = commitments.items.find((item) => item.id === "on-site" && item.approved);
  return (
    <PageFrame language={language} paths={pagePaths("about")}>
      <main id="main">
        <PageIntro title={about.title} lead={about.lead} />
        <PageSection id="principles" title={about.principles.title}>
          <RowList>
            {about.principles.items.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </RowList>
        </PageSection>
        <PageSection id="where" title={about.where.title} rule>
          {onSite && <p className={styles.text}>{onSite.text}</p>}
          <DetailList
            language={language}
            details={[
              { label: companyLabels.location, value: company.location },
              { label: companyLabels.serviceArea, value: company.serviceArea },
            ]}
          />
        </PageSection>
        <PageSection id="company" title={about.company.title} rule>
          <DetailList
            language={language}
            details={[{ label: companyLabels.founded, value: company.founded }]}
          />
          <p className={styles.link}>
            <Link href={about.company.link.href}>{about.company.link.label}</Link>
          </p>
        </PageSection>
        <section className={styles.closing} aria-labelledby="closing-title">
          <Container>
            <h2 id="closing-title">{about.closing.title}</h2>
            <div className={styles.action}>
              <ButtonLink href={about.closing.cta.href}>
                {about.closing.cta.label}
              </ButtonLink>
            </div>
          </Container>
        </section>
      </main>
    </PageFrame>
  );
}
