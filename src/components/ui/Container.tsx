import styles from "./Container.module.css";

type ContainerProps = {
  /** Lay the children out on the twelve-column grid. */
  grid?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Container({ grid = false, className, children }: ContainerProps) {
  const classes = [styles.container, grid && styles.grid, className]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
