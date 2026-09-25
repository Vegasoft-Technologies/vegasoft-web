import Container from "./Container.tsx";
import styles from "./PageSection.module.css";

type PageSectionProps = {
  id: string;
  title: string;
  intro?: string;
  /** A rule above the section, where it follows another section. */
  rule?: boolean;
  children: React.ReactNode;
};

/** A section in the pattern of the home page: heading on the left, content on the right from 1024 px. */
export default function PageSection({
  id,
  title,
  intro,
  rule = false,
  children,
}: PageSectionProps) {
  const titleId = `${id}-title`;
  return (
    <section
      className={rule ? `${styles.section} ${styles.rule}` : styles.section}
      id={id}
      aria-labelledby={titleId}
    >
      <Container grid>
        <header className={styles.head}>
          <h2 id={titleId}>{title}</h2>
          {intro && <p>{intro}</p>}
        </header>
        <div className={styles.body}>{children}</div>
      </Container>
    </section>
  );
}
