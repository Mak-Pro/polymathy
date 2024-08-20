"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Placeholder from "@public/icons/help-circle-icon.svg";
import JobPosts from "@public/icons/server-icon.svg";
import Experts from "@public/icons/award-icon.svg";
import Profile from "@public/icons/user-icon.svg";
import styles from "./style.module.scss";

const navigationItems = [
  // { link: "/placeholder", icon: <Placeholder />, text: "Placeholder" },
  { link: "/", icon: <JobPosts />, text: "Job Posts" },
  { link: "/experts", icon: <Experts />, text: "Experts" },
  { link: "/profile", icon: <Profile />, text: "Profile" },
];

export const Navigation = () => {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      {navigationItems.map((item) => (
        <div
          key={item.text}
          className={`${styles.nav__item} ${
            path === item.link ? styles.nav__item_active : ""
          }`}
        >
          <Link href={item.link} className={styles.nav__item_link}>
            Link
          </Link>
          <div className={styles.nav__item_icon}>{item.icon}</div>
          <span className={styles.nav__item_text}>{item.text}</span>
        </div>
      ))}
    </nav>
  );
};
