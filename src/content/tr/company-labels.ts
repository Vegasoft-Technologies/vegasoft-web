// src/content/company.ts içindeki şirket bilgilerinin etiketleri. Değerler diller
// arasında ortaktır, bu sözcükler değildir.

import type { CompanyDetails } from "../company.ts";

export const companyLabels: Record<keyof CompanyDetails, string> = {
  tradingName: "Ticari ad",
  legalName: "Yasal ad",
  placeOfRegistration: "Kayıt yeri",
  address: "Kayıtlı ofis",
  location: "Konum",
  companyNumber: "Şirket numarası",
  vatNumber: "KDV numarası",
  serviceArea: "Yerinde çalışılan bölge",
  founded: "Kuruluş",
  social: "Profiller",
  supportHours: "Destek saatleri",
};
