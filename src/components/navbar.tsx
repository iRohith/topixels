import { ChevronRight, Github } from "lucide-react";
import { DarkModeToggle } from "./dark-mode-toggle";
import { Logo } from "./logo";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogInButton, LoginConditional } from "./supabase-ui-tools";
import NavDesktop from "./nav-desktop";

export default function Navbar() {
  return (
    <div className="w-full h-20 fixed top-0 left-0 z-50 inset-x-0 backdrop-blur-md bg-black/20 flex items-center justify-center border-b md:px-[10vw]">
      <header className="w-full">
        <div className="flex flex-row">
          <Logo />
          <div className="px-0 md:px-4 w-full flex flex-row items-center gap-4 mr-4">
            <NavDesktop />
          </div>
          <div className="px-0 md:px-4 justify-end w-full flex flex-row items-center gap-4 mr-4">
            <DarkModeToggle />
            <LoginConditional
              signedInComponent={
                <Link
                  href="/tools"
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
                <LogInButton>
                  <Button>
                    <Github size={24} className="mr-2" />
                    Log In
                  </Button>
                </LogInButton>
              }
            />
          </div>
        </div>
      </header>
    </div>
  );
}
