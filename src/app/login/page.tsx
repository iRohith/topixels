import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LoginUI from "./components/login-ui";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const redirectUrl = searchParams?.redirect ?? "/";
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!error && user) {
    redirect(redirectUrl);
  }

  return <LoginUI redirectUrl={redirectUrl} />;
}
