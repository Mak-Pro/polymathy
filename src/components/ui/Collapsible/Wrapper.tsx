import { Observer } from "./Observer";
import styles from "./style.module.scss";

interface CollapsibleProps {
  children: any;
  expanderClass?: string;
}

export const Collapsible = ({
  children,
  expanderClass,
}: CollapsibleProps): JSX.Element => {
  return (
    <Observer className={styles.collapsible} expanderClass={expanderClass}>
      {children}
    </Observer>
  );
};
