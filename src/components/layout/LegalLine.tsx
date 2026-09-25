import { company, companyLabels, formatAddress } from "@/content/company.ts";
import { legal } from "@/content/en/legal.ts";
import { site } from "@/content/site.ts";
import { showSoon } from "@/lib/soon.ts";
import Soon from "@/components/ui/Soon.tsx";
import styles from "./LegalLine.module.css";

/**
 * The line UK companies carry in their footer, built from src/content/company.ts. A
 * clause whose detail is not known is left out whole, so no deployed build shows a gap.
 * The company number, which is coming, keeps its clause and is marked "Soon" where the
 * markers are on (src/lib/soon.ts).
 */
export default function LegalLine() {
  const {
    tradingName,
    legalName,
    placeOfRegistration,
    address,
    companyNumber,
    vatNumber,
  } = company;
  return (
    <p className={styles.legal}>
      <span>© {site.name}.</span>{" "}
      {legalName !== null && (
        <span>
          {tradingName} {legal.tradingNameOf} {legalName}
          {placeOfRegistration !== null &&
            `, ${legal.registeredIn} ${placeOfRegistration}`}
          {companyNumber !== null && `, ${legal.companyNumber} ${companyNumber}`}
          {companyNumber === null && showSoon && (
            <>
              , {legal.companyNumber} <Soon />
            </>
          )}
          .{" "}
        </span>
      )}
      {address !== null && (
        <span>
          {companyLabels.address}: {formatAddress(address)}.{" "}
        </span>
      )}
      {vatNumber !== null && (
        <span>
          {legal.vatNumber} {vatNumber}.
        </span>
      )}
    </p>
  );
}
