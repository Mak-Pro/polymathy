import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import { Tab } from "@/components";
import { ProfileProps } from "@/Types";

export const Profile = ({
  id,
  uuid,
  first_name,
  last_name,
  photo_url,
  posts_count,
  balance,
  username,
}: ProfileProps) => {
  const initials = `${first_name[0].toUpperCase()}${
    last_name && last_name[0].toUpperCase()
  }`;
  return (
    <div className={styles.profile}>
      <div className={styles.profile__header}>
        {/* <div className={styles.profile__avatar}>
          {photo_url ? (
            <Image src={photo_url} width={80} height={80} alt={first_name} />
          ) : (
            <span>{initials}</span>
          )}
        </div> */}
        <h2 className={styles.profile__title}>
          {first_name} {last_name && last_name}
        </h2>
      </div>
      <div className={styles.profile__body}>
        <div className={styles.profile__tabs}>
          <Tab
            icon="/icons/tab-ticket-icon.svg"
            text={`Tickets (${balance ? balance : 0})`}
            link="/profile/points"
          />
          <Tab
            icon="/icons/tab-posts-icon.svg"
            text={`Activities`}
            link="/profile/posts"
          />
          <Tab
            icon="/icons/tab-experts-icon.svg"
            text="Become an Expert"
            link="/profile/expertize"
          />
          <Tab
            icon="/icons/tab-invite-icon.svg"
            text="Invite and Earn"
            link="/profile/invite"
          />
          <Tab
            icon="/icons/tab-spin-icon.svg"
            text="Spin an Win Tickets"
            link="/profile/spin"
            inActive
          />
          <Tab
            icon="/icons/contract-icon.svg"
            text="Contracts"
            link="/profile/contracts"
            inActive
          />
        </div>
      </div>
    </div>
  );
};
