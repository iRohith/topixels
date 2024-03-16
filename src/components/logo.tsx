import { APP_NAME } from "@/lib/config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  imgClassName,
  textClassName,
}: Readonly<{ imgClassName?: string; textClassName?: string }>) => {
  return (
    <Link
      href="/"
      className="flex flex-row items-center min-w-fit mx-0 md:mx-8"
    >
      <Image
        src="/logo.svg"
        alt="Logo"
        width={512}
        height={512}
        className={cn("w-20 h-20", imgClassName)}
      />
      <span
        className={cn(
          "font-bold text-xl md:text-3xl text-primary",
          textClassName
        )}
      >
        {APP_NAME}
      </span>
    </Link>
  );
};
