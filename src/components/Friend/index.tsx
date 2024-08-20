import Image from "next/image";
import styles from "./style.module.scss";
import { FriendProps } from "@/Types";
import UsersIcon from "@public/icons/users-icon.svg";

export const Friend = ({
  id,
  avatar,
  name,
  invited_count,
  coins_count,
}: FriendProps) => {
  const initialsArray = name.split(" ");
  const initials = initialsArray.map((initial, i) => {
    let result = "";
    if (i < 3) {
      result += initial[0].toUpperCase();
    }
    return result;
  });
  return (
    <div className={styles.friend}>
      <div className={styles.friend__avatar}>
        {avatar ? (
          <Image src={avatar} width={48} height={48} alt={name} />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <div className={styles.friend__info}>
        <div className={styles.friend__info_title_line}>
          <h5 className={styles.friend__info_title}>{name}</h5>
          {/* <div className={styles.friend__coins}>
            {coins_count ? coins_count : 0}
            <Image src="/icons/coin.svg" width={12} height={12} alt="coins" />
          </div> */}
        </div>
        <div className={styles.friend__invited}>
          <div className={styles.friend__invited_icon}>
            <UsersIcon />
          </div>
          <span>
            {invited_count && invited_count > 0 ? "+" : ""}
            {invited_count ? invited_count : 0}
          </span>
        </div>
      </div>
    </div>
  );
};
