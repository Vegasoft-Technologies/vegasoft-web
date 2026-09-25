// Bir işletmenin ilk görüşmeden önce sorduğu sorular ve yanıtları: bir iş nasıl
// fiyatlanır, pilot ne demek, devirden sonra ne olur. Ana sayfa bunları gösterir, arama
// motorları da yapılandırılmış veri olarak okur.

import type { Question } from "../en/questions.ts";

export const questions = {
  title: "Sık sorulan sorular",
  intro: "İlk görüşmeden önce akla gelenlere kısa yanıtlar.",
  items: [
    {
      question: "Size ulaşmadan önce şartname hazırlamamız gerekir mi?",
      answer:
        "Gerekmez. İşi kendi sözlerinizle anlatın: ne tekrarlanıyor, ne sıklıkla ve kim yapıyor. Biz sizinle birlikte inceler, ölçer ve bir sistemin neyi değiştireceğini yazılı olarak ortaya koyarız.",
    },
    {
      question: "Bir iş nasıl fiyatlandırılıyor?",
      answer:
        "Üç parçada. İlk adım için, başlamadan önce kararlaştırılan sabit bir ücret. Kurulum için, yazılı kapsama göre belirlenen tek seferlik bir fiyat. Devirden sonra barındırma, güncelleme, izleme ve destek için sabit bir aylık ücret. Her iş farklı olduğu için fiyat listemiz yok.",
    },
    {
      question: "Bir hizmetteki Pilot ne demek?",
      answer:
        "Hizmet, tek bir hat veya süreçte küçük bir denemeyle başlar. Ancak sonuçlar ölçüldükten sonra yaygınlaştırılır.",
    },
    {
      question: "Hâlihazırda kullandığımız yazılımlarla çalışır mısınız?",
      answer:
        "Evet. İşlerin çoğu, işletmenin zaten kullandığı muhasebe, e-ticaret, CRM veya Excel gibi sistemleri birbirine bağlar; böylece hiçbir şey iki kez yazılmaz. Çalışan ama kimsenin dokunmaya cesaret edemediği yazılım da işi durdurmadan adım adım yenilenebilir.",
    },
    {
      question: "Sistem kurulduktan sonra ne oluyor?",
      answer:
        "Sistemi kendi ortamınıza kurarız, ekibinizi eğitiriz ve nasıl çalıştığını belgeleriz. Sonra yanınızda kalırız: bakım, güncelleme ve izleme; ihtiyaçlarınız büyüdükçe de sistem genişletilir.",
    },
    {
      question: "Yalnızca üreticilerle mi çalışıyorsunuz?",
      answer:
        "Hayır. Üretim, yedi alandan biri. Diğerleri ofis işleri, web siteleri ve çevrim içi sistemler, yapay zekâ, veri ve raporlama, mobil ve saha ekipleri, altyapı ve güvenlik.",
    },
    {
      question: "İş, listenizde yoksa ne olur?",
      answer:
        "Yine de bize anlatın. İşletmenizde her gün elle tekrarlanan bir şey varsa, büyük olasılıkla bir sisteme devredilebilir; uygun olup olmadığını ve ne kadar süreceğini açıkça söyleriz.",
    },
    {
      question: "Ne kadar sürede yanıt veriyorsunuz?",
      answer:
        "Bir iş günü içinde. hello@vegasoft.co.uk adresine yazın veya +44 7767 080863 numarasını arayın.",
    },
    {
      question: "Kurduğunuz sistem kimin olur?",
      answer:
        "Sizin: kod, veri ve belgeler. Bir gün başka birine geçerseniz, sistemi sürdürmek için gereken her şeyi devrederiz.",
    },
    {
      question: "Yerinde geliyor musunuz?",
      answer:
        "İş gerektirdiğinde evet; örneğin bir hattın çalışmasını görmek veya bir sistemi kurmak için. İşin geri kalanı uzaktan yapılır.",
    },
  ] satisfies Question[],
};
