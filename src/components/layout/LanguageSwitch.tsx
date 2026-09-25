import { languageNames, otherLanguage, type Language } from "@/content/routes.ts";
import styles from "./LanguageSwitch.module.css";

type LanguageSwitchProps = {
  language: Language;
  /** The page being read, in both languages. */
  paths: Record<Language, string>;
};

/**
 * A link to the same page in the other language. It is a plain link rather than a
 * client-side one, because the two languages have different root layouts and the
 * document's language has to change with the page.
 */
export default function LanguageSwitch({ language, paths }: LanguageSwitchProps) {
  const other = otherLanguage(language);
  const names = languageNames[other];
  return (
    <a
      className={styles.switch}
      href={paths[other]}
      hrefLang={names.hrefLang}
      lang={names.htmlLang}
      aria-label={names.name}
    >
      {names.code}
    </a>
  );
}
