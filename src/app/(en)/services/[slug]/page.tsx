import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areaSlugs } from "@/content/en/areas.ts";
import { home } from "@/content/en/home.ts";
import { servicePage } from "@/content/en/services.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import { areaBySlug, problemsFor, servicePath } from "@/lib/services.ts";
import ButtonLink from "@/components/ui/ButtonLink.tsx";
import Container from "@/components/ui/Container.tsx";
import PageIntro from "@/components/ui/PageIntro.tsx";
import PageSection from "@/components/ui/PageSection.tsx";
import PilotTag from "@/components/ui/PilotTag.tsx";
import RowList from "@/components/ui/RowList.tsx";
import styles from "./page.module.css";

type Params = { params: Promise<{ slug: string }> };

// The seven areas are the only pages; anything else is answered by the not-found page.
export const dynamicParams = false;

export function generateStaticParams() {
  return areaSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) return {};
  return pageMetadata(
    { title: area.name, description: area.promise },
    servicePath(area.slug),
  );
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();
  const problems = problemsFor(area.slug);
  const hasPilot = area.services.some((service) => service.pilot);

  return (
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
            ? `${home.services.pilotNoteBefore} Pilot ${home.services.pilotNoteAfter}`
            : undefined
        }
        rule={problems.length > 0}
      >
        <RowList>
          {area.services.map((service) => (
            <li key={service.name}>
              <h3>
                {service.name} {service.pilot && <PilotTag />}
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
  );
}
