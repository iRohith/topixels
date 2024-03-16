"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function isAdmin() {
  return false;
}

export async function isLoggedIn() {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!error && session && session.user) {
    return true;
  } else return false;
}
