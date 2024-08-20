"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import {
  TopControlArea,
  Button,
  TextField,
  Tags,
  StatusBar,
  Spacer,
} from "@/components";
import styles from "./style.module.scss";
import { cssVariables } from "@/assets/styles/variables";
import { TagSimpleProps, StatusBarType, JobPostEditProps } from "@/Types";
import { numberFormatter } from "@/helpers";

export const JobPostEdit = ({
  id,
  name,
  price,
  tags,
  description,
}: JobPostEditProps) => {
  const router = useRouter();
  const [focus, setFocus] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagSimpleProps[]>(tags);
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editDescription, setEditDescription] = useState(description);
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
      text: "Please Wait. Updating...",
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
    fetch(`${process.env.NEXT_PUBLIC_DEV_API}/post/${id}`, {
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
              text: "Your Job Post Successfully Updated!",
            });

            setTimeout(() => {
              router.refresh();
              setTimeout(() => {
                router.replace("/profile/posts");
              }, 500);
            }, 1000);
            setTimeout(() => {
              setReset(false);
            }, 100);
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
          <Spacer desktop={20} mobile={20} />
          <h3 className="page__title">Edit a Job Post</h3>
          <form
            onSubmit={submitHandler}
            className={styles.create__form}
            autoComplete="off"
          >
            <TextField
              placeholder="Project Name"
              type="input"
              name="name"
              initValue={editName}
              changeHandler={(val) => setEditName(val)}
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
              initValue={numberFormatter(+editPrice)}
              changeHandler={(val) => setEditPrice(val)}
              focusHandler={() => setFocus(true)}
              blurHandler={() => {
                !name && !price && !description && setFocus(false);
              }}
              prefix="$"
              numeric
              reset={reset}
            />
            <Tags
              initTags={tags}
              postTags={(tags) => setSelectedTags(tags)}
              reset={reset}
            />
            <TextField
              placeholder="Description"
              type="textarea"
              name="description"
              initValue={editDescription as string}
              changeHandler={(val) => setEditDescription(val)}
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
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
