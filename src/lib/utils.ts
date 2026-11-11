import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Lang } from "./lang";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Section anchors ("#tarifs") point back to the home page of the same language when used on another page. */
export const navHref = (href: string, home: boolean, lang: Lang = "fr") =>
  !home && href.startsWith("#") ? `${lang === "en" ? "/en" : "/"}${href}` : href;
