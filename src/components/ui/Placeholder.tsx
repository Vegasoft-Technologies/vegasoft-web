// Shares Pending's style: both mark a place that is filled in later.
import styles from "./Pending.module.css";

type PlaceholderProps = {
  /** What will be here, in full, for example "Contact form: added with the server work". */
  text: string;
};

/** Marks the place of something that does not exist yet. Renders only in development. */
export default function Placeholder({ text }: PlaceholderProps) {
  if (process.env.NODE_ENV !== "development") return null;
  return <span className={styles.pending}>{text}</span>;
}
