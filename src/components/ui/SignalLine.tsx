import { contentFor } from "@/content/index.ts";
import type { Language } from "@/content/routes.ts";
import styles from "./SignalLine.module.css";

/** An uneven, hand-drawn line that becomes a regular digital signal. Static: no animation. */
export default function SignalLine({ language }: { language: Language }) {
  const { signal } = contentFor(language).home.approach;
  return (
    <figure className={styles.signal}>
      <svg viewBox="0 0 1200 160" role="img" aria-labelledby="signal-title">
        <title id="signal-title">{signal.title}</title>
        <path
          className={styles.hand}
          vectorEffect="non-scaling-stroke"
          d="M0 112 C8 111.5 16 113 24 112.2 C30 111.6 36 112.8 40 112 C42 95 41 70 44 50 C58 48 70 51.5 84 49.5 C92 48.5 97 50 100 49 C102 70 100 92 103 112 C114 113.5 126 110.8 138 112.6 C143 113.2 147 112 150 113 C151 90 153 66 151 44 C170 45.5 186 42.5 204 44.2 C216 45.2 226 42.8 235 46 C238 68 234 94 237 111 C248 110 262 115 272 112 C274 92 271 72 275 57 C288 55.5 298 58.5 308 56.8 C313 56 317 57.4 320 56 C321 80 324 96 322 113 C334 111.5 348 114.2 362 112.4 C370 111.4 376 113 380 111 C381 88 384 64 382 47 C398 49.5 414 45.6 432 47.4 C448 49 460 46.2 470 49 C472 74 469 95 473 112 C492 110.8 512 113.6 534 112.2 C552 111 566 113.2 580 112"
        />
        <line
          className={styles.handover}
          vectorEffect="non-scaling-stroke"
          x1="580"
          y1="20"
          x2="580"
          y2="140"
        />
        <path
          className={styles.system}
          vectorEffect="non-scaling-stroke"
          d="M580 112 H630 V48 H680 V112 H730 V48 H780 V112 H830 V48 H880 V112 H930 V48 H980 V112 H1030 V48 H1080 V112 H1130 V48 H1180 V112 H1200"
        />
      </svg>
      <figcaption className={styles.labels} aria-hidden="true">
        <span>{signal.handLabel}</span>
        <span>{signal.systemLabel}</span>
      </figcaption>
    </figure>
  );
}
