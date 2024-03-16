import { isAdmin, isLoggedIn } from "@/server/user";
import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CookieOptions {
  expires?: Date;
  path?: string;
  domain?: string;
}

function makeCookieStorage(options: CookieOptions = {}) {
  return {
    getItem: function (key: string): string | null {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(encodedKey))
        ?.split("=")[1];
      return encodedValue ? decodeURIComponent(encodedValue) : null;
    },
    setItem: function (key: string, value: string): void {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      let cookieString = `${encodedKey}=${encodedValue}`;
      if (options.expires) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
      if (options.path) {
        cookieString += `; path=${options.path}`;
      }
      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }
      document.cookie = cookieString + "; SameSite=strict";
    },
    removeItem: function (key: string): void {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent("");
      let cookieString = `${encodedKey}=${encodedValue}`;
      cookieString += `; expires=${new Date(0).toUTCString()}`;
      if (options.path) {
        cookieString += `; path=${options.path}`;
      }
      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }
      document.cookie = cookieString;
    },
  };
}

interface ThemeState {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

const crossSubDomainCookieStore = makeCookieStorage({
  domain: process.env.ROOT_DOMAIN,
  expires: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
});
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme: "dark" | "light") => set({ theme: theme }),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => crossSubDomainCookieStore),
    }
  )
);

interface UserState {
  isAdmin: boolean;
  loggedIn: boolean;
  init: () => void;
}

export const useIsAdminStore = create<UserState>((set) => ({
  isAdmin: false,
  loggedIn: false,
  init: async () => {
    set({ isAdmin: await isAdmin(), loggedIn: await isLoggedIn() });
  },
}));
