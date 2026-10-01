// Şirket bilgileri sayfasındaki her sözcük. Satırlar src/content/company.ts dosyasından,
// e-posta adresi ile telefon numarası src/content/site.ts dosyasından gelir.

import type { CompanyRow } from "../en/company-page.ts";

export const companyPage = {
  meta: {
    title: "Şirket bilgileri",
    description:
      "Bu web sitesinin arkasındaki işletme: ticari ad, yasal ad, şirket türü, kayıt yeri, kayıtlı ofis ve bize ulaşmanın yolları burada.",
  },
  title: "Şirket bilgileri",
  lead: "Bu web sitesinin arkasındaki işletmenin bilgileri.",
  emailLabel: "E-posta",
  phoneLabel: "Telefon",
  /** Şirket türü, bu dilde. Bilginin kendisi company.ts dosyasındadır. */
  companyType: "Paylarla sınırlı özel şirket (private company limited by shares)",
  /** Şirket numarasının doğrulandığı resmî sicil. */
  registerUrl: "https://find-and-update.company-information.service.gov.uk/company/",
  /** Gösterilen satırlar, sırasıyla. */
  rows: [
    "tradingName",
    "legalName",
    "companyType",
    "placeOfRegistration",
    "companyNumber",
    "address",
    "email",
    "phone",
    "vatNumber",
  ] satisfies CompanyRow[],
};
