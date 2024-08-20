import styles from "./style.module.scss";
import { NoteProps } from "@/Types";

export const Note = ({ icon, text }: NoteProps) => {
  return (
    <div className={styles.note}>
      {icon && icon}
      <span>{text}</span>
    </div>
  );
};
