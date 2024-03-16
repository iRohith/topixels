import { LogInButton } from "@/components/supabase-ui-tools";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies();
  const redirectUrl = cookieStore.get("redirect")?.value ?? "/";
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!error && user && !redirectUrl.startsWith("/login")) {
    redirect(redirectUrl);
  } else if (redirectUrl.startsWith("/login")) {
    redirect("/");
  }

  return (
    <LogInButton>
      <Button>Log In with github</Button>
    </LogInButton>
  );
}
