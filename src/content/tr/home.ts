// Türkçe ana sayfadaki her sözcük. Bileşenler buradan okur; JSX içinde metin durmaz.

import { anchorHref, pagePath } from "../routes.ts";
import type { AreaSlug } from "../en/areas.ts";

type Problem = { text: string; area: AreaSlug };

const problems: Problem[] = [
  { text: "Makine duruyor ve kimse nedenini bilmiyor.", area: "manufacturing" },
  { text: "Aynı veriyi üç ayrı programa giriyoruz.", area: "automation" },
  { text: "Resmî bir tebligatın süresini kaçırdık.", area: "automation" },
  { text: "Sitemiz telefonda yavaş ve Google'da çıkmıyor.", area: "websites" },
  { text: "Müşteriler her gün aynı soruları soruyor.", area: "ai" },
  { text: "Ay sonu raporlaması Excel'de iki günümüzü alıyor.", area: "data" },
];

export const home = {
  meta: {
    title: "Vegasoft Technologies | Tekrar eden işler için yazılım, veri ve yapay zekâ",
    description:
      "Fabrikadaki makineden ofisteki gelen kutusuna kadar, bir işletmenin her gün kaybettiği saatleri yazılım, veri ve yapay zekâ ile geri kazandırıyoruz.",
  },
  hero: {
    title: "Tekrar eden işler, sistemlere devredilir.",
    lead: "Fabrikadaki makineden ofisteki gelen kutusuna kadar, bir işletmenin her gün kaybettiği saatleri yazılım, veri ve yapay zekâ ile geri kazandırıyoruz.",
    cta: { label: "İşinizi anlatın", href: anchorHref("contact", "tr") },
    indexTitle: "Çalışma alanları",
  },
  problems: {
    title: "En sık duyduğumuz sorunlar",
    intro: "Biri size tanıdık geliyorsa, yanıtı o bölümde.",
    items: problems,
  },
  services: {
    title: "Neler yapıyoruz",
    pilotNoteBefore: "Üzerinde",
    pilotNoteAfter:
      "işareti olan hizmetler tek bir hat veya süreçte küçük bir denemeyle başlar ve sonuçlar ölçüldükten sonra yaygınlaştırılır.",
    audienceLabel: "Kimler için:",
    exampleLabel: "Örnek:",
  },
  approach: {
    title: "Gösteriş için değil, ölçülebilir işler için teknoloji kuruyoruz.",
    body: "Çoğu işletmede en pahalı kayıplar görünmeyenlerdir: elle girilen veriler, kaçırılan bir süre, kimsenin açıklayamadığı bir duruş, her ay yeniden hazırlanan aynı rapor. Biz bu işi bulur, ölçer ve bir sisteme devrederiz. Karşılığında ekibinizin asıl işine ayıracağı zamanı geri alırsınız.",
    signal: {
      title: "Elle çizilmiş düzensiz bir çizginin düzenli bir dijital sinyale dönüşmesi",
      handLabel: "elle",
      systemLabel: "sistemle",
    },
  },
  howWeWork: {
    title: "Nasıl çalışıyoruz",
    youGetLabel: "Aldığınız:",
    steps: [
      {
        title: "Dinleriz",
        text: "Sorunu yerinde görürüz ve her işin gerçekte ne kadar sürdüğünü birlikte ölçeriz.",
        youGet:
          "işin bugün nasıl yapıldığını, ne kadar sürdüğünü ve bir sistemin neyi değiştireceğini anlatan yazılı bir not.",
      },
      {
        title: "Küçük başlarız",
        text: "Önce tek bir süreç veya hat için çalışan bir sürüm kurarız. Değerini kanıtlamadan hiçbir şey büyümez.",
        youGet: "tek bir süreçte veya hatta çalışan bir sürüm ve ölçülmüş sonuçları.",
      },
      {
        title: "Kurar ve devrederiz",
        text: "Sistemi kendi ortamınıza kurarız, ekibinizi eğitiriz ve nasıl çalıştığını belgeleriz.",
        youGet:
          "kendi ortamınızda çalışan sistem, eğitilmiş bir ekip ve yazılı belgeler.",
      },
      {
        title: "Yanınızda kalırız",
        text: "Bakım, güncelleme ve izlemeyle devam ederiz; ihtiyaçlarınız büyüdükçe sistemi genişletiriz.",
        youGet:
          "sabit aylık ücretle bakım, güncelleme ve izleme, ihtiyaçlarınız büyüdükçe de değişiklikler.",
      },
    ],
  },
  pricing: {
    title: "Nasıl fiyatlandırıyoruz",
    intro:
      "Her iş farklı olduğu için fiyat listesi yayımlamıyoruz. Fiyatı kurma biçimimiz ise her zaman aynı.",
    items: [
      {
        title: "Sabit fiyatlı ilk adım",
        text: "İşi sizinle birlikte inceler, ölçer ve bir sistemin neyi değiştireceğini yazılı olarak ortaya koyarız. Bu adımın ücreti başlamadan önce kararlaştırılır.",
      },
      {
        title: "Kurulum için tek seferlik fiyat",
        text: "Kurulum, yazılı kapsama göre fiyatlanır; böylece işe başlamadan önce maliyeti bilirsiniz.",
      },
      {
        title: "Çalışır kalması için aylık ücret",
        text: "Devirden sonra barındırma, güncelleme, izleme ve destek, sabit bir aylık ücretle.",
      },
    ],
  },
  contact: {
    title: "İşinizi anlatın.",
    body: "İşletmenizde her gün elle tekrarlanan bir iş varsa, büyük olasılıkla bir sisteme devredilebilir. Bize anlatın, uygun olup olmadığını ve ne kadar süreceğini açıkça söyleyelim. Burada sayılmayan ihtiyaçlar da olabilir.",
    hint: "Neyin tekrarlandığını, ne sıklıkla ve kimin yaptığını, hangi programların veya makinelerin işin içinde olduğunu bilmek yardımcı olur. Kabaca bir not yeterli. Şartname hazırlamanıza gerek yok.",
    cta: { label: "E-posta gönderin", href: "mailto:hello@vegasoft.co.uk" },
    allDetails: {
      label: "Tüm iletişim bilgileri",
      href: pagePath("contact", "tr"),
    },
    emailLabel: "E-posta",
    phoneLabel: "Telefon",
    locationLabel: "Konum",
  },
};
