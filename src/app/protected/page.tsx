"use client";

import { Button } from "@/components/ui/button";
import { redirectToLogOut } from "../login/server-actions";

export default function Page() {
  return (
    <Button onClick={() => redirectToLogOut()}>
      Log out from github (Protected)
    </Button>
  );
}
