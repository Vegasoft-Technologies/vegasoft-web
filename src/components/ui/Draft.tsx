import { labels } from "@/content/en/navigation.ts";
import styles from "./Draft.module.css";

type DraftProps = {
  children: React.ReactNode;
};

/**
 * A sentence the owner has not approved yet. It renders only in development, marked as a
 * draft, in the place it would take once approved, and is absent from every deployed
 * build. The sentence itself lives in the content file with `approved: false`.
 */
export default function Draft({ children }: DraftProps) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div className={styles.draft}>
      <span className={styles.label}>{labels.draft}</span>
      {children}
    </div>
  );
}
