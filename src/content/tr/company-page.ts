// Şirket bilgileri sayfasındaki her sözcük. Satırlar src/content/company.ts dosyasından,
// e-posta adresi ile telefon numarası src/content/site.ts dosyasından gelir.

import type { CompanyRow } from "../en/company-page.ts";

export const companyPage = {
  meta: {
    title: "Şirket bilgileri",
    description: "Vegasoft Technologies şirket bilgileri.",
  },
  title: "Şirket bilgileri",
  lead: "Bu web sitesinin arkasındaki işletmenin bilgileri.",
  emailLabel: "E-posta",
  phoneLabel: "Telefon",
  /** Şirket numarasının doğrulandığı resmî sicil. */
  registerUrl: "https://find-and-update.company-information.service.gov.uk/company/",
  /** Gösterilen satırlar, sırasıyla. */
  rows: [
    "tradingName",
    "legalName",
    "placeOfRegistration",
    "companyNumber",
    "address",
    "email",
    "phone",
    "vatNumber",
  ] satisfies CompanyRow[],
};
