import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <Link href="/api/logout" className={buttonVariants()}>
      Log out
    </Link>
  );
}
