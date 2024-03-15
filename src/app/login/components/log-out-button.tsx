"use client";

import { Button } from "@/components/ui/button";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

export function LogOutButton({
  redirectUrl,
  children,
}: {
  children: React.ReactNode;
  redirectUrl?: string;
}) {
  const supabase = createPagesBrowserClient();

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
