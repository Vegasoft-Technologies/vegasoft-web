// Every word on the Contact page that is not already on the home page: the body and hint
// sentences are the home page's, imported where the page is rendered.

export const contact = {
  meta: {
    title: "Contact",
    description:
      "Tell us about a job your team repeats by hand. We reply within one working day.",
  },
  title: "Tell us about the job.",
  details: {
    title: "How to reach us",
    replyLabel: "Reply",
  },
  /** Shown only in development, where the form will go. */
  formPlaceholder: "Contact form: added with the server work",
};
