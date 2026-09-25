// Hakkımızda sayfasındaki her sözcük. Mülkiyet cümlesi sözlerden gelir, böylece ikisi
// birbirinden ayrı düşemez.

import { pagePath } from "../routes.ts";
import { commitments } from "./commitments.ts";

const ownership = commitments.items.find((item) => item.id === "ownership");

export const about = {
  meta: {
    title: "Hakkımızda",
    description:
      "Vegasoft Technologies, işletmelerin tekrar eden işlerini devralan yazılım, veri araçları ve yapay zekâ kurar.",
  },
  title: "Vegasoft hakkında",
  lead: "Fabrikadaki makineden ofisteki gelen kutusuna kadar, işletmelerin tekrar eden işlerini devralan yazılım, veri araçları ve yapay zekâ kuruyoruz.",
  principles: {
    title: "Neye bağlıyız",
    items: [
      {
        title: "Gösteriş değil, ölçülebilir iş",
        text: "Bugün zaman kaybettiren bir işten başlar ve gerçekte ne kadar sürdüğünü ölçeriz. Değerini kanıtlamadan hiçbir şey büyümez.",
      },
      {
        title: "Önce küçük",
        text: "Tek bir süreçte veya hatta çalışan bir sürüm, daha büyüğünden önce gelir. Pilot işaretli hizmetler, sonuçlar ölçülene kadar deneme olarak kalır.",
      },
      {
        title: "Sizde kalır",
        text: ownership?.text ?? "",
      },
      {
        title: "Açık yanıtlar",
        text: "Bir işin uygun olup olmadığını ve ne kadar süreceğini, işe başlamadan önce açıkça söyleriz.",
      },
    ],
  },
  where: {
    title: "Nerede çalışıyoruz",
  },
  company: {
    title: "Şirket",
    link: { label: "Şirket bilgileri", href: pagePath("company", "tr") },
  },
  closing: {
    title: "İşinizi anlatın.",
    cta: { label: "Tüm iletişim bilgileri", href: pagePath("contact", "tr") },
  },
};
