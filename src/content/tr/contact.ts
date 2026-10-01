// İletişim sayfasında ana sayfada olmayan sözcükler. Gövde ve ipucu cümleleri ana
// sayfanın iletişim bölümünden gelir.

export const contact = {
  meta: {
    title: "İletişim",
    description:
      "Ekibinizin her gün elle tekrarladığı bir işi bize anlatın. Bir iş günü içinde yanıt veriyoruz. E-posta, telefon veya sayfadaki form ile.",
  },
  title: "İşinizi anlatın.",
  details: {
    title: "Bize nasıl ulaşırsınız",
    replyLabel: "Yanıt",
  },
  form: {
    title: "Bize yazın",
    /** Tarayıcı JavaScript çalıştırmadığında formun yerine görünür. */
    noScript:
      "Bu form JavaScript gerektirir. Bunun yerine e-posta gönderin veya arayın, aynı şekilde ilgileniriz.",
    nameLabel: "Adınız",
    emailLabel: "E-posta adresiniz",
    companyLabel: "Şirket",
    companyOptional: "isteğe bağlı",
    messageLabel: "Elle tekrarlanan iş ne, ne sıklıkla ve kim yapıyor?",
    /** Kimsenin görmediği alan. İçine bir şey yazılırsa istenmeyen ileti sayılır. */
    honeypotLabel: "Bu alanı boş bırakın",
    submit: "Gönder",
    sending: "Gönderiliyor",
    required: "Bu alan gerekli.",
    badEmail: "Yanıt verebileceğimiz bir e-posta adresi yazın.",
    checkLabel: "Güvenlik denetimi",
    checkMissing: "Güvenlik denetimini tamamlayın.",
    successTitle: "Teşekkürler.",
    successText: "Bir iş günü içinde yanıt veriyoruz.",
    failure: "İleti gönderilemedi. Şu adrese yazın:",
    privacyNote:
      "Gönderdiklerinizi yalnızca yanıt vermek için kullanırız. Bu sitede hiçbir şey saklanmaz.",
    privacyLink: "Nasıl işliyoruz",
  },
};
