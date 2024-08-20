import styles from "./style.module.scss";

export const StepsList = ({ children }: { children: React.ReactNode }) => {
  return <ul className={styles.steps__list}>{children}</ul>;
};
