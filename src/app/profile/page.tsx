"use client";
import { useState, useEffect, useContext } from "react";
import { auth, getUser } from "@/helpers";
import { Profile, Preloader, Button } from "@/components";
import AppContext from "@/providers/context";
import { cssVariables } from "@/assets/styles/variables";
import SendIcon from "@public/icons/send-icon.svg";
import { ProfileProps } from "@/Types";

export default function ProfilePage() {
  const { isLogined, telegramUser, setIsLogined, telegramWebApp } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileProps | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (isLogined) {
      setLoading(true);
      const token = sessionStorage.getItem("auth");
      getUser(`${process.env.NEXT_PUBLIC_DEV_API}/user/info`, token!)
        .then((data) => {
          if (!data.data) {
            return;
          }
          setProfile(data.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isLogined]);

  // useEffect(() => {
  //   console.log(telegramWebApp?.initDataUnsafe);
  // }, [telegramWebApp]);

  return (
    <>
      {loading && (
        <div style={{ position: "relative", height: cssVariables.minHeight }}>
          <Preloader />
        </div>
      )}
      {!isLogined && (
        <div
          style={{
            height: cssVariables.minHeight,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            variant="filled"
            type="large"
            color={cssVariables.blue500}
            onClick={() => {
              sessionStorage.removeItem("auth");
              sessionStorage.removeItem("intro");
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
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <SendIcon /> Login With Telegram
          </Button>
        </div>
      )}

      {profile && <Profile {...profile} />}
    </>
  );
}
