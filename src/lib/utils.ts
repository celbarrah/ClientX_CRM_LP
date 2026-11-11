import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Section anchors ("#tarifs") point back to the home page when used on another page. */
export const navHref = (href: string, home: boolean) => (!home && href.startsWith("#") ? `/${href}` : href);
