import Navbar from "@/components/navbar";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_NAME} | Create Images and Videos using AI`,
  description: "Create Images and Videos using generative AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full h-full">
      <body className={cn(inter.className, "w-full h-full")}>
        <Providers>
          <NextTopLoader color="BlueViolet" showSpinner={false} zIndex={1000} />
          <Navbar />
          <div className="w-full h-full pt-20">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
