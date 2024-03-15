import { supabase } from "@/lib/supabase/client";
import LoginUI from "./components/login-ui";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const redirectUrl = searchParams?.redirect ?? "/";

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!error && user) {
    redirect(redirectUrl);
  }

  return <LoginUI redirectUrl={redirectUrl} />;
}
