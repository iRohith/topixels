import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lstrip(str: string, chars: string = "\\s"): string {
  const regex = new RegExp(`^[${chars}]+`, "g");
  return str.replace(regex, "");
}

export function rstrip(str: string, chars: string = "\\s"): string {
  const regex = new RegExp(`[${chars}]+$`, "g");
  return str.replace(regex, "");
}

export function lrstrip(str: string, chars: string = "\\s") {
  return lstrip(rstrip(str, chars), chars);
}
