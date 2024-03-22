"use client";

import { LogInButton, LogOutButton } from "@/components/supabase-ui-tools";
import { Button } from "@/components/ui/button";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export default async function Page() {
  const supabase = createPagesBrowserClient();
  supabase.auth.getSession().then((s) => {
    if (s.data) console.log(s.data.session?.access_token);
  });
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
