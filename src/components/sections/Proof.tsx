import { proof } from "@/content/en/proof.ts";
import PageSection from "@/components/ui/PageSection.tsx";
import ProofGroup from "./ProofGroup.tsx";
import styles from "./Proof.module.css";

const { testimonials, caseStudies } = proof;

/**
 * Proof a visitor can check. Both lists are empty until the owner supplies real, named
 * entries with permission; until then the section is absent from deployed builds and
 * shows its placeholders in development.
 */
export default function Proof() {
  const hasAny = testimonials.items.length > 0 || caseStudies.items.length > 0;
  if (!hasAny && process.env.NODE_ENV !== "development") return null;
  return (
    <PageSection id="proof" title={proof.title} rule>
      <div className={styles.groups}>
        <ProofGroup
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
