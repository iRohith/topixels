import { ChevronRight, Github } from "lucide-react";
import { DarkModeToggle } from "./dark-mode-toggle";
import { Logo } from "./logo";
import MaxWidthWrapper from "./max-width-wrapper";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogInButton, LoginConditional } from "./supabase-ui-tools";

export default function Navbar() {
  return (
    <div className="w-full h-16 sticky z-50 inset-x-0 backdrop-blur-md bg-black/20 flex items-center border-b">
      <header className="w-full">
        <MaxWidthWrapper className="flex flex-row">
          <Logo />
          <div className="px-0 md:px-4 justify-end w-full flex flex-row items-center gap-4 mr-4">
            <DarkModeToggle />
            <LoginConditional
              signedInComponent={
                <Link
                  href="/generate"
                  className={cn(
                    buttonVariants(),
                    "flex-row min-w-fit hidden md:flex"
                  )}
                >
                  Generate
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              }
              signedOutComponent={
                <LogInButton loading={<div>Loading</div>}>
                  <Button>
                    <Github size={24} className="mr-2" />
                    Log In
                  </Button>
                </LogInButton>
              }
            />
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
