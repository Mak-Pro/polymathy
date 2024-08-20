import React from "react";
import styles from "./style.module.scss";
import Spinner from "/public/icons/spinner.svg";

export const Preloader = ({ className }: { className?: string }) => {
  return (
    <div className={`${styles.preloader} ${className}`}>
      <Spinner />
    </div>
  );
};
