import styles from "./Pending.module.css";

type PendingProps = {
  /** What is missing, for example "VAT number". */
  label: string;
};

/**
 * Stands in for a company detail that is not known yet. It renders only in development,
 * so the gap is visible while working locally and absent from every deployed build. The
 * value itself belongs in src/content/company.ts.
 */
export default function Pending({ label }: PendingProps) {
  if (process.env.NODE_ENV !== "development") return null;
  return <span className={styles.pending}>{label}: to be added</span>;
}
