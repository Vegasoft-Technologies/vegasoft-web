import { labels } from "@/content/en/navigation.ts";
import styles from "./SkipLink.module.css";

export default function SkipLink() {
  return (
    <a className={styles.skip} href="#main">
      {labels.skipLink}
    </a>
  );
}
