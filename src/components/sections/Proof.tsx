import { contentFor } from "@/content/index.ts";
import { anchorId, type Language } from "@/content/routes.ts";
import { showSoon } from "@/lib/soon.ts";
import PageSection from "@/components/ui/PageSection.tsx";
import ProofGroup from "./ProofGroup.tsx";
import styles from "./Proof.module.css";

/**
 * Proof a visitor can check. Both lists are empty until the owner supplies real, named
 * entries with permission; until then the section is absent from the production build
 * and shows its markers where they are on.
 */
export default function Proof({ language }: { language: Language }) {
  const { proof } = contentFor(language);
  const { testimonials, caseStudies } = proof;
  const hasAny = testimonials.items.length > 0 || caseStudies.items.length > 0;
  if (!hasAny && !showSoon) return null;
  return (
    <PageSection id={anchorId("proof", language)} title={proof.title} rule>
      <div className={styles.groups}>
        <ProofGroup
          language={language}
          title={testimonials.title}
          placeholder={testimonials.placeholder}
          count={testimonials.items.length}
        >
          <ul className={styles.rows}>
            {testimonials.items.map((item) => (
              <li key={item.name}>
                <blockquote className={styles.quote}>
                  <p>{item.quote}</p>
                  <footer>
                    {item.name}, {item.role}, {item.business}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </ProofGroup>
        <ProofGroup
          language={language}
          title={caseStudies.title}
          placeholder={caseStudies.placeholder}
          count={caseStudies.items.length}
        >
          <ul className={styles.rows}>
            {caseStudies.items.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.title}</a>
                <p>{item.summary}</p>
              </li>
            ))}
          </ul>
        </ProofGroup>
      </div>
    </PageSection>
  );
}
