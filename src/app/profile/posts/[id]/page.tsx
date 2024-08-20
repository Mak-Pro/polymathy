"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { JobPostDetails, TopControlArea, Button } from "@/components";
import { JobPostDetailsProps } from "@/Types";
import { cssVariables } from "@/assets/styles/variables";

export default function PostDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [postDetails, setPostdetails] = useState<JobPostDetailsProps | null>(
    null
  );
  useEffect(() => {
    if (typeof window !== undefined) {
      const token = sessionStorage.getItem("auth");
      fetch(`${process.env.NEXT_PUBLIC_DEV_API}/post/${id}`, {
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
      <TopControlArea back>
        <Button type="small" variant="text" color={cssVariables.blue500}>
          <Link href={`/profile/posts/${id}/edit`}>link</Link>
          Edit Job Post
        </Button>
      </TopControlArea>
      {postDetails && <JobPostDetails {...postDetails} individual />}
    </>
  );
}
