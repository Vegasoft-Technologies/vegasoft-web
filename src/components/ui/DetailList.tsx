import type { ProfileLink } from "@/content/company.ts";
import Pending from "./Pending.tsx";
import styles from "./DetailList.module.css";

export type Detail =
  | {
      label: string;
      /** null means not known yet: left out of deployed builds, a placeholder in development. */
      value: string | string[] | ProfileLink | ProfileLink[] | null;
    }
  | { label: string; node: React.ReactNode };

/** Labelled rows separated by rules, as in the contact section of the home page. */
export default function DetailList({ details }: { details: Detail[] }) {
  const development = process.env.NODE_ENV === "development";
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
        if (detail.value === null && !development) return null;
        return (
          <div key={detail.label}>
            <dt>{detail.label}</dt>
            <dd>
              {detail.value === null ? (
                <Pending label={detail.label} />
              ) : typeof detail.value === "string" ? (
                detail.value
              ) : !Array.isArray(detail.value) ? (
                <a href={detail.value.href}>{detail.value.label}</a>
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
