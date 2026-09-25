import { showSoon } from "@/lib/soon.ts";
import styles from "./Soon.module.css";

type SoonProps = {
  /**
   * What is coming, for a place that carries no label of its own, for example
   * "Privacy notice". Left out where a label already names it, as in a details row.
   */
  label?: string;
};

/**
 * Marks a detail or a page that is still coming, in the place it will take. It renders
 * only where the markers are on (src/lib/soon.ts), so no deployed production build
 * carries one. The `data-soon` attribute makes a build searchable for them.
 */
export default function Soon({ label }: SoonProps) {
  if (!showSoon) return null;
  return (
    <span className={styles.soon} data-soon>
      {label ? `${label}: Soon` : "Soon"}
    </span>
  );
}
