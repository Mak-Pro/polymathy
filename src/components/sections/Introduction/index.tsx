"use client";
import { useId, useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { SplashScreen, Button } from "@/components";
import styles from "./style.module.scss";
import { SplashScreenProps } from "@/Types";
import { cssVariables } from "@/assets/styles/variables";

const screens: SplashScreenProps[] = [
  {
    id: 1,
    image: {
      url: "/images/splash-1.webp",
      width: 198,
      height: 245.8,
      alt: "Effortlessly post job opportunities to find top talent.",
    },
    title: "Effortlessly post job opportunities to find top talent.",
  },
  {
    id: 2,
    image: {
      url: "/images/splash-2.webp",
      width: 167,
      height: 259.19,
      alt: "Showcase your expertise and connect with clients.",
    },
    title: "Showcase your expertise and connect with clients.",
  },
  {
    id: 3,
    image: {
      url: "/images/splash-3.webp",
      width: 295.37,
      height: 96.96,
      alt: "Navigate with ease, inspired by Telegram's simplicity.",
    },
    title: "Navigate with ease, inspired by Telegram's simplicity.",
  },
  {
    id: 4,
    image: {
      url: "/images/splash-4.webp",
      width: 308.45,
      height: 126.95,
      alt: "Earn tickets, invite friends, and enhance your profile visibility.",
    },
    title: "Earn tickets, invite friends, and enhance your profile visibility.",
  },
];

interface IntroductionProps {
  start?: () => void;
}

export const Introduction = ({ start }: IntroductionProps) => {
  const id = useId().replace(/:/g, "");
  const swiperRef = useRef<any>(null);
  const [last, setLast] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, [show]);

  return (
    <div
      className={`${styles.introduction} ${
        show ? styles.introduction_show : ""
      }`}
    >
      <div className={styles.introduction__header}>
        <Image src="/icons/logo-beta.svg" width={47} height={38} alt="logo" />
      </div>
      <div className={styles.introduction__body}>
        {screens && screens.length > 0 && (
          <div className={styles.slider__wrapper}>
            <div className={styles.slider__wrapper_body}>
              <Swiper
                className={`${styles.slider}`}
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={16}
                pagination={{
                  dynamicBullets: false,
                  el: `#pagination-${id}`,
                  type: "bullets",
                }}
                loop={false}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  swiper.realIndex === screens.length - 1
                    ? setLast(true)
                    : setLast(false);
                }}
              >
                {screens.map((screen) => (
                  <SwiperSlide key={screen.id}>
                    <SplashScreen
                      id={screen.id}
                      image={screen.image}
                      title={screen.title}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.slider__wrapper_footer}>
              <div
                id={`pagination-${id}`}
                className={styles.slider_pagination}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.introduction__footer}>
        <div
          className={`${styles.introduction__footer_buttons} ${
            last ? styles.introduction__footer_buttons_hidden : ""
          }`}
        >
          <Button
            type="large"
            variant="outlined"
            color={cssVariables.blue500}
            onClick={() => {
              start && start();
            }}
          >
            Skip
          </Button>
          <Button
            type="large"
            variant="filled"
            color={cssVariables.blue500}
            onClick={() => {
              swiperRef && swiperRef.current && swiperRef.current.slideNext();
            }}
          >
            Next
          </Button>
        </div>
        <Button
          type="large"
          variant="filled"
          color={cssVariables.blue500}
          className={`${styles.last} ${last ? styles.last__show : ""}`}
          onClick={() => {
            start && start();
          }}
        >
          Start
        </Button>
      </div>
    </div>
  );
};
