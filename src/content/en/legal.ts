// The words of the footer's legal line. The values come from src/content/company.ts, so
// a change of registered office or a new company number is a one-line change there.
// {trading}, {legal}, {place}, {number} and {address} are filled in where they appear;
// each language puts them in the order its own sentence needs.

export const legal = {
  copyright: "© {trading}.",
  company: "{trading} is a trading name of {legal}, registered in {place}.",
  companyWithNumber:
    "{trading} is a trading name of {legal}, registered in {place}, company number {number}.",
  office: "Registered office: {address}.",
  vat: "VAT number {number}.",
  /** The place of registration in this language. company.ts holds its legal spelling. */
  placeNames: {} as Record<string, string>,
};
