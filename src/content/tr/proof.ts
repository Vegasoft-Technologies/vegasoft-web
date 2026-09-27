// Ziyaretçinin doğrulayabileceği kanıtlar. Yalnızca gerçek, adı geçen ve izin verilmiş
// olanlar: hiçbiri uydurulmaz. Her liste, sahibi bir kayıt ekleyene ve adı geçen kişi ya
// da işletme kabul edene kadar boş kalır. Yayındaki derlemede boş liste hiçbir şey
// göstermez; işaretler açıkken yerini belirten bir işaret görünür.

import type { CaseStudy, Testimonial } from "../en/proof.ts";

export const proof = {
  title: "Müşteriler ve işler",
  testimonials: {
    title: "Müşteriler ne diyor",
    placeholder: "Müşteri görüşleri",
    items: [] as Testimonial[],
  },
  caseStudies: {
    title: "Vaka çalışmaları",
    placeholder: "Vaka çalışmaları",
    items: [] as CaseStudy[],
  },
};
