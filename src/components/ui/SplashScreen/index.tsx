import Image from "next/image";
import styles from "./style.module.scss";
import { SplashScreenProps } from "@/Types";

export const SplashScreen = ({ image, title }: SplashScreenProps) => {
  return (
    <div className={styles.screen}>
      {image && (
        <div className={`${styles.screen__image}`}>
          <Image
            src={image.url}
            width={image.width}
            height={image.height}
            alt={image.alt ? image.alt : "image"}
          />
        </div>
      )}
      {title && <h2 className={styles.screen__title}>{title}</h2>}
    </div>
  );
};
