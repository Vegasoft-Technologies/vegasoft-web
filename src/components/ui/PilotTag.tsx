import { contentFor } from "@/content/index.ts";
import type { Language } from "@/content/routes.ts";
import styles from "./PilotTag.module.css";

/** Marks a service that starts as a small trial on a single line or process. */
export default function PilotTag({ language }: { language: Language }) {
  return <span className={styles.tag}>{contentFor(language).pilotLabel}</span>;
}
