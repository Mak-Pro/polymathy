"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { TopControlArea, Button, Search, Tag } from "@/components";
import { cssVariables } from "@/assets/styles/variables";
import styles from "./style.module.scss";
import PlusIcon from "@public/icons/plus-icon.svg";
import Highlighter from "react-highlight-words";
import { TagSimpleProps } from "@/Types";

export const Tags = ({
  postTags,
  reset,
  initTags,
}: {
  postTags: (tags: TagSimpleProps[]) => void;
  reset: boolean;
  initTags?: TagSimpleProps[];
}) => {
  const [selectedTags, setSelectedTags] = useState<TagSimpleProps[]>(
    initTags ? initTags : []
  );
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [fullMatch, setFullMatch] = useState(false);
  const [tags, setTags] = useState<TagSimpleProps[]>([]);

  const searchHandler = async (value: string) => {
    setSearchValue(value);
    if (value.length > 0) {
      const token = sessionStorage.getItem("auth");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_API}/tags?search=${value}`,
        {
          headers: {
            "Authorization": token!,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data.length > 0) {
            const props = ["id"];

            const filteredTags = data.data
              .filter(function (tag: TagSimpleProps) {
                return !selectedTags.some(function (t) {
                  return tag.id === t.id;
                });
              })
              .map(function (tag: TagSimpleProps) {
                return props.reduce(function (start, count) {
                  return tag;
                }, {});
              });
            setTags(filteredTags);
          } else {
            setTags(data.data);
          }
        });
    }
    if (value.length === 0) {
      setTags([]);
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectedTags([]);
      postTags([]);
      setTags([]);
    }
  }, [reset]);

  return (
    <>
      <div className={styles.tags}>
        <div className={styles.tags__header}>
          <span className={styles.tags__title}>
            Tags {selectedTags.length === 0 && `(at least one tag is `}{" "}
            <i>{"REQUIRED"}</i>
            {`)`}
          </span>
          {selectedTags.length > 0 && (
            <button
              onClick={() => {
                setSelectedTags([]);
                postTags([]);
                setTags([]);
              }}
              className={styles.tags__clear}
            >
              Clear All
            </button>
          )}
        </div>

        {selectedTags.length > 0 && (
          <div className={styles.tags__list}>
            {selectedTags.map((tag) => (
              <Tag
                key={tag.id}
                id={tag.id}
                name={tag.name}
                isRemovable
                onClick={() => {
                  const newArray = selectedTags.filter(
                    (item) => item.id !== tag.id
                  );
                  setSelectedTags(newArray);
                  postTags(newArray);
                }}
              />
            ))}
          </div>
        )}
        {selectedTags.length < 3 && (
          <Button
            type="medium"
            variant="text"
            color={cssVariables.blue500}
            onClick={() => setModal(true)}
          >
            <PlusIcon /> Add Tags
          </Button>
        )}
      </div>

      <div
        className={`${styles.tags__modal} ${
          modal ? styles.tags__modal_show : ""
        }`}
      >
        <TopControlArea back backHandler={() => setModal(false)}>
          <Button
            type="small"
            variant="filled"
            color={cssVariables.blue500}
            disabled={selectedTags.length < 1}
            onClick={() => {
              postTags(selectedTags);
              setModal(false);
            }}
          >
            Add Selected Tags
          </Button>
        </TopControlArea>
        <div className={styles.tags__modal_tags}>
          <div className={styles.tags__modal_tags_controls}>
            <span
              style={{
                color:
                  selectedTags.length < 3 ? "inherit" : cssVariables.blue500,
              }}
            >
              Added Tags {selectedTags.length}/3
            </span>
            {selectedTags.length > 0 && (
              <button
                onClick={() => {
                  setSelectedTags([]);
                  postTags([]);
                  setTags([]);
                }}
                className={styles.tags__clear}
              >
                Clear All
              </button>
            )}
          </div>
          {selectedTags.length > 0 && (
            <div className={styles.tags__modal_tags_list}>
              {selectedTags.map((tag) => (
                <Tag
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  isRemovable
                  onClick={() => {
                    const newArray = selectedTags.filter(
                      (item) => item !== tag
                    );
                    setSelectedTags(newArray);
                    postTags(newArray);
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <Search
          placeholder="Type a Tag"
          clear
          icon="/icons/search-icon.svg"
          onChange={searchHandler}
          disabled={selectedTags.length < 3 ? false : true}
          reset={searchValue ? false : reset ? true : true}
        />
        {searchValue && selectedTags.length < 3 && (
          <div className={styles.search__results}>
            {!fullMatch && (
              <div
                className={`${styles.search__results_item} ${styles.search__results_item_first}`}
                onClick={() => {
                  const newArray = [...selectedTags];

                  const token = sessionStorage.getItem("auth");
                  fetch(`${process.env.NEXT_PUBLIC_DEV_API}/tag`, {
                    headers: {
                      "Authorization": token!,
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                      name: searchValue,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      newArray.push(data.data);
                      setSelectedTags(newArray);
                      setSearchValue("");
                    });
                }}
              >
                <Image
                  src="/icons/plus-icon.svg"
                  width={18}
                  height={18}
                  alt="icon"
                />
                {searchValue}
              </div>
            )}

            {tags.map((tag) =>
              tag.name.toLowerCase().includes(searchValue.toLowerCase()) ? (
                <div
                  key={tag.id}
                  className={styles.search__results_item}
                  onClick={() => {
                    const newArray = [...selectedTags];

                    const token = sessionStorage.getItem("auth");
                    fetch(`${process.env.NEXT_PUBLIC_DEV_API}/tag`, {
                      headers: {
                        "Authorization": token!,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                      },
                      method: "POST",
                      body: JSON.stringify({
                        name: tag.name,
                      }),
                    });

                    newArray.push(tag);
                    setSelectedTags(newArray);
                    setTags([]);
                    setSearchValue("");
                  }}
                >
                  <Image
                    src="/icons/plus-icon.svg"
                    width={18}
                    height={18}
                    alt="icon"
                  />
                  <Highlighter
                    searchWords={[searchValue]}
                    autoEscape={true}
                    textToHighlight={tag.name}
                  />
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </>
  );
};
