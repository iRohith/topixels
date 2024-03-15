"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function redirectToLoginPage(
  provider: "google" | "github",
  redirectUrl?: string
) {
  const loginUrl = `/api/login?provider=${provider}&redirect=${encodeURIComponent(
    redirectUrl ?? "/"
  )}`;
  redirect(loginUrl);
}

export async function logOut(redirectUrl?: string) {
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signOut();
  redirect(`/login?redirect=${encodeURIComponent(redirectUrl ?? "/")}`);
}
