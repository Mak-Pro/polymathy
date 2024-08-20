"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, JobPost, End, Preloader, Button } from "@/components";
import { useTelegram } from "@/providers/telegram";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./style.module.scss";

type CategoryType = "customer" | "performer";

interface JobPostsProps {
  filter?: boolean;
  title?: string;
  individual?: boolean;
}

const limit = 10;

const getData = async (
  page: number | string,
  search?: string,
  sort?: "asc" | "desc",
  type?: CategoryType,
  individual?: boolean
) => {
  let res = null;
  try {
    if (individual && typeof window !== undefined) {
      const token = sessionStorage.getItem("auth");
      res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_API}/posts?page=${page}&search=${search}&sort=${sort}&type=${type}`,
        {
          headers: {
            "Authorization": token!,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          method: "GET",
        }
      );
    } else {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_API}/posts?page=${page}&search=${search}&sort=${sort}`
      );
    }
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Failed to fetch posts");
    }
  }
};

export const JobPosts = ({ filter, title, individual }: JobPostsProps) => {
  const { webApp, user } = useTelegram();

  webApp?.ready();
  webApp?.expand();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [category, setCategory] = useState<CategoryType>("customer");

  const fetchPosts = async (category: CategoryType) => {
    setPage(1);
    setLoading(true);
    const data = await getData(1, searchValue, sort, category, individual);
    if (data && data.data && data.data.list) {
      const {
        success,
        data: { has_more, list },
      } = data;
      setPosts(list);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (individual && typeof window !== undefined) {
      if (sessionStorage.getItem("tempCategory")) {
        setCategory(sessionStorage.getItem("tempCategory") as CategoryType);
        fetchPosts(sessionStorage.getItem("tempCategory") as CategoryType);
      } else {
        sessionStorage.setItem("tempCategory", category);
        fetchPosts(category);
      }
    } else {
      fetchPosts("customer");
    }
  }, [category]);

  const fetchNewPosts = async () => {
    const data = await getData(
      page + 1,
      searchValue,
      sort,
      category,
      individual
    );
    if (data && data.data && data.data.list && data.data.list.length > 0) {
      setPage((p) => (p += 1));
      setTimeout(() => {
        setPosts([...posts, ...data.data.list]);
      }, 200);
      setHasMore(data.data.has_more);
    }
  };

  useEffect(() => {}, [page]);

  const handleSearch = async (value: string) => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    setPage(1);
    setSearchValue(value);
    setHasMore(false);
    setNotFound(false);
    const data = await getData(1, value, sort, "customer");
    if (data && data.data && data.data.list) {
      setPosts(data.data.list);
      setHasMore(data.data.has_more);
    }
    if (data && data.data && data.data.list.length === 0) {
      setNotFound(true);
    }
  };

  const handleSort = async () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    setPage(1);
    setHasMore(false);
    setNotFound(false);
    sort === "asc" ? setSort("desc") : setSort("asc");
    const data = await getData(
      1,
      searchValue,
      sort === "asc" ? "desc" : "asc",
      "customer",
      individual
    );
    if (data && data.data && data.data.list) {
      setTimeout(() => {
        setPosts(data.data.list);
        setHasMore(data.data.has_more);
      }, 200);
    }
  };

  const toggleCategory = () => {
    setCategory((category) =>
      category === "customer" ? "performer" : "customer"
    );
    sessionStorage.setItem(
      "tempCategory",
      category === "customer" ? "performer" : "customer"
    );
  };

  return (
    <>
      <div className={styles.jobposts}>
        {filter && (
          <div className={styles.jobposts__header_actions}>
            <Search
              placeholder="Search Jobs"
              icon="/icons/search-icon.svg"
              clear
              onChange={(value) => handleSearch(value)}
            />
            <button
              type="button"
              className={styles.jobposts_sort}
              onClick={() => {
                !notFound && handleSort();
              }}
            >
              <Image
                src="/icons/sort-icon.svg"
                width={28}
                height={28}
                alt="sort"
              />
            </button>
          </div>
        )}
        <div className={styles.jobposts__header}>
          {category && individual ? (
            <h2 className="page__title">
              {category === "customer" ? "Your Job Posts" : "Your Job Requests"}
            </h2>
          ) : (
            <h2 className="page__title">{title ? title : "Job Posts"}</h2>
          )}
        </div>
        <div className={styles.jobposts__body}>
          {Array.isArray(posts) && posts.length > 0 && (
            <InfiniteScroll
              className={styles.jobposts__list}
              dataLength={posts.length}
              next={fetchNewPosts}
              hasMore={hasMore}
              loader={
                <div
                  style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    zIndex: 10,
                    width: "100%",
                    height: 540,
                  }}
                >
                  <Preloader />
                </div>
              }
              endMessage={
                <div className={styles.jobposts__footer}>
                  <End
                    text={
                      !individual
                        ? "You have viewed all Job Posts that are available at the moment"
                        : category === "customer"
                        ? "You have viewed all Job Posts that are available at the moment"
                        : "You have viewed all Job Requests that are available at the moment"
                    }
                    icon="/icons/eye-icon-large.svg"
                  />
                </div>
              }
            >
              {posts.map((post) => (
                <JobPost
                  key={post.id}
                  {...post}
                  outerHref={category === "performer" ? `/${post.id}` : ""}
                />
              ))}
            </InfiniteScroll>
          )}

          {!loading && posts.length === 0 && !notFound && (
            <End
              text={
                !individual
                  ? "You don't have any posts created yet."
                  : category === "customer"
                  ? "You don't have any posts created yet."
                  : "You don't have any requests created yet."
              }
              icon="/icons/eye-large-icon.svg"
            />
          )}

          {loading && <Preloader />}

          {notFound && (
            <End text="No posts found" icon="/icons/eye-icon-large.svg" />
          )}
        </div>
      </div>
      {individual && (
        <nav className={styles.jobposts__nav}>
          <button
            className={`${styles.jobposts__nav_btn} ${
              category === "customer" ? styles.jobposts__nav_btn_active : ""
            }`}
            onClick={toggleCategory}
          >
            Job Posts
          </button>
          <button
            className={`${styles.jobposts__nav_btn} ${
              category === "performer" ? styles.jobposts__nav_btn_active : ""
            }`}
            onClick={toggleCategory}
          >
            Job Requests
          </button>
        </nav>
      )}
    </>
  );
};
