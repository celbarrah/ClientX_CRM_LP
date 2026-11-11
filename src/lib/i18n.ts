import * as fr from "./content";
import * as en from "./content.en";
import type { Lang } from "./lang";

export type { Lang } from "./lang";

/** Same shape with literal types widened, so the English file can hold different words (keys stay exact). */
export type Widen<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T extends fr.SectorKey | fr.ModuleKey
    ? T
    : T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends readonly (infer U)[]
          ? readonly Widen<U>[]
          : T extends object
            ? { [K in keyof T]: Widen<T[K]> }
            : T;

/** Every export of content.ts; content.en.ts must provide all of them (checked by TypeScript). */
export type Copy = { [K in keyof typeof fr]: Widen<(typeof fr)[K]> };

const EN: Copy = en;

/** Page text in the visitor's language. */
export const copy = (lang: Lang = "fr"): Copy => (lang === "en" ? EN : fr);

/** Home page of each language. */
export const homeOf = (lang: Lang) => (lang === "en" ? "/en" : "/");
