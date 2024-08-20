"use client";
import { useState, useEffect, FormEvent, useId } from "react";
import { useRouter } from "next/navigation";
import {
  Tag,
  Button,
  TextField,
  Expander,
  Collapsible,
  StatusBar,
} from "@/components";
import styles from "./style.module.scss";
import { cssVariables } from "@/assets/styles/variables";
import { TagProps, StatusBarType } from "@/Types";
import { numberFormatter } from "@/helpers";

export const JobPostSubmit = ({ id }: { id: string }) => {
  useEffect(() => {
    if (typeof window !== undefined) {
      const token = sessionStorage.getItem("auth");
      fetch(`${process.env.NEXT_PUBLIC_DEV_API}/posts/show?post_id=${id}`, {
        headers: {
          "Authorization": token!,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setName(data.data.name);
          setPrice(numberFormatter(data.data.price));
          setTags(data.data.tags);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  const router = useRouter();
  const tagId = useId().replace(/:/g, "");
  const [focus, setFocus] = useState(false);
  const [val, setVal] = useState("");

  const [name, setName] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [tags, setTags] = useState<TagProps[]>([]);

  const [notification, setNotification] = useState<{
    show: boolean;
    status: StatusBarType;
    text: string;
  }>({
    show: false,
    status: undefined,
    text: "",
  });

  const [reset, setReset] = useState(false);

  const focusHandler = (value: boolean) => {
    setFocus(value);
  };

  const blurHandler = (value: boolean) => {
    val.length === 0 && setFocus(value);
  };

  const valueHandler = (value: string) => {
    setVal(value);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotification({
      show: true,
      status: "loading",
      text: "Sending Request...",
    });
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message");
    const token = sessionStorage.getItem("auth");
    fetch(`${process.env.NEXT_PUBLIC_DEV_API}/posts/apply`, {
      method: "POST",
      headers: {
        "Authorization": token!,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        post_id: id,
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setTimeout(() => {
            setNotification({
              show: true,
              status: "success",
              text: "Request Successfully Submited!",
            });

            setTimeout(() => {
              setTimeout(() => {
                router.replace("/");
              }, 500);
            }, 1000);

            setReset(true);
            setTimeout(() => {
              setReset(false);
            }, 100);
          }, 500);
        } else if (data.errors) {
          setTimeout(() => {
            setNotification({
              show: true,
              status: "error",
              text: `You have been already apply to this post`,
            });

            setTimeout(() => {
              setNotification((prev) => ({
                ...prev,
                show: false,
              }));
            }, 2000);
          }, 500);
        }
      });

    // reddirect on success
    // router.replace("/");
  };

  return (
    <>
      <StatusBar show={notification.show} status={notification.status}>
        {notification.text}
      </StatusBar>
      <div
        className={`${styles.jp__submit} ${
          notification.show ? styles.jp__submit_inactive : ""
        }`}
      >
        <Expander
          title="Submit Request"
          text="You apply for a project, send a message to the client, they will
            review your message and contact you if you are suitable. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Delectus, quaerat."
          className={styles.jp__submit_expander}
          opened={!focus}
        />
        <div className={styles.jp__submit_info}>
          <h5>{name}</h5>
          <span>${price}</span>
        </div>
        <div className={styles.jp__submit_tags}>
          <Collapsible expanderClass={styles.post__tags_expander}>
            {tags.map((tag, i) => (
              <div data-targetid={`${i}-${tagId}`} key={i}>
                <Tag id={1} name={tag.name} />
              </div>
            ))}
          </Collapsible>
        </div>
        <form onSubmit={submitHandler} className={styles.jp__submit_form}>
          <TextField
            placeholder="Message"
            type="textarea"
            focusHandler={focusHandler}
            blurHandler={blurHandler}
            changeHandler={valueHandler}
            name="message"
            reset={reset}
          />
          <Button
            color={cssVariables.blue500}
            type="large"
            variant="filled"
            className={styles.jp__submit_btn}
            submit
          >
            Send Request
          </Button>
        </form>
      </div>
    </>
  );
};
