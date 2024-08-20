import { cssVariables } from "@/assets/styles/variables";
import styles from "./style.module.scss";
import CancelIcon from "@public/icons/x-cancel-circle-icon.svg";
import { TagProps } from "@/Types";

export const Tag = ({
  name,
  textColor,
  bgColor,
  isRemovable,
  onClick,
}: TagProps) => {
  return (
    <div
      className={`${styles.tag} ${isRemovable ? styles.tag__removable : ""}`}
      style={{
        color: textColor ? textColor : cssVariables.black400,
        backgroundColor: bgColor ? bgColor : cssVariables.blue100,
      }}
    >
      <span className={styles.tag__text}>{name}</span>
      {isRemovable && (
        <span
          className={styles.tag__action}
          onClick={onClick ? () => onClick() : () => null}
        >
          <CancelIcon />
        </span>
      )}
    </div>
  );
};
