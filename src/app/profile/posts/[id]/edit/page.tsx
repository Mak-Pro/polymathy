"use client";
import { useEffect, useState } from "react";
import { JobPostEdit } from "@/components";
import { JobPostEditProps } from "@/Types";

export default function PostDetailEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [postDetails, setPostdetails] = useState<JobPostEditProps | null>(null);
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
          const detailsData = {
            id: data.data.id,
            name: data.data.name,
            price: data.data.price,
            description: data.data.description,
            tags: data.data.tags,
          };
          setPostdetails(detailsData);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  return <>{postDetails && <JobPostEdit {...postDetails} />}</>;
}
