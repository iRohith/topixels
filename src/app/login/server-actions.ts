"use server";

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
