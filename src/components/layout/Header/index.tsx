"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AppContext from "@/providers/context";
import { Button } from "@/components";
import CoinIcon from "@public/icons/ticket.svg";
import styles from "./style.module.scss";
import { cssVariables } from "@/assets/styles/variables";
import SendIcon from "@public/icons/send-icon.svg";
import { auth } from "@/helpers";

export const Header = ({ pathname }: { pathname: string }) => {
  const router = useRouter();
  const { isLogined, telegramUser, setIsLogined } = useContext(AppContext);
  let actionButton = null;
  switch (pathname) {
    case "/experts":
      actionButton = (
        <Button variant="filled" type="small" color={cssVariables.blue500}>
          <Link href="/profile/expertize">link</Link>
          Become an Expert
        </Button>
      );
      break;
    case "/profile":
      // actionButton = (
      //   <Button
      //     variant="text"
      //     type="small"
      //     color={cssVariables.blue500}
      //     className={`edit__profile ${isLogined ? "visible" : "hidden"}`}
      //   >
      //     {/* <Link href="/create">link</Link> */}
      //     Edit Profile
      //   </Button>
      // );
      actionButton = null;
      break;
    default:
      actionButton = (
        <Button variant="filled" type="small" color={cssVariables.blue500}>
          <Link href="/create">link</Link>
          Create a Job Post for 3<CoinIcon width={16} />
        </Button>
      );
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__logo}>
        <Image src="/icons/logo-beta.svg" width={47} height={38} alt="logo" />
      </Link>
      <div className={styles.header__actions}>
        {isLogined ? (
          actionButton
        ) : (
          <>
            {pathname !== "/profile" ? (
              <Button
                variant="filled"
                type="small"
                color={cssVariables.blue500}
                onClick={() => {
                  sessionStorage.removeItem("auth");
                  auth(
                    `${process.env.NEXT_PUBLIC_DEV_API}/auth`,
                    JSON.stringify({
                      uuid: telegramUser!.id,
                      username: telegramUser!.username,
                      first_name: telegramUser!.first_name,
                      last_name: telegramUser!.last_name,
                      photo_url: null,
                    })
                  )
                    .then((success) => {
                      if (success === true) {
                        setIsLogined(true);
                        router.replace("/profile");
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                <SendIcon /> Login With Telegram
              </Button>
            ) : null}
          </>
        )}
      </div>
    </header>
  );
};
