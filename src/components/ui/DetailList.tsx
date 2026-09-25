import type { ProfileLink } from "@/content/company.ts";
import { showSoon } from "@/lib/soon.ts";
import Soon from "./Soon.tsx";
import styles from "./DetailList.module.css";

export type Detail =
  | {
      label: string;
      value: string | string[] | ProfileLink[] | null;
      /**
       * Whether a value that is not known yet is marked "Soon". Without it the row is
       * left out entirely while the value is null, everywhere.
       */
      soon?: boolean;
    }
  | { label: string; node: React.ReactNode };

/** Labelled rows separated by rules, as in the contact section of the home page. */
export default function DetailList({ details }: { details: Detail[] }) {
  return (
    <dl className={styles.list}>
      {details.map((detail) => {
        if ("node" in detail) {
          return (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.node}</dd>
            </div>
          );
        }
        if (detail.value === null && !(detail.soon && showSoon)) return null;
        return (
          <div key={detail.label}>
            <dt>{detail.label}</dt>
            <dd>
              {detail.value === null ? (
                <Soon />
              ) : typeof detail.value === "string" ? (
                detail.value
              ) : (
                <ul>
                  {(detail.value as (string | ProfileLink)[]).map((item) =>
                    typeof item === "string" ? (
                      <li key={item}>{item}</li>
                    ) : (
                      <li key={item.href}>
                        <a href={item.href}>{item.label}</a>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
