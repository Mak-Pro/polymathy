"use client";
import { useEffect, useState, useContext } from "react";
import { Button } from "@/components";
import CreateIcon from "@public/icons/plus-circle-icon.svg";
import BecomeIcon from "@public/icons/user-plus-icon.svg";
import SuggestIcon from "@public/icons/send-icon.svg";
import styles from "./style.module.scss";
import { cssVariables } from "@/assets/styles/variables";
import AppContext from "@/providers/context";

export const Footer = () => {
  const { isLogined } = useContext(AppContext);

  useEffect(() => {}, [isLogined]);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__links}>
        <Button
          href={isLogined ? "/create" : "/profile"}
          type="medium"
          variant="text"
          color={cssVariables.blue500}
        >
          <CreateIcon /> Create a Job Post
        </Button>
        <Button
          href={isLogined ? "/profile/expertize" : "/profile"}
          type="medium"
          variant="text"
          color={cssVariables.blue500}
        >
          <BecomeIcon /> Become an Expert
        </Button>
        <Button
          href="https://t.me/OnePlusOneSolutions"
          type="medium"
          variant="text"
          color={cssVariables.blue500}
          target="_blank"
        >
          <SuggestIcon /> Suggestions for Developers
        </Button>
      </div>
      <span className={styles.footer__copy}>
        {new Date().getFullYear()} © OnePlusOne Solutions
      </span>
    </footer>
  );
};
