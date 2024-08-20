"use client";
import { useEffect, useState } from "react";
import { JobPostDetails, TopControlArea } from "@/components";
import { JobPostDetailsProps } from "@/Types";

export default function PostDetailPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const [postDetails, setPostdetails] = useState<JobPostDetailsProps | null>(
    null
  );
  useEffect(() => {
    if (typeof window !== undefined) {
      const token = sessionStorage.getItem("auth");
      fetch(`${process.env.NEXT_PUBLIC_DEV_API}/posts/show?post_id=${postId}`, {
        headers: {
          "Authorization": token!,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPostdetails(data.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  return (
    <>
      <TopControlArea back />
      {postDetails && <JobPostDetails {...postDetails} />}
    </>
  );
}
