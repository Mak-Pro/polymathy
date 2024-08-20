import styles from "./style.module.scss";

interface ListItemProps {
  children?: React.ReactNode;
  className?: string;
}

export const ListItem = ({ children, className }: ListItemProps) => {
  return (
    <li className={`${styles.item} ${className ? className : ""}`}>
      <div>{children}</div>
    </li>
  );
};
