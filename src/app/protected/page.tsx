"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../login/server-actions";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  return (
    <Button
      onClick={() =>
        logOut(
          `/protected${
            searchParams
              ? `?${new URLSearchParams(searchParams).toString()}`
              : ""
          }`
        )
      }
    >
      Log out from github Protected
    </Button>
  );
}
