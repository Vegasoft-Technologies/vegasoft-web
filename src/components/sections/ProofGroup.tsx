import type { Language } from "@/content/routes.ts";
import { showSoon } from "@/lib/soon.ts";
import Soon from "@/components/ui/Soon.tsx";
import styles from "./Proof.module.css";

type ProofGroupProps = {
  language: Language;
  title: string;
  placeholder: string;
  count: number;
  children: React.ReactNode;
};

/** One kind of proof: its entries when there are any, otherwise a marker in its place. */
export default function ProofGroup({
  language,
  title,
  placeholder,
  count,
  children,
}: ProofGroupProps) {
  if (count === 0) {
    if (!showSoon) return null;
    return (
      <div className={styles.group}>
        <Soon language={language} label={placeholder} />
      </div>
    );
  }
  return (
    <div className={styles.group}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
