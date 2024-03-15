"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { LogInButton } from "./log-in-button";

export default function LoginUI({ redirectUrl }: { redirectUrl?: string }) {
  return (
    <LogInButton provider="github" redirectUrl={redirectUrl}>
      <Button>Log In with github</Button>
    </LogInButton>
  );
}
