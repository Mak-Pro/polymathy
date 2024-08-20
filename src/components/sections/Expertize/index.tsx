"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import {
  TextField,
  CropperBox,
  PhotoUploader,
  Spacer,
  Button,
  Tags,
  StatusBar,
} from "@/components";
import styles from "./style.module.scss";
import CoinIcon from "@public/icons/coin.svg";
import { cssVariables } from "@/assets/styles/variables";
import { TagSimpleProps, StatusBarType } from "@/Types";

export const Expertize = () => {
  const [modal, setModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageSrc, setCroppedImageSrc] = useState("");
  const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();

  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<TagSimpleProps[]>([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
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

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl as any);
      setEvent(e);
      setModal(true);
    }
  };

  const handdleCroppedImage = (url: string) => {
    setCroppedImageSrc(url);
  };

  useEffect(() => {}, [imageSrc, croppedImageSrc]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotification({
      show: true,
      status: "loading",
      text: "Please Wait. Processing...",
    });

    // fake
    setTimeout(() => {
      setNotification({
        show: true,
        status: "success",
        text: "Your request has been sent",
      });
      setTimeout(() => {
        setNotification({
          show: false,
          status: "success",
          text: "Your request has been sent",
        });
        setTimeout(() => {
          router.replace("/");
        }, 400);
      }, 1000);
    }, 1000);

    const formData = new FormData(e.currentTarget);
    const avatar = formData.get("avatar");
    const name = formData.get("name");

    const bio = formData.get("bio");
    const location = formData.get("location");
    const data = {
      avatar,
      name,
      bio,
      location,
      tags: selectedTags.map((tag) => tag.id),
    };
    const token = sessionStorage.getItem("auth");
    // fetch(`${process.env.NEXT_PUBLIC_DEV_API}/post`, {
    //   headers: {
    //     "Authorization": token!,
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success === true) {
    //       setTimeout(() => {
    //         setNotification({
    //           show: true,
    //           status: "success",
    //           text: "You have successfully become an Expert!",
    //         });
    //         setTimeout(() => {
    //           router.refresh();
    //           setTimeout(() => {
    //             router.replace("/profile");
    //           }, 500);
    //         }, 1000);

    //         setName("");
    //         setBio("");
    //         setSelectedTags([]);
    //         setReset(true);
    //         setTimeout(() => {
    //           setReset(false);
    //         }, 100);
    //       }, 500);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };

  return (
    <>
      <StatusBar show={notification.show} status={notification.status}>
        {notification.text}
      </StatusBar>
      <div className={`${styles.expertize} ${modal ? "hidden" : ""}`}>
        <Spacer desktop={18} mobile={18} />
        <h3>Create Expert Profile</h3>
        <Spacer desktop={10} mobile={10} />
        <p>
          Fill out an expert profile so that other users can find you to develop
          their project
        </p>
        <Spacer desktop={15} mobile={15} />
        <form onSubmit={submitHandler} autoComplete="off">
          <input type="hidden" name="avatar" value={croppedImageSrc} />
          <PhotoUploader
            url={croppedImageSrc}
            callBack={(e) => onFileChange(e)}
          />
          <TextField
            placeholder="Expert/Company Name"
            type="input"
            name="name"
            changeHandler={(val) => setName(val)}
            reset={reset}
          />
          <TextField
            placeholder="Bio"
            type="textarea"
            name="bio"
            changeHandler={(val) => setBio(val)}
            reset={reset}
          />
          <TextField
            name="location"
            type="input"
            placeholder="Location"
            suffix="Optional"
            changeHandler={(val) => setLocation(val)}
            reset={reset}
          />
          <Tags postTags={(tags) => setSelectedTags(tags)} reset={reset} />
          <Button
            color={cssVariables.blue500}
            type="large"
            variant="filled"
            className={styles.jp__submit_btn}
            submit
            disabled={!name || selectedTags.length === 0 || !bio}
          >
            Become an Expert for 3<CoinIcon />
          </Button>
        </form>
      </div>
      <div
        className={`${styles.expertize__modal} ${
          modal ? styles.expertize__modal_show : ""
        }`}
      >
        {imageSrc && (
          <CropperBox
            event={event}
            applyHandler={handdleCroppedImage}
            cancelHandler={() => setModal(false)}
          />
        )}
      </div>
    </>
  );
};
