import { contentFor } from "@/content/index.ts";
import { anchorId, type Language } from "@/content/routes.ts";
import Container from "@/components/ui/Container.tsx";
import styles from "./Questions.module.css";

export default function Questions({ language }: { language: Language }) {
  const { questions } = contentFor(language);
  return (
    <section
      className={styles.section}
      id={anchorId("questions", language)}
      aria-labelledby="questions-title"
    >
      <Container grid>
        <header className={styles.head}>
          <h2 id="questions-title">{questions.title}</h2>
          <p>{questions.intro}</p>
        </header>
        <ol className={styles.list}>
          {questions.items.map((item) => (
            <li key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
