"use client";
import React, { createContext, useState, useEffect } from "react";
import { check, getUser } from "@/helpers";
import { useTelegram } from "./telegram";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

const AppContext = createContext({
  isLogined: false,
  setIsLogined: (val: boolean): void => {},
  telegramUser: {
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
  } as TelegramUser | null,
  telegramWebApp: undefined as WebApp | undefined,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { webApp, user } = useTelegram();
  const [isLogined, setIsLogined] = useState(false);
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [telegramWebApp, setTelegramWebApp] = useState<WebApp | undefined>(
    undefined
  );

  useEffect(() => {
    if (user?.id) {
      setTelegramUser(user);
      if (sessionStorage.getItem("auth") === null) {
        check(
          `${process.env.NEXT_PUBLIC_DEV_API}/check-user`,
          JSON.stringify({
            "uuid": user?.id,
          })
        ).then((success) => {
          if (success === true) {
            setIsLogined(true);
          }
        });
      } else {
        const token = sessionStorage.getItem("auth");
        getUser(`${process.env.NEXT_PUBLIC_DEV_API}/user/info`, token!).then(
          (data) => {
            if (data.success && data.success === true) {
              setIsLogined(true);
            } else {
              setIsLogined(false);
            }
          }
        );
      }
    }
    if (webApp) {
      setTelegramWebApp(webApp);
    }
  }, [isLogined, user]);

  const handleLogin = (val: boolean) => {
    setIsLogined(val);
  };
  return (
    <AppContext.Provider
      value={{ isLogined, setIsLogined, telegramUser, telegramWebApp }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
