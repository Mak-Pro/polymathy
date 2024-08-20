import Image from "next/image";
import { Button } from "@/components";
import styles from "./style.module.scss";
import { cssVariables } from "@/assets/styles/variables";

interface PhotoUploaderProps {
  url: string;
  callBack: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PhotoUploader = ({ url, callBack }: PhotoUploaderProps) => {
  return (
    <div className={styles.uploader}>
      <input type="file" onChange={callBack} accept="image/*" />
      <div className={styles.uploader__picture}>
        {url ? (
          <Image src={url} fill alt="avatar" />
        ) : (
          <Image
            src="/icons/camera-icon.svg"
            width={18}
            height={18}
            alt="camera"
          />
        )}
      </div>
      <Button type="small" variant="text" color={cssVariables.blue500}>
        {url ? "Edit Photo" : "Add Photo"}
      </Button>
    </div>
  );
};
