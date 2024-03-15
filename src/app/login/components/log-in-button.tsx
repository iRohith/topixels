"use client";

import { Button } from "@/components/ui/button";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

export function LogInButton({
  provider,
  redirectUrl,
  children,
}: {
  provider: "google" | "github";
  children: React.ReactNode;
  redirectUrl?: string;
}) {
  const supabase = createPagesBrowserClient();

  const handleGitHubLogin = async () => {
    let oauthRedirectUrl = `${window.location.origin}/api/auth/callback`;
    let localRedirectUrl =
      new URL(window.location.href).searchParams.get("redirect") ?? "/";

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!error && session) {
      window.location.pathname = redirectUrl ?? "/";
    }

    const { error: e } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${oauthRedirectUrl}?redirect=${encodeURIComponent(
          localRedirectUrl
        )}&`,
      },
    });

    if (e) {
      console.log({ error });
    }
  };

  return (
    <Button asChild onClick={handleGitHubLogin}>
      {children}
    </Button>
  );
}
