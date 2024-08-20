"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import styles from "./style.module.scss";
import { TopControlAreaProps } from "@/Types";

export const TopControlArea = ({
  back,
  backHandler,
  children,
}: TopControlAreaProps) => {
  const router = useRouter();
  return (
    <div className={styles.top__area}>
      {back && (
        <Button className={styles.top__area_back}>
          <Image
            src="/icons/arrow-left-icon.svg"
            width={20}
            height={20}
            alt="back"
            onClick={() => {
              backHandler ? backHandler() : router.back();
            }}
          />
        </Button>
      )}
      {children && children}
    </div>
  );
};
