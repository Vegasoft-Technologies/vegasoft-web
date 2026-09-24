import { home } from "@/content/en/home.ts";
import Container from "@/components/ui/Container.tsx";
import SignalLine from "@/components/ui/SignalLine.tsx";
import styles from "./Approach.module.css";

const { approach } = home;

export default function Approach() {
  return (
    <section className={styles.band} aria-labelledby="approach-title">
      <Container grid>
        <div className={styles.text}>
          <h2 id="approach-title">{approach.title}</h2>
          <p>{approach.body}</p>
        </div>
        <SignalLine />
      </Container>
    </section>
  );
}
