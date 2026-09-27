import { contentFor } from "@/content/index.ts";
import { areaSegment, type Language } from "@/content/routes.ts";
import { numbering } from "@/lib/numbering.ts";
import Container from "@/components/ui/Container.tsx";
import styles from "./Problems.module.css";

export default function Problems({ language }: { language: Language }) {
  const { areas, home } = contentFor(language);
  const { problems } = home;
  return (
    <section className={styles.section} aria-labelledby="problems-title">
      <Container grid>
        <header className={styles.head}>
          <h2 id="problems-title">{problems.title}</h2>
          <p>{problems.intro}</p>
        </header>
        <ul className={styles.problems}>
          {problems.items.map((problem) => {
            const index = areas.findIndex((area) => area.slug === problem.area);
            return (
              <li key={problem.text}>
                <p className={styles.problem}>{problem.text}</p>
                <a href={`#${areaSegment(problem.area, language)}`}>
                  {numbering(index)} {areas[index].name}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
