"use client";

import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/lib/state/common";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function DarkModeToggle() {
  const { theme, setTheme } = useThemeStore((state) => state);
  const { setTheme: setThemeSystem } = useTheme();

  useEffect(() => {
    setThemeSystem(theme);
  }, [theme, setThemeSystem]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setTheme(theme == "dark" ? "light" : "dark");
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
