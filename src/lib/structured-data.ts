import { company, formatAddress } from "../content/company.ts";
import { questions } from "../content/en/questions.ts";
import { site } from "../content/site.ts";

// Facts about the business, the site and the questions section in the form search
// engines read (schema.org as JSON-LD). Everything here is on the page already; a
// company detail that is not known yet is left out, exactly as the page leaves it out.
// Relative imports, so that Node's test runner can load this file without the alias.

export function structuredData() {
  const organizationId = `${site.url}/#organization`;
  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    logo: `${site.url}/brand/vegasoft-logo-renkli.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      email: site.email,
      telephone: site.phone,
      ...(company.supportHours !== null && {
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: company.supportHours.days,
          opens: company.supportHours.opens,
          closes: company.supportHours.closes,
        },
      }),
    },
    ...(company.legalName !== null && { legalName: company.legalName }),
    ...(company.address !== null && {
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.town,
        postalCode: company.address.postcode,
        addressCountry: company.address.country,
      },
      areaServed: { "@type": "Country", name: company.address.country },
    }),
    // The company number, once Companies House has issued it.
    ...(company.companyNumber !== null && { identifier: company.companyNumber }),
    ...(company.vatNumber !== null && { vatID: company.vatNumber }),
    ...(company.founded !== null && { foundingDate: company.founded }),
    ...(company.social !== null && { sameAs: company.social.map((link) => link.href) }),
  };
  const webSite = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "en-GB",
    publisher: { "@id": organizationId },
  };
  const faqPage = {
    "@type": "FAQPage",
    "@id": `${site.url}/#questions`,
    mainEntity: questions.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return { "@context": "https://schema.org", "@graph": [organization, webSite, faqPage] };
}

/** The address of the registered office, as the pages print it. */
export function registeredOffice(): string | null {
  return company.address === null ? null : formatAddress(company.address);
}

/** The JSON for a script element. "<" is escaped so the text can never close the element. */
export function structuredDataJson(): string {
  return JSON.stringify(structuredData()).replace(/</g, "\\u003c");
}
