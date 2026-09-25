// Üst ve alt bilgideki bağlantılar ile yardımcı teknolojinin okuduğu metinler. Her adres
// src/content/routes.ts dosyasından gelir.

import { anchorHref, pagePath } from "../routes.ts";
import type { NavLink } from "../en/navigation.ts";

export const navigation = {
  mainNav: [
    { label: "Hizmetler", href: anchorHref("services", "tr") },
    { label: "Hakkımızda", href: pagePath("about", "tr") },
    { label: "İletişim", href: pagePath("contact", "tr") },
  ] satisfies NavLink[],
  footer: {
    tagline: "Tekrar eden işler için yazılım, veri ve yapay zekâ.",
    servicesTitle: "Hizmetler",
    companyTitle: "Şirket",
    contactTitle: "İletişim",
    companyLinks: [
      { label: "Hakkımızda", href: pagePath("about", "tr") },
      { label: "Nasıl çalışıyoruz", href: anchorHref("how-we-work", "tr") },
      { label: "Nasıl fiyatlandırıyoruz", href: anchorHref("pricing", "tr") },
      { label: "Sorular", href: anchorHref("questions", "tr") },
      { label: "İletişim", href: pagePath("contact", "tr") },
      { label: "Şirket bilgileri", href: pagePath("company", "tr") },
    ] satisfies NavLink[],
    /** Yolda olan sayfalar. Yerleri, işaretler açıkken görünür. */
    companySoon: ["Gizlilik bildirimi", "Çalışma şartları"],
  },
  /** Yardımcı teknolojinin okuduğu metinler ve iki işaret. */
  labels: {
    skipLink: "İçeriğe geç",
    mainNav: "Ana",
    homeLink: "Vegasoft Technologies, ana sayfa",
    /** Yolda olan bir bilgi veya sayfa için. */
    soon: "Yakında",
    /** Henüz onaylanmamış bir cümlenin önünde. */
    draft: "Taslak, henüz onaylanmadı:",
  },
};
