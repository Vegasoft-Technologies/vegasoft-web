import Container from "./Container.tsx";
import styles from "./PageIntro.module.css";

type PageIntroProps = {
  title: string;
  lead: string;
  /** A quieter second paragraph under the lead. */
  note?: string;
};

/** The top of a page other than the home page: the heading and its lead. */
export default function PageIntro({ title, lead, note }: PageIntroProps) {
  return (
    <header className={styles.intro}>
      <Container>
        <h1>{title}</h1>
        <p className={styles.lead}>{lead}</p>
        {note && <p className={styles.note}>{note}</p>}
      </Container>
    </header>
  );
}
