import { contentFor } from "@/content/index.ts";
import type { Language } from "@/content/routes.ts";
import Container from "@/components/ui/Container.tsx";
import SignalLine from "@/components/ui/SignalLine.tsx";
import styles from "./Approach.module.css";

export default function Approach({ language }: { language: Language }) {
  const { approach } = contentFor(language).home;
  return (
    <section className={styles.band} aria-labelledby="approach-title">
      <Container grid>
        <div className={styles.text}>
          <h2 id="approach-title">{approach.title}</h2>
          <p>{approach.body}</p>
        </div>
        <SignalLine language={language} />
      </Container>
    </section>
  );
}
