import { Button, buttonVariants } from "@/components/ui/button";
import { APP_NAME } from "@/lib/config";
import { cn } from "@/lib/utils";
import { ChevronRight, Compass, Flame, Github, Navigation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BackImg from "../../public/bg.jpg";
import { LogInButton, LoginConditional } from "@/components/supabase-ui-tools";

const perks = [
  {
    name: "Ignite Creative Brilliance",
    description:
      "Unleash your artistic vision with the perfect blend of your imagination and our AI, generating truly distinctive creations.",
    icon: Flame,
  },
  {
    name: "Effortless Mastery, Instant Impact",
    description:
      "Effortlessly navigate our platform, mastering the art of content creation swiftly and efficiently for instant and impactful results.",
    icon: Navigation,
  },
  {
    name: "Pioneer Your Creative Frontier",
    description:
      "Propel your creative journey into uncharted territories—conceptualize, refine, and innovate with unprecedented speed, all at your fingertips.",
    icon: Compass,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center relative -top-10">
      <section
        id="intro"
        className="relative flex flex-col lg:h-screen items-center justify-center lg:flex-row mt-20 w-full"
      >
        <div className="py-20 text-center flex flex-col items-center max-w-3xl">
          <h1 className="flex flex-col text-4xl font-bold tracking-tight">
            Your destination for{" "}
            <span className="text-primary">Image/Video Generative AI</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to{" "}
            <Link href="/" className="text-primary font-bold">
              <span>{APP_NAME}</span>
            </Link>
            ! Transform your ideas into captivating visuals effortlessly.
            Explore endless possibilities of open source AI workflows with our
            user-friendly platform
          </p>
          <div>
            <LoginConditional
              signedInComponent={
                <Link
                  href="/tools"
                  className={cn(
                    buttonVariants(),
                    "flex flex-row min-w-fit mt-6"
                  )}
                >
                  Generate
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              }
              signedOutComponent={
                <LogInButton loading={<div>Loading</div>}>
                  <Button className="mt-6">
                    <Github size={24} className="mr-2" />
                    Log In
                  </Button>
                </LogInButton>
              }
            />
          </div>
        </div>
        <Image
          src={BackImg}
          alt="Background image"
          priority={true}
          className="w-auto h-[70vh] image-wrapper"
        />
      </section>
      <section className="border-gray-200">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 py-20">
          {perks.map((perk) => (
            <div
              key={perk.name}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
            >
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100/50 dark:bg-blue-100/10">
                  {<perk.icon className="w-1/3 h-1/3" />}
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h2 className="text-base font-medium ">{perk.name}</h2>
                <p className="mt-3 text-small text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
