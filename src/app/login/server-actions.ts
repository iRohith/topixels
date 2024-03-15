"use server";

import { RedirectType, redirect } from "next/navigation";

export async function redirectToLoginPage(
  provider: "google" | "github",
  redirectUrl?: string
) {
  const loginUrl = `/api/login?provider=${provider}&redirect=${encodeURIComponent(
    redirectUrl ?? "/"
  )}`;
  redirect(loginUrl);
}

export async function redirectToLogOut() {
  redirect("/api/logout", RedirectType.push);
}
