"use client";
import { useEffect, useState } from "react";
import { StepsList, ListItem, Button, Modal, Friend } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./style.module.scss";
import { cssVariables } from "@/assets/styles/variables";
import LinkIcon from "@public/icons/link-icon.svg";
import { StatusBar, Preloader } from "@/components";
import { StatusBarType, InvitedProps } from "@/Types";

export const InviteAndEarn = () => {
  const [modal, setModal] = useState(false);
  const [referalLink, setReferalLink] = useState("");
  const [friends, setFriends] = useState<InvitedProps[] | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    status: StatusBarType;
    text: string;
  }>({
    show: false,
    status: undefined,
    text: "",
  });

  useEffect(() => {
    const inviteHandler = async () => {
      const token = sessionStorage.getItem("auth");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_API}/user/invites`,
        {
          headers: {
            "Authorization": token!,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          method: "GET",
        }
      );
      const data = await response.json();
      setReferalLink(data.data.referral_link);
      setFriends(data.data.invites);
    };
    inviteHandler();
  }, [referalLink]);

  return (
    <>
      <StatusBar show={notification.show} status={notification.status}>
        {notification.text}
      </StatusBar>
      {!friends && <Preloader />}
      {friends && (
        <div className={styles.invite}>
          <div className={styles.invite__content}>
            <h6 className={styles.invite__content_title}>How It Works</h6>
            <div className={styles.invite__intro}>
              {friends.length > 0 ? (
                <div className={styles.invite__friends}>
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className={styles.invite__friends_item}
                    >
                      <Friend
                        id={friend.id}
                        name={`${friend.first_name} ${
                          friend.last_name ? friend.last_name : ""
                        }`}
                        invited_count={friend.invites_count}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <StepsList>
                  <ListItem>Share your invitation link</ListItem>
                  <ListItem>Your friends join app</ListItem>
                  <ListItem>
                    Get 10{" "}
                    <Image
                      src="/icons/ticket.svg"
                      width={12}
                      height={12}
                      alt="coin"
                    />{" "}
                    Tickets per friend
                  </ListItem>
                </StepsList>
              )}
            </div>
          </div>
          <div className={styles.invite__actions}>
            <Button
              type="large"
              variant="filled"
              color={cssVariables.blue500}
              onClick={() => setModal(true)}
            >
              Invite Friend
            </Button>
          </div>
        </div>
      )}

      <Modal show={modal} closeHandler={() => setModal(false)}>
        <div className={styles.invite__modal_header}>
          <h3>Invite Friend</h3>
        </div>
        <div className={styles.invite__modal_body}>
          <Button type="small" variant="filled" color={cssVariables.blue500}>
            <Link
              href={`https://t.me/share/url?url=${referalLink}&text=💸 Join me on Polymathy to work together easy and rewarding! Use my invite link to join us.`}
            >
              Share
            </Link>
            Send
          </Button>

          <CopyToClipboard
            text={referalLink}
            onCopy={() => {
              setNotification({
                show: true,
                status: "success",
                text: "Referal link is copied!",
              });
              setTimeout(
                () =>
                  setNotification({
                    ...notification,
                    show: false,
                  }),
                2000
              );
            }}
          >
            <Button type="small" variant="text">
              <LinkIcon /> Copy Link
            </Button>
          </CopyToClipboard>
        </div>
        <div className={styles.invite__modal_footer}>
          <Button variant="text" type="small" onClick={() => setModal(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};
