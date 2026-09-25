// Alt bilgideki yasal satırın sözcükleri. Değerler src/content/company.ts dosyasından
// gelir. {trading}, {legal}, {place}, {number} ve {address} geçtikleri yerde doldurulur.
// Yasal ad çevrilmez; cümledeki "'nin" eki bu ada göre yazılmıştır.

export const legal = {
  copyright: "© {trading}.",
  company: "{trading}, {place}'de kayıtlı {legal}'nin ticari adıdır.",
  companyWithNumber:
    "{trading}, {place}'de {number} şirket numarasıyla kayıtlı {legal}'nin ticari adıdır.",
  office: "Kayıtlı ofis: {address}.",
  vat: "KDV numarası {number}.",
  /** Kayıt yerinin Türkçe adı. company.ts yasal yazımını tutar. */
  placeNames: { "England and Wales": "İngiltere ve Galler" } as Record<string, string>,
};
