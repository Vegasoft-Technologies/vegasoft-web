import { contentFor } from "@/content/index.ts";
import { areaSegment, type Language } from "@/content/routes.ts";
import { numbering } from "@/lib/numbering.ts";
import ButtonLink from "@/components/ui/ButtonLink.tsx";
import Container from "@/components/ui/Container.tsx";
import styles from "./Hero.module.css";

export default function Hero({ language }: { language: Language }) {
  const { areas, home } = contentFor(language);
  const { hero } = home;
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container grid>
        <div className={styles.main}>
          <h1 id="hero-title">{hero.title}</h1>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.actions}>
            <ButtonLink href={hero.cta.href}>{hero.cta.label}</ButtonLink>
          </div>
        </div>
        <nav className={styles.index} aria-labelledby="index-title">
          <h2 id="index-title">{hero.indexTitle}</h2>
          <ol>
            {areas.map((area, i) => (
              <li key={area.slug}>
                <a href={`#${areaSegment(area.slug, language)}`}>
                  <span className={styles.num}>{numbering(i)}</span>
                  {area.name}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </section>
  );
}
