import { TopControlArea, Spacer, InviteAndEarn } from "@/components";

export default function InvitePage() {
  return (
    <>
      <TopControlArea back />
      <Spacer desktop={16} mobile={16} />
      <h2 className="page__title">Invite and Earn</h2>
      <Spacer desktop={6} mobile={6} />
      <InviteAndEarn />
    </>
  );
}
