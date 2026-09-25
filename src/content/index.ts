// The site's words, by language. The English object gives the shape; the Turkish one is
// held to it, so a missing or an extra key is a type error rather than a gap on a page.

import { content as en } from "./en/index.ts";
import { content as tr } from "./tr/index.ts";
import type { Language } from "./routes.ts";

export type Content = typeof en;

export const content: Record<Language, Content> = { en, tr };

/** Every word of the site in one language. */
export function contentFor(language: Language): Content {
  return content[language];
}
