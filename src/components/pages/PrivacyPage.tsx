import { company } from "@/content/company.ts";
import { contentFor } from "@/content/index.ts";
import { pagePaths, type Language } from "@/content/routes.ts";
import { site } from "@/content/site.ts";
import { fill } from "@/lib/fill.tsx";
import { showSoon } from "@/lib/soon.ts";
import PageFrame from "@/components/layout/PageFrame.tsx";
import LegalLine from "@/components/layout/LegalLine.tsx";
import Draft from "@/components/ui/Draft.tsx";
import PageIntro from "@/components/ui/PageIntro.tsx";
import PageSection from "@/components/ui/PageSection.tsx";
import RowList from "@/components/ui/RowList.tsx";
import styles from "./PrivacyPage.module.css";

export default function PrivacyPage({ language }: { language: Language }) {
  const { privacy } = contentFor(language);
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

  return (
    <PageFrame language={language} paths={pagePaths("privacy")}>
      <main id="main">
        <PageIntro title={privacy.title} lead={privacy.lead} note={privacy.updated} />

        <PageSection id="who" title={privacy.who.title}>
          <p className={styles.text}>
            {fill(privacy.who.text, {
              legal: company.legalName ?? company.tradingName,
              email: mail,
            })}
          </p>
          <LegalLine language={language} tone="light" />
        </PageSection>

        <PageSection id="collect" title={privacy.collect.title} rule>
          <ul className={styles.list}>
            {privacy.collect.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </PageSection>

        <PageSection id="why" title={privacy.why.title} rule>
          <ul className={styles.list}>
            {privacy.why.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </PageSection>

        {/* A period the owner has not approved is absent from the page, not guessed at. */}
        {(privacy.retention.approved || showSoon) && (
          <PageSection id="retention" title={privacy.retention.title} rule>
            {privacy.retention.approved ? (
              <p className={styles.text}>{privacy.retention.text}</p>
            ) : (
              <Draft language={language}>
                <p>{privacy.retention.text}</p>
              </Draft>
            )}
          </PageSection>
        )}

        <PageSection
          id="processors"
          title={privacy.processors.title}
          intro={privacy.processors.intro}
          rule
        >
          <RowList>
            {privacy.processors.items.map((item) => (
              <li key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.what}</p>
                <p>
                  <b>{privacy.processors.whereLabel}:</b> {item.where}
                </p>
                <p>
                  <b>{privacy.processors.safeguardLabel}:</b> {item.safeguard}
                </p>
              </li>
            ))}
          </RowList>
        </PageSection>

        <PageSection id="rights" title={privacy.rights.title} rule>
          <p className={styles.text}>{fill(privacy.rights.text, { email: mail })}</p>
          <p className={styles.text}>{privacy.rights.kvkk}</p>
          <p className={styles.text}>
            {privacy.rights.complaint}{" "}
            <a href={privacy.rights.complaintLink.href}>
              {privacy.rights.complaintLink.label}
            </a>
          </p>
        </PageSection>
      </main>
    </PageFrame>
  );
}
