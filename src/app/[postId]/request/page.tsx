import { JobPostSubmit, TopControlArea } from "@/components";

export default function PostRequestPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  return (
    <>
      <TopControlArea back />
      <JobPostSubmit id={postId} />
    </>
  );
}
