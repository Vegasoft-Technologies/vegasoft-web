import { contentFor } from "@/content/index.ts";
import { anchorId, type Language } from "@/content/routes.ts";
import { numbering } from "@/lib/numbering.ts";
import Container from "@/components/ui/Container.tsx";
import styles from "./HowWeWork.module.css";

export default function HowWeWork({ language }: { language: Language }) {
  const { howWeWork } = contentFor(language).home;
  return (
    <section
      className={styles.section}
      id={anchorId("how-we-work", language)}
      aria-labelledby="how-title"
    >
      <Container>
        <div className={styles.grid}>
          <header className={styles.head}>
            <h2 id="how-title">{howWeWork.title}</h2>
          </header>
        </div>
        <ol className={styles.steps}>
          {howWeWork.steps.map((step, i) => (
            <li key={step.title}>
              <span className={styles.num}>{numbering(i)}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <p className={styles.youGet}>
                <b>{howWeWork.youGetLabel}</b> {step.youGet}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
