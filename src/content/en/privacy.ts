// The privacy notice. The company's own details are not repeated here: the page reads
// them from src/content/company.ts, so the legal name, the registered office and the
// company number behave exactly as they do in the footer.
//
// What each processor does with the data, and where, is taken from its own published
// page. The sources are listed in the pull request that added this page, not on the
// site, because a link to a third party's page can rot.

export const privacy = {
  meta: {
    title: "Privacy notice",
    description:
      "What this site collects, why, who processes it and what you can ask us to do about it.",
  },
  title: "Privacy notice",
  lead: "What this site collects, why, and what you can ask us to do about it.",
  updated: "Last updated: 27 September 2026",
  who: {
    title: "Who we are",
    /** {legal} and {email} are filled in from the company details. */
    text: "{legal} decides why and how the personal data described here is used. Write to {email} about anything on this page.",
  },
  collect: {
    title: "What we collect",
    items: [
      "What you type into the contact form: your name, your email address, the company you name if you fill that in, and your message. Nothing is added to it.",
      "An email or a call you send us, and our answer to it.",
      "Technical data about your request, which Cloudflare processes to serve and protect the site: your IP address, the address you asked for, the time, and what your browser says about itself.",
      "The form's spam check issues a one-time token to your browser. It sets no cookie, because pre-clearance is off, and Cloudflare says it does not read what you type into the form.",
      "This site sets no cookies and keeps nothing in your browser. There is no cookie banner because there is nothing to agree to.",
    ],
  },
  why: {
    title: "Why, and on what basis",
    items: [
      "To read your enquiry and answer it, and to do what you ask before any contract is agreed. UK GDPR Article 6(1)(b), and Article 6(1)(f) where you write for a business rather than for yourself.",
      "To keep the site available and to keep automated abuse off the form. UK GDPR Article 6(1)(f), our legitimate interest in running a site that works and is not abused.",
    ],
  },
  retention: {
    title: "How long we keep it",
    text: "An enquiry that does not lead to work is deleted after twelve months.",
    approved: false,
  },
  processors: {
    title: "Who handles it for us",
    intro:
      "Three companies handle part of this on our behalf, each under a contract that lets them use it only as we instruct. What follows is what each of them publishes about where the data goes.",
    whereLabel: "Where",
    safeguardLabel: "Transfers",
    items: [
      {
        name: "Cloudflare",
        what: "Serves and protects this site, runs the spam check on the form and, once it is switched on, counts visits without cookies and without following anyone between sites.",
        where:
          "Cloudflare says it processes this data in its data centres in the United States and Europe.",
        safeguard:
          "For data leaving the United Kingdom it relies on the EU Standard Contractual Clauses with the UK Addendum, and on its certification under the EU to US Data Privacy Framework and the UK Extension to it.",
      },
      {
        name: "Resend",
        what: "Delivers the message the contact form sends to our mailbox.",
        where: "Resend says its processing takes place primarily in the United States.",
        safeguard:
          "It relies on the EU and UK Standard Contractual Clauses with the UK Addendum, and on the EU to US Data Privacy Framework with the UK Extension.",
      },
      {
        name: "SiteGround",
        what: "Runs the mailbox that holds our email.",
        where:
          "SiteGround says it may transfer personal data worldwide, naming the EEA, the United States, Canada, Australia, Singapore, Japan and Brazil among the places.",
        safeguard:
          "It transfers either to a country the UK adequacy regulations cover or to a recipient that has signed the Standard Contractual Clauses, with the UK International Data Transfer Agreement where that applies.",
      },
    ],
  },
  rights: {
    title: "Your rights",
    text: "Under UK GDPR you can ask us for a copy of your personal data, ask us to correct or delete it, object to our using it, or ask us to limit what we do with it. Write to {email} and we answer within one month.",
    kvkk: "If you are in Turkey, the rights in Article 11 of Law 6698 on the Protection of Personal Data apply as well, and the same address reaches us.",
    complaint:
      "If our answer does not satisfy you, you can complain to the Information Commissioner's Office.",
    complaintLink: { label: "ico.org.uk", href: "https://ico.org.uk" },
  },
};
