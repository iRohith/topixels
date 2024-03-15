"use client";

import { Button } from "@/components/ui/button";
import { redirectToLoginPage } from "../server-actions";

export default function LoginUI({ redirectUrl }: { redirectUrl?: string }) {
  return (
    <Button onClick={() => redirectToLoginPage("github", redirectUrl)}>
      Log In with github
    </Button>
  );
}
