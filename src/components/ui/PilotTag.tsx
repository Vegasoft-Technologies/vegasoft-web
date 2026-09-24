import { pilotLabel } from "@/content/en/areas.ts";
import styles from "./PilotTag.module.css";

/** Marks a service that starts as a small trial on a single line or process. */
export default function PilotTag() {
  return <span className={styles.tag}>{pilotLabel}</span>;
}
