import Link from "next/link";
import { company, companyLabels } from "@/content/company.ts";
import { about } from "@/content/en/about.ts";
import { commitment } from "@/content/en/commitments.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import ButtonLink from "@/components/ui/ButtonLink.tsx";
import Container from "@/components/ui/Container.tsx";
import DetailList from "@/components/ui/DetailList.tsx";
import Draft from "@/components/ui/Draft.tsx";
import PageIntro from "@/components/ui/PageIntro.tsx";
import PageSection from "@/components/ui/PageSection.tsx";
import RowList from "@/components/ui/RowList.tsx";
import styles from "./page.module.css";

export const metadata = pageMetadata(about.meta, "/about");

export default function AboutPage() {
  const onSite = commitment("on-site");
  return (
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
          details={[
            { label: companyLabels.location, value: company.location },
            { label: companyLabels.serviceArea, value: company.serviceArea },
            { label: companyLabels.languages, value: company.languages },
            { label: companyLabels.hours, value: company.hours },
          ]}
        />
      </PageSection>
      <PageSection id="company" title={about.company.title} rule>
        <DetailList
          details={[
            { label: companyLabels.founded, value: company.founded },
            { label: companyLabels.certifications, value: company.certifications },
            { label: companyLabels.memberships, value: company.memberships },
            { label: companyLabels.insurance, value: company.insurance },
            { label: companyLabels.dataHosting, value: company.dataHosting },
            { label: companyLabels.social, value: company.social },
          ]}
        />
        <p className={styles.link}>
          <Link href={about.company.link.href}>{about.company.link.label}</Link>
        </p>
        {about.draft.approved ? (
          <p className={styles.text}>{about.draft.text}</p>
        ) : (
          <Draft>
            <p>{about.draft.text}</p>
          </Draft>
        )}
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
  );
}
