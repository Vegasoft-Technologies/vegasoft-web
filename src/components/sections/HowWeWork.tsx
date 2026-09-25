import { home } from "@/content/en/home.ts";
import { numbering } from "@/lib/numbering.ts";
import Container from "@/components/ui/Container.tsx";
import styles from "./HowWeWork.module.css";

const { howWeWork } = home;

export default function HowWeWork() {
  return (
    <section className={styles.section} id="how-we-work" aria-labelledby="how-title">
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
