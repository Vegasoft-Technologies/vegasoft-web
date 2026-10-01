// Gizlilik bildirimi. Şirketin kendi bilgileri burada tekrarlanmaz: sayfa bunları
// src/content/company.ts dosyasından okur, böylece yasal ad, kayıtlı ofis ve şirket
// numarası alt bilgideki gibi davranır.
//
// Her işlemcinin veriyle ne yaptığı ve nerede işlediği, kendi yayımladığı sayfadan
// alınmıştır. Kaynaklar bu sayfayı ekleyen pull request'te listelenir, sitede değil.

export const privacy = {
  meta: {
    title: "Gizlilik bildirimi",
    description:
      "Bu site neyi topluyor, neden topluyor, kimler işliyor ve bize ne sorabilirsiniz. Site çerez kullanmaz; bir başvuru tek bir e-postaya dönüşür.",
  },
  title: "Gizlilik bildirimi",
  lead: "Bu site neyi topluyor, neden topluyor ve bize ne sorabilirsiniz.",
  updated: "Son güncelleme: 27 Eylül 2026",
  who: {
    title: "Biz kimiz",
    /** {legal} ve {email} şirket bilgilerinden doldurulur. */
    text: "Burada anlatılan kişisel verilerin neden ve nasıl kullanıldığına {legal} karar verir. Bu sayfadaki her konu için {email} adresine yazın.",
  },
  collect: {
    title: "Neleri topluyoruz",
    items: [
      "İletişim formuna yazdıklarınız: adınız, e-posta adresiniz, doldurduysanız şirket adı ve iletiniz. Bunlara başka bir şey eklenmez.",
      "Bize gönderdiğiniz e-posta ya da yaptığınız arama ile bizim yanıtımız.",
      "İsteğinizle ilgili teknik veriler: siteyi sunmak ve korumak için Cloudflare bunları işler; IP adresiniz, istediğiniz adres, saat ve tarayıcınızın kendisi hakkında bildirdikleri.",
      "Formdaki güvenlik denetimi tarayıcınıza tek kullanımlık bir jeton verir. Ön yetkilendirme kapalı olduğu için çerez bırakmaz ve Cloudflare, forma yazdıklarınızı okumadığını söyler.",
      "Bu site çerez bırakmaz ve tarayıcınızda hiçbir şey saklamaz. Onaylanacak bir şey olmadığı için çerez bildirimi de yoktur.",
    ],
  },
  why: {
    title: "Neden ve hangi dayanakla",
    items: [
      "Talebinizi okumak ve yanıtlamak, sözleşme kurulmadan önce istediklerinizi yapmak için. UK GDPR 6(1)(b) maddesi; kendiniz adına değil bir işletme adına yazdığınızda 6(1)(f) maddesi.",
      "Siteyi erişilebilir tutmak ve formu otomatik kötüye kullanımdan korumak için. UK GDPR 6(1)(f) maddesi: çalışan ve kötüye kullanılmayan bir site işletmedeki meşru menfaatimiz.",
    ],
  },
  retention: {
    title: "Ne kadar saklıyoruz",
    text: "İşe dönüşmeyen bir talep on iki ay sonra silinir.",
    approved: true,
  },
  processors: {
    title: "Bizim adımıza kimler işliyor",
    intro:
      "Bunun bir bölümünü bizim adımıza üç şirket yürütür; her biri, veriyi yalnızca bizim talimatımızla kullanmasına izin veren bir sözleşmeye bağlıdır. Aşağıdakiler, her birinin verinin nereye gittiği konusunda kendi yayımladıklarıdır.",
    whereLabel: "Nerede",
    safeguardLabel: "Aktarım",
    items: [
      {
        name: "Cloudflare",
        what: "Bu siteyi sunar ve korur, formdaki güvenlik denetimini çalıştırır ve açıldığında ziyaretleri çerez kullanmadan, kimseyi siteler arasında izlemeden sayar.",
        where:
          "Cloudflare, bu veriyi Amerika Birleşik Devletleri'ndeki ve Avrupa'daki veri merkezlerinde işlediğini söyler.",
        safeguard:
          "Birleşik Krallık dışına çıkan veri için AB Standart Sözleşme Maddeleri ile Birleşik Krallık Ek'ine ve AB ile ABD arasındaki Veri Gizliliği Çerçevesi ile onun Birleşik Krallık Uzantısı kapsamındaki sertifikasyonuna dayanır.",
      },
      {
        name: "Resend",
        what: "İletişim formunun gönderdiği iletiyi posta kutumuza ulaştırır.",
        where:
          "Resend, işlemenin ağırlıklı olarak Amerika Birleşik Devletleri'nde yapıldığını söyler.",
        safeguard:
          "AB ve Birleşik Krallık Standart Sözleşme Maddeleri ile Birleşik Krallık Ek'ine ve AB ile ABD arasındaki Veri Gizliliği Çerçevesi ile Birleşik Krallık Uzantısına dayanır.",
      },
      {
        name: "SiteGround",
        what: "E-postamızı tutan posta kutusunu çalıştırır.",
        where:
          "SiteGround, kişisel veriyi dünya genelinde aktarabileceğini söyler ve bu yerler arasında AEA'yı, Amerika Birleşik Devletleri'ni, Kanada'yı, Avustralya'yı, Singapur'u, Japonya'yı ve Brezilya'yı sayar.",
        safeguard:
          "Aktarımı ya Birleşik Krallık yeterlilik düzenlemelerinin kapsadığı bir ülkeye ya da Standart Sözleşme Maddeleri'ni imzalamış bir alıcıya yapar; uygulanabildiği yerde Birleşik Krallık Uluslararası Veri Aktarım Sözleşmesi ile birlikte.",
      },
    ],
  },
  rights: {
    title: "Haklarınız",
    text: "UK GDPR kapsamında kişisel verilerinizin bir kopyasını isteyebilir, düzeltilmesini veya silinmesini isteyebilir, kullanılmasına itiraz edebilir ya da işlenmesinin sınırlanmasını isteyebilirsiniz. {email} adresine yazın, bir ay içinde yanıtlarız.",
    kvkk: "Türkiye'deyseniz 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 11. maddesindeki haklar da geçerlidir ve aynı adresten bize ulaşabilirsiniz.",
    complaint:
      "Yanıtımız sizi tatmin etmezse Birleşik Krallık Bilgi Komiserliği Ofisi'ne şikâyette bulunabilirsiniz.",
    complaintLink: { label: "ico.org.uk", href: "https://ico.org.uk" },
  },
};
