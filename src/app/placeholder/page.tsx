"use client";
import { TopControlArea, End } from "@/components";

export default function Placeholder() {
  console.log(new Date("2024-06-21 08:18:31"));

  return (
    <>
      <TopControlArea back />
      <End text="This is a placeholder page" icon="/icons/eye-icon-large.svg" />
    </>
  );
}
