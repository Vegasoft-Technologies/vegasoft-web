import Link from "next/link";
import type { AreaSlug } from "@/content/en/areas.ts";
import { contentFor } from "@/content/index.ts";
import { servicePaths, type Language } from "@/content/routes.ts";
import PageFrame from "@/components/layout/PageFrame.tsx";
import ButtonLink from "@/components/ui/ButtonLink.tsx";
import Container from "@/components/ui/Container.tsx";
import PageIntro from "@/components/ui/PageIntro.tsx";
import PageSection from "@/components/ui/PageSection.tsx";
import PilotTag from "@/components/ui/PilotTag.tsx";
import RowList from "@/components/ui/RowList.tsx";
import styles from "./ServiceAreaPage.module.css";

type ServiceAreaPageProps = { language: Language; slug: AreaSlug };

export default function ServiceAreaPage({ language, slug }: ServiceAreaPageProps) {
  const { areas, home, servicePage } = contentFor(language);
  const area = areas.find((item) => item.slug === slug);
  if (!area) return null;
  const problems = home.problems.items
    .filter((problem) => problem.area === slug)
    .map((problem) => problem.text);
  const hasPilot = area.services.some((service) => service.pilot);

  return (
    <PageFrame language={language} paths={servicePaths(slug)}>
      <main id="main">
        <PageIntro
          title={area.name}
          lead={area.promise}
          note={`${servicePage.audienceLabel} ${area.audience}`}
        />

        {problems.length > 0 && (
          <PageSection id="problems" title={servicePage.problemsTitle}>
            <ul className={styles.problems}>
              {problems.map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          </PageSection>
        )}

        <PageSection
          id="services"
          title={servicePage.servicesTitle}
          intro={
            hasPilot
              ? `${home.services.pilotNoteBefore} ${contentFor(language).pilotLabel} ${home.services.pilotNoteAfter}`
              : undefined
          }
          rule={problems.length > 0}
        >
          <RowList>
            {area.services.map((service) => (
              <li key={service.name}>
                <h3>
                  {service.name} {service.pilot && <PilotTag language={language} />}
                </h3>
                <p>{service.description}</p>
              </li>
            ))}
          </RowList>
        </PageSection>

        {area.example && (
          <PageSection id="example" title={servicePage.exampleTitle} rule>
            <p className={styles.example}>
              <a href={area.example.href}>{area.example.label}</a>, {area.example.text}
            </p>
          </PageSection>
        )}

        <PageSection id="next" title={servicePage.next.title} rule>
          <ul className={styles.next}>
            {servicePage.next.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </PageSection>

        <section className={styles.closing} aria-labelledby="closing-title">
          <Container>
            <h2 id="closing-title">{servicePage.closing.title}</h2>
            <div className={styles.action}>
              <ButtonLink href={servicePage.closing.cta.href}>
                {servicePage.closing.cta.label}
              </ButtonLink>
            </div>
          </Container>
        </section>
      </main>
    </PageFrame>
  );
}
