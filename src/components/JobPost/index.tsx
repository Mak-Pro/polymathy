"use client";
import { usePathname } from "next/navigation";
import { useId, useEffect, useContext, useState } from "react";
import Link from "next/link";
import { Tag, Collapsible, Note } from "@/components";
import { numberFormatter, timeParser } from "@/helpers";
import styles from "./style.module.scss";
import ClockIcon from "@public/icons/clock-icon.svg";
import MessageIcon from "@public/icons/message-square-icon.svg";
import { JobPostProps } from "@/Types";
import AppContext from "@/providers/context";

export const JobPost = ({
  id,
  name,
  price,
  description,
  tags,
  applicants_count,
  views_count,
  outerHref,
  expired_date,
}: JobPostProps) => {
  const pathname = usePathname();
  const tagId = useId().replace(/:/g, "");
  const [link, setLink] = useState(false);
  const { isLogined } = useContext(AppContext);

  useEffect(() => {
    if (isLogined) {
      setLink(true);
    }
  }, [isLogined, link]);

  return (
    <div className={styles.post}>
      {link && (
        <>
          {outerHref ? (
            <Link href={outerHref} className={styles.post__link}>
              link
            </Link>
          ) : (
            <Link
              href={`${pathname === "/" ? `/${id}` : `${pathname}/${id}`}`}
              className={styles.post__link}
            >
              link
            </Link>
          )}
        </>
      )}

      <div className={styles.post__header}>
        <h5 className={styles.post__title}>{name}</h5>
        <span className={styles.post__price}>
          ${numberFormatter(price as number)}
        </span>
      </div>
      <div className={styles.post__body}>
        {description && <p>{description}</p>}
      </div>
      <div className={styles.post__footer}>
        {tags && (
          <div className={styles.post__tags}>
            <Collapsible expanderClass={styles.post__tags_expander}>
              {tags.map((tag, i) => {
                return (
                  <div data-targetid={`${i}-${tagId}`} key={i}>
                    <Tag {...tag} />
                  </div>
                );
              })}
            </Collapsible>
          </div>
        )}

        <div className={styles.post__properties}>
          <Note
            icon={<ClockIcon />}
            text={`${timeParser(expired_date).hours.toFixed(0)}h`}
          />
          <Note
            icon={<MessageIcon />}
            text={applicants_count ? applicants_count : 0}
          />
        </div>
      </div>
    </div>
  );
};
