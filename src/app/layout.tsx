import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/config";
import Navbar from "@/components/navbar";

export const runtime = "edge";
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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "w-full h-full")}>
        <Providers>
          <NextTopLoader color="BlueViolet" showSpinner={false} zIndex={1000} />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
