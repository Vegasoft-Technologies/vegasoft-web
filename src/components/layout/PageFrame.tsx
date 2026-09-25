import type { Language } from "@/content/routes.ts";
import SiteFooter from "./SiteFooter.tsx";
import SiteHeader from "./SiteHeader.tsx";
import SkipLink from "./SkipLink.tsx";

type PageFrameProps = {
  language: Language;
  /** This page in both languages, so the header's switch lands on the same page. */
  paths: Record<Language, string>;
  children: React.ReactNode;
};

/** The skip link, the header and the footer around a page. */
export default function PageFrame({ language, paths, children }: PageFrameProps) {
  return (
    <>
      <SkipLink language={language} />
      <SiteHeader language={language} paths={paths} />
      {children}
      <SiteFooter language={language} />
    </>
  );
}
