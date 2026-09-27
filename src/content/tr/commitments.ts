// Müşteriye verilen sözler, müşterinin karşılaştığı sırayla. Onaylı olanlar yayımlanır.
// approved: false olan, sahibinin karar vereceği bir taslaktır: yayındaki derlemede yer
// almaz, işaretler açıkken yerinde taslak olarak görünür (src/lib/soon.ts). Hiçbiri
// rakam vermez.

import type { Commitment } from "../en/commitments.ts";

export const commitments = {
  title: "Size söz verdiklerimiz",
  intro: "İlk görüşmeden yıllardır çalışan bir sisteme kadar, her işte geçerli.",
  items: [
    {
      id: "first-call",
      title: "İlk görüşme ücretsizdir",
      text: "İlk görüşme ücretsizdir. İşi sizinle birlikte inceler, herhangi bir ücret kararlaştırılmadan önce uygun olup olmadığını söyleriz.",
      approved: true,
    },
    {
      id: "reply",
      title: "Bir iş günü içinde yanıt",
      text: "E-posta gönderin ya da arayın, bir iş günü içinde bizden yanıt alırsınız.",
      approved: true,
    },
    {
      id: "payment",
      title: "Ödeme işin aşamalarına göre",
      text: "Ödeme, yazılı kapsama göre aşamalara bölünür. Kapsam yazılı olarak kararlaştırılmadan ödeme istemeyiz.",
      approved: true,
    },
    {
      id: "progress",
      title: "Yapım sırasında görürsünüz",
      text: "Çalışan yazılımı yalnızca sonunda değil, yapım sırasında da görürsünüz.",
      approved: true,
    },
    {
      id: "ownership",
      title: "Kurduğumuz sizindir",
      text: "Kurduğumuz her şey sizindir: kod, veri ve belgeler. Bir gün başka birine geçerseniz, sistemi sürdürmek için gereken her şeyi devrederiz.",
      approved: true,
    },
    {
      id: "confidentiality",
      title: "Gizliliğiniz korunur",
      text: "İsterseniz verilerinize bakmadan önce gizlilik sözleşmesi imzalarız ve yazılı izniniz olmadan sizi müşteri olarak anmayız.",
      approved: true,
    },
    {
      id: "on-site",
      title: "Gerektiğinde yerinde",
      text: "Uzaktan çalışırız; iş gerektirdiğinde yanınıza geliriz, örneğin bir hattın çalışmasını görmek ya da bir sistemi kurmak için.",
      approved: true,
    },
    {
      id: "support-hours",
      title: "Destek saatleri",
      text: "Destek hafta içi 09.00 ile 18.00 arası, İngiltere saatiyle verilir. Bu saatlerin dışı için ayrıca anlaşabiliriz.",
      approved: true,
    },
    {
      id: "data-hosting",
      title: "Verileriniz nerede durur",
      text: "Verileriniz Birleşik Krallık'ta veya Avrupa Birliği'nde barındırılır ve bir sistem yayına girmeden önce nerede durduğu size söylenir.",
      approved: false,
    },
  ] satisfies Commitment[],
};
