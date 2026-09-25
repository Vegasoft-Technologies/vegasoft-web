import { contentFor } from "@/content/index.ts";
import type { Language } from "@/content/routes.ts";
import styles from "./SkipLink.module.css";

export default function SkipLink({ language }: { language: Language }) {
  return (
    <a className={styles.skip} href="#main">
      {contentFor(language).navigation.labels.skipLink}
    </a>
  );
}
