import styles from "./style.module.scss";
import { StatusBarProps } from "@/Types";

export const StatusBar = ({ children, status, show }: StatusBarProps) => {
  return (
    <div
      className={`${styles.bar} ${show ? styles.bar__show : ""} ${
        status === "loading"
          ? styles.bar__loading
          : status === "success"
          ? styles.bar__success
          : status === "error"
          ? styles.bar__error
          : ""
      }`}
    >
      <span>{children}</span>
    </div>
  );
};
