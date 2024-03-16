"use client";

import { Button } from "@/components/ui/button";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import React, { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";

function LogInButtonInternal({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: React.ReactNode;
}) {
  const [supabase] = useState(createPagesBrowserClient());
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectUrl = `${pathname}${
    searchParams.toString() !== "" ? `?${searchParams.toString()}` : ""
  }`;

  const handleGitHubLogin = async () => {
    const oauthRedirectUrl = `${window.location.origin}/api/auth/callback`;

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!error && session) {
      window.location.pathname = redirectUrl ?? "/";
    }

    if (!redirectUrl.startsWith("/login"))
      Cookies.set("redirect", redirectUrl, { sameSite: "strict" });

    const { error: e } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: oauthRedirectUrl,
      },
    });

    console.log(oauthRedirectUrl);

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

function LogOutButtonInternal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectUrl = `${pathname}${
    searchParams.toString() !== "" ? `?${searchParams.toString()}` : ""
  }`;
  const [supabase] = useState(createPagesBrowserClient());

  const handleLogOut = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      window.location.pathname = redirectUrl ?? "/";
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }

    window.location.pathname = redirectUrl ?? "/";
  };

  return (
    <Button asChild onClick={handleLogOut}>
      {children}
    </Button>
  );
}

export function LogInButton({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: React.ReactNode;
}) {
  return (
    <Suspense fallback={children}>
      <LogInButtonInternal loading={loading}>{children}</LogInButtonInternal>
    </Suspense>
  );
}

export function LogOutButton({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <LogOutButtonInternal>{children}</LogOutButtonInternal>
    </Suspense>
  );
}

export function LoginConditional({
  signedInComponent,
  signedOutComponent,
}: {
  signedInComponent?: React.ReactNode;
  signedOutComponent?: React.ReactNode;
}) {
  const [supabase] = useState(createPagesBrowserClient());
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const func = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || !session || !session.user) setSignedIn(false);
      else setSignedIn(true);
    };
    func();
  }, [supabase, setSignedIn]);

  return signedIn ? signedInComponent : signedOutComponent;
}
