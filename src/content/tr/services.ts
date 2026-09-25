// Hizmet sayfasında, hizmet kataloğunda zaten bulunmayan sözcükler. Sayfanın kendisi
// src/content/tr/areas.ts dosyasından (alanın adı, vaadi, kimler için olduğu, hizmetleri
// ve örneği) ve ana sayfadaki sorunlardan kurulur.

import { anchorHref, pagePath } from "../routes.ts";

export const servicePage = {
  audienceLabel: "Kimler için:",
  problemsTitle: "Çözdüğü sorunlar",
  servicesTitle: "Neler yapıyoruz",
  exampleTitle: "Örnek",
  next: {
    title: "Bir iş nasıl ilerler",
    links: [
      { label: "Nasıl çalışıyoruz", href: anchorHref("how-we-work", "tr") },
      { label: "Nasıl fiyatlandırıyoruz", href: anchorHref("pricing", "tr") },
      { label: "Sık sorulan sorular", href: anchorHref("questions", "tr") },
    ],
  },
  closing: {
    title: "İşinizi anlatın.",
    cta: { label: "Tüm iletişim bilgileri", href: pagePath("contact", "tr") },
  },
};
