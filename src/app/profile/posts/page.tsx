"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components";
import { JobPosts, TopControlArea } from "@/components";
import { cssVariables } from "@/assets/styles/variables";

export default function PostsPage() {
  const router = useRouter();
  return (
    <>
      <TopControlArea back backHandler={() => router.replace("/profile")}>
        <Button type="small" variant="filled" color={cssVariables.blue500}>
          <Link href="/create">link</Link>
          Create a Job Post for 3
          <Image src="/icons/ticket.svg" width={12} height={12} alt="coin" />
        </Button>
      </TopControlArea>
      <JobPosts title="Your Job Posts" individual />
    </>
  );
}
