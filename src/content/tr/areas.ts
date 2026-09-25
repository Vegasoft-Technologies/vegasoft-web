// Yedi çalışma alanı ve hizmetleri, hizmet kataloğundaki gibi. Ana sayfa bunları
// listeler; her alanın /tr/hizmetler/<adres> altında kendi sayfası vardır.

import type { Area } from "../en/areas.ts";

export const pilotLabel = "Pilot";

export const areas: Area[] = [
  {
    slug: "manufacturing",
    name: "Üretim",
    promise:
      "Makine verisini kimse elle yazmadan toplar, üretimin gerçekte nasıl gittiğini ekranda gösteririz.",
    audience: "Üretim tesisleri, atölyeler, dolum ve paketleme hatları.",
    services: [
      {
        name: "Makine verisi toplama",
        description:
          "PLC'lerden, sensörlerden ve sayaçlardan OPC UA, Modbus veya MQTT ile veri okuruz. Sayaç değerlerini kâğıda yazmak biter.",
      },
      {
        name: "OEE ölçümü",
        description:
          "Kullanılabilirlik × Performans × Kalite. Her hattın gerçek verimini vardiya vardiya tek bir sayı olarak görürsünüz.",
      },
      {
        name: "Duruş takibi",
        description:
          "Makine ne zaman durdu, ne kadar durdu ve neden. En çok zaman kaybettiren nedenler sıraya dizilir.",
      },
      {
        name: "Canlı üretim ekranları",
        description:
          "Hedef, gerçekleşen üretim ve hattın anlık durumu sahadaki ekranlarda görünür.",
      },
      {
        name: "Vardiya raporları",
        description: "Üretim, fire ve duruş raporları vardiya biter bitmez hazır olur.",
      },
      {
        name: "Kestirimci bakım sinyalleri",
        description:
          "Titreşim, sıcaklık veya akımdaki kaymayı arızaya dönüşmeden önce bildirir.",
        pilot: true,
      },
      {
        name: "Enerji izleme",
        description:
          "Her makinenin her vardiyada ne kadar enerji harcadığı. Boşta çalışan makineler görünür olur.",
      },
      {
        name: "İzlenebilirlik",
        description:
          "Bir ürünün hangi hammaddeden, hangi makinede ve hangi gün üretildiği tek bir sorguda bulunur.",
      },
    ],
  },
  {
    slug: "automation",
    name: "İş süreçleri otomasyonu",
    promise:
      "Ofiste her gün elle tekrarlanan işi bir sisteme devrederiz, ekibiniz de asıl işine döner.",
    audience: "Finans, satış, satın alma, insan kaynakları ve idari ekipler.",
    services: [
      {
        name: "Otomatik e-posta ve bildirimler",
        description:
          "Sipariş, randevu, hatırlatma ve gecikmiş ödeme mesajları kimsenin aklında tutmasına gerek kalmadan doğru kişiye ulaşır.",
      },
      {
        name: "Resmî tebligat takibi",
        description:
          "Gelen tebligatları ve yazıları kaydeder, sürelerini takvime ekler ve süre yaklaştıkça uyarır.",
      },
      {
        name: "Fatura ve belge işleme",
        description:
          "Gelen faturaları ve irsaliyeleri okur, bilgilerini muhasebe sisteminize kendisi girer.",
      },
      {
        name: "Onay akışları",
        description:
          "Satın alma, izin ve masraf onayları e-posta zincirleri yerine tek ekranda ilerler. Bir talebin kimde beklediğini her zaman bilirsiniz.",
      },
      {
        name: "Otomatik raporlar",
        description:
          "Günlük satış, haftalık stok ve aylık özet raporları her sabah okunmaya hazır gelir.",
      },
      {
        name: "Sistemlerinizi birbirine bağlama",
        description:
          "Veri; muhasebe, e-ticaret, CRM ve Excel arasında kendiliğinden akar. Hiçbir şey iki kez yazılmaz.",
      },
      {
        name: "WhatsApp ve SMS bildirimleri",
        description:
          "Sipariş durumu, randevu hatırlatması ve teslimat bilgisi doğrudan müşterinin telefonuna gider.",
      },
      {
        name: "Talep ve başvuru yönetimi",
        description:
          "Web formundan gelenler kaybolmaz. Her biri kaydedilir, doğru kişiye yönlendirilir ve kapanana kadar takip edilir.",
      },
    ],
  },
  {
    slug: "websites",
    name: "Web siteleri ve çevrim içi sistemler",
    promise:
      "Hızlı açılan, telefonda düzgün görünen ve Google'da bulunan siteler kurarız; arkalarında gerçekten çalışan sistemlerle.",
    audience:
      "Restoranlar, klinikler, mağazalar, üreticiler ve her ölçekten hizmet firması.",
    example: {
      label: "zukiscaffetteria.co.uk",
      href: "https://zukiscaffetteria.co.uk",
      text: "Exeter'deki bir kafe için web sitesi ve çevrim içi masa rezervasyonu.",
    },
    services: [
      {
        name: "Kurumsal web sitesi",
        description:
          "Hızlı, telefona uygun ve güncellemesi kolay. Şablon değil, işinize göre kurulur.",
      },
      {
        name: "Çevrim içi rezervasyon ve randevu",
        description:
          "Gerçek kapasiteye göre anında onaylar, çift kayıt açmaz ve bildirimlerini kendisi gönderir.",
      },
      {
        name: "E-ticaret",
        description: "Ürünler, stok, ödeme ve kargo tek yerden yönetilir.",
      },
      {
        name: "Müşteri ve bayi portalları",
        description:
          "Giriş yapan müşteriler kendi siparişlerini, faturalarını ve belgelerini görür.",
      },
      {
        name: "Mevcut sitenizi hızlandırma",
        description:
          "Görselleri ve kodu yeniden düzenleyerek açılma süresini ve mobil veri kullanımını düşürürüz.",
      },
      {
        name: "Google'da görünürlük",
        description:
          "Arama optimizasyonu, Google Haritalar kaydı, puan rozeti ve zengin arama sonuçları.",
      },
      {
        name: "Çok dilli siteler",
        description:
          "Yurt dışındaki müşteriler ve ziyaretçiler için siteniz birden fazla dilde.",
      },
      {
        name: "Gizlilik uyumu altyapısı",
        description:
          "GDPR ve KVKK kapsamında çerez onayı, gizlilik bildirimi ve veri saklama için teknik altyapı.",
      },
    ],
  },
  {
    slug: "ai",
    name: "Yapay zekâ",
    promise:
      "Yapay zekâyı gösteriş için kurmayız. Belirli ve çok zaman alan bir işi devralsın diye kurarız.",
    audience:
      "Yoğun evrakla, dolu bir gelen kutusuyla veya sürekli tekrarlanan sorularla uğraşan ekipler.",
    services: [
      {
        name: "Belge okuma",
        description:
          "Faturalardan, sözleşmelerden, formlardan ve yazılardan ihtiyacınız olan bilgileri PDF'ten ya da fotoğraftan alıp tabloya aktarır.",
      },
      {
        name: "Kurum içi asistan",
        description:
          "Kendi prosedürlerinizden, kataloglarınızdan ve belgelerinizden soruları yanıtlar ve her yanıtın hangi belgeden geldiğini gösterir.",
      },
      {
        name: "Müşteri hizmetleri asistanı",
        description:
          "Sık sorulanları gece gündüz yanıtlar, çözemediğini ekibinize devreder.",
      },
      {
        name: "E-posta ayıklama ve yanıt taslakları",
        description:
          "Gelen kutunuzu konuya göre ayırır ve yanıt taslakları hazırlar. Gönderme kararı her zaman sizde kalır.",
      },
      {
        name: "Toplantı ve görüşme özetleri",
        description:
          "Kayıtları yazıya döker, alınan kararları ve üstlenilen işleri listeler.",
      },
      {
        name: "Görüntüyle kalite kontrolü",
        description:
          "Kamera, hattaki hatalı ürünleri, eksik parçaları veya yanlış etiketleri fark eder.",
        pilot: true,
      },
      {
        name: "Ürün metni ve çeviri",
        description:
          "Katalog açıklamaları, çok dilli ürün sayfaları ve teknik belgelerin çevirisi.",
      },
      {
        name: "Sözleşme ve teklif karşılaştırma",
        description:
          "Uzun belgelerdeki farkları, eksik maddeleri ve riskli ifadeleri işaretler. Son okumayı bir uzman yapar.",
      },
    ],
  },
  {
    slug: "data",
    name: "Veri ve raporlama",
    promise:
      "Dağınık tabloları ve sistemleri tek yerde toplarız, böylece kararlar tahmine değil sayılara dayanır.",
    audience: "Yöneticiler, işletme sahipleri ve planlama ekipleri.",
    services: [
      {
        name: "Yönetim paneli",
        description: "Satış, üretim, stok ve nakit tek ekranda, her zaman güncel.",
      },
      {
        name: "Excel'den veri tabanına",
        description:
          "Verinin kaybolduğu veya bozulduğu paylaşımlı dosyalar yerine düzenli ve yedeklenen bir veri tabanı.",
      },
      {
        name: "Talep ve stok tahmini",
        description:
          "Geçmiş satışlardan önümüzdeki haftaların ihtiyacını tahmin eder; hem fazla stoğu hem eksiği azaltmayı hedefler.",
        pilot: true,
      },
      {
        name: "Veri temizleme",
        description:
          "Mükerrer kayıtlar, üç ayrı biçimde yazılmış aynı müşteri ve eksik alanlar düzeltilir.",
      },
      {
        name: "Otomatik uyarılar",
        description:
          "Stok kritik seviyeye indiğinde veya bir değer olağan aralığının dışına çıktığında haber verir.",
      },
      {
        name: "Kârlılık analizi",
        description:
          "Hangi ürün, müşteri veya satış kanalı gerçekten kazandırıyor, maliyetleriyle birlikte.",
      },
    ],
  },
  {
    slug: "mobile",
    name: "Mobil ve saha",
    promise: "Masa başında çalışmayan ekipler için telefon ve tablet uygulamaları.",
    audience: "Servis, bakım, teslimat, depo ve saha ekipleri.",
    services: [
      {
        name: "Saha ekibi uygulaması",
        description:
          "Servis, bakım ve teslimat işlerini yönetir. Çevrim dışı çalışır, bağlantı gelince eşitler.",
      },
      {
        name: "Depo ve sayım",
        description:
          "Barkod ve QR kodları telefon kamerasıyla okunur. Sayımlar kâğıtsız ve hızlı biter.",
      },
      {
        name: "Dijital kontrol listeleri",
        description:
          "İş güvenliği, kalite, temizlik ve vardiya devri kâğıt form yerine fotoğraf ve zaman damgasıyla kaydedilir.",
      },
      {
        name: "Müşteri uygulaması",
        description: "Sipariş, randevu ve sadakat programı müşterinin telefonunda.",
      },
      {
        name: "Arıza ve talep bildirimi",
        description:
          "Çalışanlar sorunu fotoğrafla bildirir; kayıt sorumlusuna gider ve çözülene kadar takip edilir.",
      },
      {
        name: "Bakım planı",
        description:
          "Makine ve araçların periyodik bakımı zamanı geldiğinde bildirilir, geçmiş bakım kaydıyla birlikte.",
      },
    ],
  },
  {
    slug: "infrastructure",
    name: "Altyapı ve güvenlik",
    promise: "Sistemlerinizin çalışır, güvenli ve birbirine bağlı kalmasını sağlarız.",
    audience: "Yazılım kullanan ama bakımını üstlenecek ekibi olmayan işletmeler.",
    services: [
      {
        name: "API ve entegrasyon",
        description: "Farklı yazılımları birbirine güvenli biçimde bağlarız.",
      },
      {
        name: "Eski sistemlerin yenilenmesi",
        description:
          "Çalışan ama kimsenin dokunmaya cesaret edemediği yazılım, işi durdurmadan adım adım yenilenir.",
      },
      {
        name: "Bulut kurulumu ve taşıma",
        description:
          "Sunucu, barındırma ve alan adı kurulur ya da daha uygun maliyetli bir altyapıya taşınır.",
      },
      {
        name: "E-posta ulaşılabilirliği",
        description:
          "Şirket e-postanızın spam klasörüne düşmemesi için alan adı doğrulama kayıtlarını (SPF, DKIM, DMARC) kurarız.",
      },
      {
        name: "Yedekleme ve kurtarma planı",
        description:
          "Veri kaybı olduğunda neyin ne kadar sürede geri geleceğini önceden bilirsiniz.",
      },
      {
        name: "İzleme ve uyarı",
        description:
          "Siteniz veya sisteminiz durduğunda müşterilerinizden önce siz haberdar olursunuz.",
      },
      {
        name: "Güvenlik incelemesi",
        description:
          "Mevcut sistemlerinizdeki açıkları, zayıf parolaları ve gereksiz yetkileri tespit ederiz.",
      },
      {
        name: "Erişim ve yetkiler",
        description:
          "Kimin neye erişebildiği açıkça kayıtlıdır ve işten ayrılanların erişimi kapatılır.",
      },
    ],
  },
];
