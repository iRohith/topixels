import { LogInButton, LogOutButton } from "@/components/supabase-ui-tools";
import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <>
      <LogInButton>
        <Button>Log in to github Protected</Button>
      </LogInButton>
      <LogOutButton>
        <Button>Log out from github Protected</Button>
      </LogOutButton>
    </>
  );
}
