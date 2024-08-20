import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import { TabProps } from "@/Types";

export const Tab = ({ icon, text, link, inActive }: TabProps) => {
  return (
    <div className={`${styles.tab} ${inActive ? styles.tab__inactive : ""}`}>
      {link && (
        <Link href={link} className={styles.tab__link}>
          link
        </Link>
      )}
      {icon && (
        <Image
          src={icon}
          width={36}
          height={36}
          alt={text}
          className={styles.tab__icon}
        />
      )}
      <span className={styles.tab__text}>{text}</span>
      {inActive ? (
        <span className={styles.tab__note}>Coming Soon</span>
      ) : (
        <Image
          src="/icons/chevron-right-icon.svg"
          width={24}
          height={24}
          alt="Go"
          className={styles.tab__arrow}
        />
      )}
    </div>
  );
};
