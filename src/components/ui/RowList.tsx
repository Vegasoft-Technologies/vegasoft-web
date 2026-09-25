import styles from "./RowList.module.css";

type RowListProps = {
  children: React.ReactNode;
};

/** Entries separated by rules, each a heading and a paragraph, as in "How we price". */
export default function RowList({ children }: RowListProps) {
  return <ul className={styles.list}>{children}</ul>;
}
