import Image from "next/image";
import { Button } from "@/components";
import styles from "./style.module.scss";

interface ModalProps {
  children?: React.ReactNode;
  show?: boolean;
  closeHandler?: (val: boolean) => void;
}

export const Modal = ({ children, show, closeHandler }: ModalProps) => {
  return (
    <div className={`${styles.modal} ${show ? styles.modal__show : ""}`}>
      <div className={styles.modal__overlay}></div>
      <div className={styles.modal__content}>
        <div
          className={`${styles.modal__content_inner} ${
            show ? styles.modal__content_inner_show : ""
          }`}
        >
          <Button
            type="medium"
            variant="text"
            className={styles.modal__close}
            onClick={() => (closeHandler ? closeHandler(false) : () => {})}
          >
            <Image
              src="/icons/x-cancel-icon.svg"
              width={20}
              height={20}
              alt="close"
            />
          </Button>
          {children && children}
        </div>
      </div>
    </div>
  );
};
