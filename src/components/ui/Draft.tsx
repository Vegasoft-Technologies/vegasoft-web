import { contentFor } from "@/content/index.ts";
import type { Language } from "@/content/routes.ts";
import { showSoon } from "@/lib/soon.ts";
import styles from "./Draft.module.css";

type DraftProps = {
  language: Language;
  children: React.ReactNode;
};

/**
 * A sentence the owner has not approved yet. It renders only where the markers are on
 * (src/lib/soon.ts), marked as a draft, in the place it would take once approved, and is
 * absent from the production build. The sentence lives in the content file with
 * `approved: false`.
 */
export default function Draft({ language, children }: DraftProps) {
  if (!showSoon) return null;
  return (
    <div className={styles.draft}>
      <span className={styles.label}>{contentFor(language).navigation.labels.draft}</span>
      {children}
    </div>
  );
}
