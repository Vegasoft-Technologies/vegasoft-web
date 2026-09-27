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
  form: {
    title: "Send us a note",
    /** Shown in place of the form when the browser runs no JavaScript. */
    noScript:
      "This form needs JavaScript. Email or call us instead and we will pick it up the same way.",
    nameLabel: "Your name",
    emailLabel: "Your email address",
    companyLabel: "Company",
    companyOptional: "optional",
    messageLabel: "What is repeated by hand, how often, and by whom?",
    /** The field a person never sees. Anything typed into it is treated as spam. */
    honeypotLabel: "Leave this field empty",
    submit: "Send",
    sending: "Sending",
    required: "This field is required.",
    badEmail: "Enter an email address we can reply to.",
    checkLabel: "Spam check",
    checkMissing: "Complete the spam check.",
    successTitle: "Thank you.",
    successText: "We reply within one working day.",
    failure: "The message did not send. Email us at",
    privacyNote: "We use what you send only to reply. Nothing is stored on this site.",
    privacyLink: "How we handle it",
  },
};
