import { company, formatAddress } from "@/content/company.ts";
import { contentFor } from "@/content/index.ts";
import type { Language } from "@/content/routes.ts";
import { site } from "@/content/site.ts";
import { fill } from "@/lib/fill.tsx";
import { showSoon } from "@/lib/soon.ts";
import Soon from "@/components/ui/Soon.tsx";
import styles from "./LegalLine.module.css";

/**
 * The line a UK company carries in its footer, built from src/content/company.ts. Each
 * language writes the sentence in its own order; a clause whose detail is not known is
 * left out whole, so no deployed build shows a gap. The company number, which is coming,
 * keeps its clause and is marked where the markers are on (src/lib/soon.ts).
 */
export default function LegalLine({ language }: { language: Language }) {
  const { legal } = contentFor(language);
  const {
    tradingName,
    legalName,
    placeOfRegistration,
    address,
    companyNumber,
    vatNumber,
  } = company;
  const place =
    placeOfRegistration === null
      ? null
      : (legal.placeNames[placeOfRegistration] ?? placeOfRegistration);
  const showNumber = companyNumber !== null || showSoon;
  return (
    <p className={styles.legal}>
      {fill(legal.copyright, { trading: site.name })}{" "}
      {legalName !== null &&
        place !== null &&
        (showNumber
          ? fill(legal.companyWithNumber, {
              trading: tradingName,
              legal: legalName,
              place,
              number: companyNumber ?? <Soon language={language} />,
            })
          : fill(legal.company, { trading: tradingName, legal: legalName, place }))}{" "}
      {address !== null && fill(legal.office, { address: formatAddress(address) })}{" "}
      {vatNumber !== null && fill(legal.vat, { number: vatNumber })}
    </p>
  );
}
