"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tag, Button, Note, Modal, StatusBar } from "@/components";
import ClockIcon from "@public/icons/clock-icon.svg";
import MessageIcon from "@public/icons/message-square-icon.svg";
import EyeIcon from "@public/icons/eye-icon.svg";
import styles from "./style.module.scss";
import { cssVariables } from "@/assets/styles/variables";
import { numberFormatter, timeParser } from "@/helpers";
import { JobPostDetailsProps, StatusBarType } from "@/Types";

export const JobPostDetails = ({
  id,
  price,
  tags,
  name,
  expired_date,
  description,
  views_count,
  applicants_count,
  is_already_apply,
  is_yours,
  individual,
}: JobPostDetailsProps) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    status: StatusBarType;
    text: string;
  }>({
    show: false,
    status: undefined,
    text: "",
  });

  const deleteHandler = async () => {
    setNotification({
      show: true,
      status: "loading",
      text: "Please Wait. Unpublishing...",
    });
    const token = sessionStorage.getItem("auth");
    fetch(`${process.env.NEXT_PUBLIC_DEV_API}/post/${id}`, {
      headers: {
        "Authorization": token!,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setTimeout(() => {
            setNotification({
              show: true,
              status: "success",
              text: "Your Job Post Successfully Deleted!",
            });

            setTimeout(() => {
              router.refresh();
              setTimeout(() => {
                router.replace("/profile/posts");
              }, 500);
            }, 1000);
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <StatusBar show={notification.show} status={notification.status}>
        {notification.text}
      </StatusBar>
      <div className={styles.jp__details}>
        {name && <h3 className={styles.jp__details_title}>{name}</h3>}
        <div className={styles.jp__details_price}>
          ${numberFormatter(+price)}
        </div>
        <div className={styles.jp__details_tags}>
          {tags.map((tag) => (
            <Tag key={tag.id} name={tag.name} id={tag.id} />
          ))}
        </div>
        {description && (
          <div className={styles.jp__details_text}>
            <p>{description}</p>
          </div>
        )}

        <div className={styles.jp__details_properties}>
          <div>
            <Note text="Job Post Lifetime: " />
            <Note
              text={`${timeParser(expired_date).hours.toFixed(0)}h ${timeParser(
                expired_date
              ).minutes.toFixed(0)}min`}
              icon={<ClockIcon />}
            />
          </div>
          <div>
            <Note text={views_count ? views_count : 0} icon={<EyeIcon />} />
            <Note
              text={applicants_count ? applicants_count : 0}
              icon={<MessageIcon />}
            />
          </div>
        </div>

        {individual && (
          <Button
            color={cssVariables.red50}
            type="large"
            variant="filled"
            className={`${styles.jp__details_btn} danger`}
            onClick={() => setModal(true)}
          >
            Unpublish Job Post
          </Button>
        )}
        {!individual && !is_already_apply && !is_yours && (
          <Button
            color={cssVariables.blue500}
            type="large"
            variant="filled"
            className={styles.jp__details_btn}
          >
            <Link href={`${id}/request`}>link</Link>
            Submit Request
          </Button>
        )}
      </div>
      <Modal show={modal} closeHandler={(val) => setModal(val)}>
        <div className={styles.jp__details_deactivate}>
          <div className={styles.jp__details_deactivate_text}>
            <h3>Unpublish Job Post</h3>
            <p className={styles.jp__details_deactivate_text_note}>{name}</p>
            <p>${numberFormatter(+price)}</p>
          </div>
          <div className={styles.jp__details_deactivate_actions}>
            <Button
              variant="filled"
              type="small"
              color={cssVariables.red50}
              className="danger"
              onClick={deleteHandler}
            >
              Unpublish Job Post
            </Button>
            <Button variant="text" type="small" onClick={() => setModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
