import { areas } from "@/content/en/areas.ts";
import { home } from "@/content/en/home.ts";
import { numbering } from "@/lib/numbering.ts";
import ButtonLink from "@/components/ui/ButtonLink.tsx";
import Container from "@/components/ui/Container.tsx";
import styles from "./Hero.module.css";

const { hero } = home;

export default function Hero() {
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
                <a href={`#${area.slug}`}>
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
