// Proof a visitor can check. Real, named and with permission only: nothing is invented,
// and each list stays empty until the owner supplies an entry and the person or business
// named has agreed to it. In deployed builds an empty list renders nothing; in
// `npm run dev` a placeholder shows where it would appear.

export type Testimonial = { quote: string; name: string; role: string; business: string };
export type Client = { name: string; href: string };
export type CaseStudy = { title: string; summary: string; href: string };
export type Review = { platform: string; href: string };
export type Award = { name: string; year: string; href: string };
export type Mention = { publication: string; title: string; href: string };

export const proof = {
  title: "Clients and work",
  testimonials: {
    title: "What clients say",
    placeholder: "Testimonials: to be added, real and named only",
    items: [] as Testimonial[],
  },
  clients: {
    title: "Clients",
    placeholder: "Client names and logos: to be added, real and with permission only",
    items: [] as Client[],
  },
  caseStudies: {
    title: "Case studies",
    placeholder: "Case studies: to be added, real and named only",
    items: [] as CaseStudy[],
  },
  reviews: {
    title: "Reviews",
    placeholder: "Reviews: to be added, real and linked only",
    items: [] as Review[],
  },
  awards: {
    title: "Awards",
    placeholder: "Awards: to be added, real and linked only",
    items: [] as Award[],
  },
  press: {
    title: "In the press",
    placeholder: "Press mentions: to be added, real and linked only",
    items: [] as Mention[],
  },
};
