// The questions a business asks before a first conversation, with answers drawn from
// the rest of the site: how a job is priced, what a pilot is, what happens after
// handover. The home page shows them, and search engines read them as structured data.

export type Question = { question: string; answer: string };

export const questions = {
  title: "Questions we are asked",
  intro: "Short answers to what comes up before a first conversation.",
  items: [
    {
      question: "Do we need a specification before we get in touch?",
      answer:
        "No. Describe the job in your own words: what is repeated, how often and by whom. We look at it with you, measure it and set out in writing what a system would change.",
    },
    {
      question: "How is a job priced?",
      answer:
        "In three parts. A fixed fee for the first step, agreed before it starts. A one-off price for the build, set against the written scope. And a fixed monthly fee for hosting, updates, monitoring and support after handover. There is no price list, because every job is different.",
    },
    {
      question: "What does Pilot mean on a service?",
      answer:
        "The service starts as a small trial on a single line or process. It is rolled out further only once the results have been measured.",
    },
    {
      question: "Do you work with the software we already have?",
      answer:
        "Yes. Most jobs connect the systems a business already runs, such as accounting, e-commerce, a CRM or Excel, so nothing is typed twice. Software that works but nobody dares touch can be renewed step by step, without stopping the business.",
    },
    {
      question: "What happens after the system is installed?",
      answer:
        "We install it in your environment, train your team and document how it works. Then we stay with you: maintenance, updates and monitoring, and the system is extended as your needs grow.",
    },
    {
      question: "Do you only work with manufacturers?",
      answer:
        "No. Manufacturing is one of seven areas. The others cover office work, websites and online systems, artificial intelligence, data and reporting, mobile and field teams, and infrastructure and security.",
    },
    {
      question: "What if the job is not on your list?",
      answer:
        "Tell us about it anyway. If something in your business is repeated by hand every day, it can very likely be handed to a system, and we will say plainly whether it is a fit and how long it would take.",
    },
    {
      question: "How quickly do you reply?",
      answer:
        "Within one working day. Email hello@vegasoft.co.uk or call +44 7767 080863.",
    },
    {
      question: "Who owns what you build?",
      answer:
        "You do: the code, the data and the documentation. If you ever move to someone else, we hand over everything they need to look after it.",
    },
    {
      question: "Do you come on site?",
      answer:
        "Yes, when the job needs it, for example to see a line running or to install a system. The rest of the work is done remotely.",
    },
  ] satisfies Question[],
};
