import Image from "next/image";
import styles from "./style.module.scss";
import { EndProps } from "@/Types";

export const End = ({ icon, text }: EndProps) => {
  return (
    <div className={styles.end}>
      {icon && (
        <Image
          src="/icons/eye-icon-large.svg"
          width={46}
          height={46}
          alt="end"
        />
      )}
      <h4>{text}</h4>
    </div>
  );
};
