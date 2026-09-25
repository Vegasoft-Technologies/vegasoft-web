import { home } from "@/content/en/home.ts";
import Container from "@/components/ui/Container.tsx";
import styles from "./HowWePrice.module.css";

const { pricing } = home;

export default function HowWePrice() {
  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-title">
      <Container grid>
        <header className={styles.head}>
          <h2 id="pricing-title">{pricing.title}</h2>
          <p>{pricing.intro}</p>
        </header>
        <ol className={styles.pricing}>
          {pricing.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
