import Link from "next/link";

export default async function Page() {
  return (
    <Link prefetch={false} href="/api/logout">
      Log out from github Protected
    </Link>
  );
}
