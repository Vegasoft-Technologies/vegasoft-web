import { areas } from "@/content/en/areas.ts";
import { home } from "@/content/en/home.ts";
import { numbering } from "@/lib/numbering.ts";
import Container from "@/components/ui/Container.tsx";
import styles from "./Problems.module.css";

const { problems } = home;

export default function Problems() {
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
                <a href={`#${problem.area}`}>
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
