import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function LoginUI({ redirectUrl }: { redirectUrl?: string }) {
  const loginUrl = `/api/login?provider=github&redirect=${redirectUrl ?? "/"}`;
  return (
    <Link href={loginUrl} className={buttonVariants()}>
      Log In
    </Link>
  );
}
