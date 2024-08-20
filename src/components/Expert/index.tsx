import { useId } from "react";
import Image from "next/image";
import { Tag, Collapsible } from "@/components";
import styles from "./style.module.scss";
import { ExpertProps } from "@/Types";

export const Expert = ({
  id,
  avatar,
  name,
  description,
  tags,
  hour_price,
  location,
}: ExpertProps) => {
  const tagId = useId().replace(/:/g, "");
  const initialsArray = name.split(" ");
  const initials = initialsArray.map((initial, i) => {
    let result = "";
    if (i < 3) {
      result += initial[0].toUpperCase();
    }
    return result;
  });
  return (
    <div className={styles.expert}>
      <div className={styles.expert__avatar}>
        {avatar ? (
          <Image src={avatar} width={48} height={48} alt={name} />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <div className={styles.expert__info}>
        <h5 className={styles.expert__info_title}>{name}</h5>
        {description && (
          <div className={styles.expert__info_description}>
            <p>{description}</p>
          </div>
        )}

        <div className={styles.expert__info_properties}>
          {hour_price && (
            <div>
              <Image
                src="/icons/clock-icon-small.svg"
                width={12}
                height={12}
                alt="per hour"
              />{" "}
              <span>${hour_price}</span> per hour
            </div>
          )}
          {location && (
            <div>
              <Image
                src="/icons/map-pin-icon.svg"
                width={12}
                height={12}
                alt="location"
              />{" "}
              <span>{location}</span>
            </div>
          )}
        </div>

        {tags && (
          <div className={styles.expert__tags}>
            <Collapsible>
              {tags.map((tag, i) => {
                return (
                  <div data-targetid={`${i}-${tagId}`} key={i}>
                    <Tag name={tag.name} id={tag.id} />
                  </div>
                );
              })}
            </Collapsible>
          </div>
        )}
      </div>
    </div>
  );
};
