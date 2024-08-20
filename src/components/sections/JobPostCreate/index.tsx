"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import {
  TopControlArea,
  Expander,
  Button,
  TextField,
  Tags,
  StatusBar,
} from "@/components";
import styles from "./style.module.scss";
import { cssVariables } from "@/assets/styles/variables";
import CoinIcon from "@public/icons/coin.svg";
import { TagSimpleProps, StatusBarType } from "@/Types";

export const JobPostCreate = () => {
  const router = useRouter();
  const [focus, setFocus] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagSimpleProps[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
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

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotification({
      show: true,
      status: "loading",
      text: "Please Wait. Posting...",
    });
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const data = {
      name,
      price: parseFloat(String(price).replace(/\s/g, "")),
      tags: selectedTags.map((tag) => tag.id),
      description,
    };
    const token = sessionStorage.getItem("auth");
    fetch(`${process.env.NEXT_PUBLIC_DEV_API}/post`, {
      headers: {
        "Authorization": token!,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setTimeout(() => {
            setNotification({
              show: true,
              status: "success",
              text: "Your Job Successfully Posted!",
            });

            setTimeout(() => {
              router.refresh();
              setTimeout(() => {
                router.replace("/profile/posts");
              }, 500);
            }, 1000);

            setName("");
            setPrice("");
            setDescription("");
            setSelectedTags([]);
            setReset(true);
            setTimeout(() => {
              setReset(false);
            }, 100);
          }, 500);
        } else if (data.message === "The name has already been taken") {
          setTimeout(() => {
            setNotification({
              show: true,
              status: "error",
              text: `A project with this name already exists`,
            });

            setTimeout(() => {
              setNotification((prev) => ({
                ...prev,
                show: false,
              }));
            }, 2000);
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {}, [focus, selectedTags]);

  return (
    <>
      <StatusBar show={notification.show} status={notification.status}>
        {notification.text}
      </StatusBar>
      <div
        className={`${styles.create__wrapper} ${
          notification.show ? styles.create__wrapper_inactive : ""
        }`}
      >
        <TopControlArea back />
        <div className={styles.create}>
          <Expander
            opened={!focus}
            title="Create a Job Post"
            text="You create a job post, specify the project name, price tags (Maximum: 3 tags) and description. Your post will appear in the public feed and will be seen by interested users who contact you."
          />
          <form
            onSubmit={submitHandler}
            className={styles.create__form}
            autoComplete="off"
          >
            <TextField
              placeholder="Project Name"
              type="input"
              name="name"
              changeHandler={(val) => setName(val)}
              focusHandler={() => setFocus(true)}
              blurHandler={() => {
                !name && !price && !description && setFocus(false);
              }}
              reset={reset}
            />
            <TextField
              placeholder="Price (USD)"
              type="input"
              name="price"
              changeHandler={(val) => setPrice(val)}
              focusHandler={() => setFocus(true)}
              blurHandler={() => {
                !name && !price && !description && setFocus(false);
              }}
              prefix="$"
              numeric
              reset={reset}
            />
            <Tags postTags={(tags) => setSelectedTags(tags)} reset={reset} />
            <TextField
              placeholder="Description"
              type="textarea"
              name="description"
              changeHandler={(val) => setDescription(val)}
              focusHandler={() => setFocus(true)}
              blurHandler={() => {
                !name && !price && !description && setFocus(false);
              }}
              reset={reset}
            />
            <Button
              color={cssVariables.blue500}
              type="large"
              variant="filled"
              className={styles.jp__submit_btn}
              submit
              disabled={
                !name || !price || selectedTags.length === 0 || !description
              }
            >
              Create a Job Post for 3<CoinIcon />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
