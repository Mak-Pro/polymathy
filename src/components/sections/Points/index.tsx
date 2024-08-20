"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./style.module.scss";

export const Points = () => {
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("auth");
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_DEV_API}/user/info`, {
        headers: {
          "Authorization": token!,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBalance(data.data.balance);
        });
    }
  }, []);

  return (
    <div className={styles.points}>
      <h2 className={`page__title ${styles.points__title}`}>Tickets</h2>
      <div className={styles.points__ballance}>
        <h5>Your Balance</h5>
        {balance && (
          <div className={styles.points__ballance_count}>
            <Image src="/icons/ticket.svg" width={24} height={24} alt="coin" />
            <span>{balance}</span>
          </div>
        )}
      </div>
      <div className={styles.points__text}>
        <p>
          You can use your tickets to create Job Posts and find an expert for
          the project
        </p>
        <p>
          As well as to respond to Job Posts created by other users to act as an
          expert on the project
        </p>
      </div>
    </div>
  );
};
