import { Button } from "@/components/ui/button";
import { LogOutButton } from "../login/components/log-out-button";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const redirectUrl = new URLSearchParams(searchParams).toString();

  return (
    <LogOutButton
      redirectUrl={
        redirectUrl.length === 0
          ? "/protected"
          : "/protected?" + encodeURIComponent(redirectUrl)
      }
    >
      <Button>Log out from github Protected</Button>
    </LogOutButton>
  );
}
