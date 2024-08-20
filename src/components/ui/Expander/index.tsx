"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components";
import styles from "./style.module.scss";
import ChevronIcon from "@public/icons/chevron-down-icon.svg";
import { ExpanderProps } from "@/Types";

export const Expander = ({ title, text, className, opened }: ExpanderProps) => {
  const [open, setOpen] = useState(opened);
  useEffect(() => {
    setOpen(opened);
  }, [opened]);
  return (
    <div className={`${styles.expander} ${className ? className : ""}`}>
      <div className={styles.expander__header}>
        {title && <h3>{title}</h3>}
        <Button
          onClick={() => setOpen((p) => !p)}
          className={`${styles.expander__btn} ${
            open ? styles.expander__btn_rotated : ""
          }`}
        >
          <ChevronIcon />
        </Button>
      </div>
      {text && (
        <div
          className={`${styles.expander__body} ${
            open ? styles.expander__body_open : ""
          }`}
        >
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};
