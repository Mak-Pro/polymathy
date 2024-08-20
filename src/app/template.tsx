"use client";
import { useEffect, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { Header, Footer, Navigation, Introduction } from "@/components";
import { useTelegram } from "@/providers/telegram";
import AppContext from "@/providers/context";

const headerPages = ["/", "/experts", "/profile"];

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { webApp } = useTelegram();
  const { isLogined } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  const toggleIntro = () => {
    if (!isLogined) {
      sessionStorage.setItem("intro", "true");
      setShowIntro(false);
    }
  };

  useEffect(() => {
    webApp?.ready();
    webApp?.expand();
    if (webApp) {
      // @ts-ignore
      webApp.disableVerticalSwipes();
      document.body.classList.add(webApp?.colorScheme);
    }
    webApp?.onEvent("themeChanged", () => {
      if (webApp?.colorScheme === "dark") {
        document.body.classList.remove("light");
        document.body.classList.add(webApp?.colorScheme);
      }
      if (webApp?.colorScheme === "light") {
        document.body.classList.remove("dark");
        document.body.classList.add(webApp?.colorScheme);
      }
    });
  }, [webApp]);

  useEffect(() => {
    if (typeof window !== "undefined" && !isLogined) {
      const intro = sessionStorage.getItem("intro");
      // if (intro) {
      //   setShowIntro(false);
      // } else {
      //   setShowIntro(true);
      // }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <>
      <>
        {headerPages.includes(pathname) && <Header pathname={pathname} />}
        <main
          className={`${headerPages.includes(pathname) ? "" : "alt"} ${
            pathname === "/profile/posts" ? "posts" : ""
          }`}
        >
          {children}
        </main>
        {headerPages.includes(pathname) && <Footer />}
      </>
      {headerPages.includes(pathname) && <Navigation />}
      {!isLogined && !loading && showIntro && (
        <Introduction start={toggleIntro} />
      )}
    </>
  );
}
