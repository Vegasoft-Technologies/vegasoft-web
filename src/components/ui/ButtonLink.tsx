import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <a className={styles.button} href={href}>
      {children}
    </a>
  );
}
