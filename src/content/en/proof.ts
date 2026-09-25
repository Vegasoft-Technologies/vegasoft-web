// Proof a visitor can check. Real, named and with permission only: nothing is invented,
// and each list stays empty until the owner supplies an entry and the person or business
// named has agreed to it. In deployed builds an empty list renders nothing; in
// `npm run dev` a placeholder shows where it would appear.

export type Testimonial = { quote: string; name: string; role: string; business: string };
export type CaseStudy = { title: string; summary: string; href: string };

export const proof = {
  title: "Clients and work",
  testimonials: {
    title: "What clients say",
    placeholder: "Testimonials: to be added, real and named only",
    items: [] as Testimonial[],
  },
  caseStudies: {
    title: "Case studies",
    placeholder: "Case studies: to be added, real and named only",
    items: [] as CaseStudy[],
  },
};
