// The seven areas of work and their services, as in the services catalogue. The home
// page lists them; each area gets its own page at /services/<slug>.

export const areaSlugs = [
  "manufacturing",
  "automation",
  "websites",
  "ai",
  "data",
  "mobile",
  "infrastructure",
] as const;

export type AreaSlug = (typeof areaSlugs)[number];

export type Service = {
  name: string;
  description: string;
  /** Starts as a small trial on a single line or process. */
  pilot?: true;
};

export type Area = {
  slug: AreaSlug;
  name: string;
  promise: string;
  audience: string;
  services: Service[];
  example?: { label: string; href: string; text: string };
};

export const pilotLabel = "Pilot";

export const areas: Area[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    promise:
      "We collect machine data without anyone writing it down, and show on screen how production is really going.",
    audience: "Manufacturing plants, workshops, filling and packaging lines.",
    services: [
      {
        name: "Machine data collection",
        description:
          "We read data from PLCs, sensors and counters over OPC UA, Modbus or MQTT. No more writing meter readings on paper.",
      },
      {
        name: "OEE measurement",
        description:
          "Availability × Performance × Quality. See the true efficiency of each line as a single number, shift by shift.",
      },
      {
        name: "Downtime tracking",
        description:
          "When a machine stopped, for how long, and why. The causes that cost the most time are ranked.",
      },
      {
        name: "Live production displays",
        description:
          "Target, actual output and current line status on screens on the shop floor.",
      },
      {
        name: "Shift reports",
        description:
          "Output, scrap and downtime reports are ready the moment a shift ends.",
      },
      {
        name: "Predictive maintenance signals",
        description:
          "Flags drift in vibration, temperature or current before it turns into a breakdown.",
        pilot: true,
      },
      {
        name: "Energy monitoring",
        description:
          "How much energy each machine uses on each shift. Machines running idle become visible.",
      },
      {
        name: "Traceability",
        description:
          "Which raw material, which machine and which day a product was made, found in a single query.",
      },
    ],
  },
  {
    slug: "automation",
    name: "Business process automation",
    promise:
      "We hand the office work that gets repeated by hand every day to a system, so your team gets back to its real job.",
    audience: "Finance, sales, purchasing, HR and admin teams.",
    services: [
      {
        name: "Automated emails and notifications",
        description:
          "Order, appointment, reminder and overdue-payment messages reach the right person without anyone having to remember.",
      },
      {
        name: "Official notice tracking",
        description:
          "Logs incoming official notices and letters, adds their deadlines to the calendar and warns you as they approach.",
      },
      {
        name: "Invoice and document processing",
        description:
          "Reads incoming invoices and delivery notes and enters the details into your accounting system itself.",
      },
      {
        name: "Approval workflows",
        description:
          "Purchase, leave and expense approvals run on one screen instead of email chains. You always know who a request is waiting on.",
      },
      {
        name: "Automated reports",
        description:
          "Daily sales, weekly stock and monthly summaries arrive in your inbox every morning, ready to read.",
      },
      {
        name: "Connecting your systems",
        description:
          "Data flows on its own between accounting, e-commerce, CRM and Excel. Nothing is typed twice.",
      },
      {
        name: "WhatsApp and SMS notifications",
        description:
          "Order status, appointment reminders and delivery updates go straight to the customer's phone.",
      },
      {
        name: "Enquiry and request handling",
        description:
          "Web form submissions never get lost. Each one is recorded, routed to the right person and followed up until closed.",
      },
    ],
  },
  {
    slug: "websites",
    name: "Websites and online systems",
    promise:
      "We build sites that load fast, look right on a phone and get found on Google, with systems behind them that actually work.",
    audience:
      "Restaurants, clinics, shops, manufacturers and service firms of every size.",
    example: {
      label: "zukiscaffetteria.co.uk",
      href: "https://zukiscaffetteria.co.uk",
      text: "website and online table booking for a café in Exeter.",
    },
    services: [
      {
        name: "Company website",
        description:
          "Fast, mobile-friendly and easy to update. Built around your business, not a template.",
      },
      {
        name: "Online booking and appointments",
        description:
          "Confirms instantly against real capacity, never double-books and sends its own notifications.",
      },
      {
        name: "E-commerce",
        description: "Products, stock, payments and shipping, managed from one place.",
      },
      {
        name: "Customer and dealer portals",
        description: "Signed-in customers see their own orders, invoices and documents.",
      },
      {
        name: "Speeding up your current site",
        description:
          "We rework images and code to cut load times and the mobile data your site uses.",
      },
      {
        name: "Visibility on Google",
        description:
          "Search optimisation, Google Maps listing, rating badge and rich search results.",
      },
      {
        name: "Multilingual sites",
        description:
          "Your site in more than one language, for customers and visitors from abroad.",
      },
      {
        name: "Privacy compliance foundations",
        description:
          "Technical groundwork for cookie consent, privacy notices and data retention under GDPR and Turkey's KVKK.",
      },
    ],
  },
  {
    slug: "ai",
    name: "Artificial intelligence",
    promise:
      "We don't deploy AI for show. We deploy it to take on a specific, time-consuming job.",
    audience:
      "Teams dealing with heavy paperwork, busy inboxes or the same questions over and over.",
    services: [
      {
        name: "Document reading",
        description:
          "Pulls the details you need from invoices, contracts, forms and letters, from a PDF or a photo, into a table.",
      },
      {
        name: "Internal assistant",
        description:
          "Answers questions from your own procedures, catalogues and documents, and shows which document each answer came from.",
      },
      {
        name: "Customer service assistant",
        description:
          "Answers common questions day and night, and hands anything it can't resolve to your team.",
      },
      {
        name: "Email triage and reply drafts",
        description:
          "Sorts your inbox by topic and drafts replies. The decision to send always stays with you.",
      },
      {
        name: "Meeting and call summaries",
        description:
          "Transcribes recordings and lists the decisions made and the actions agreed.",
      },
      {
        name: "Visual quality inspection",
        description:
          "A camera spots defective products, missing parts or wrong labels on the line.",
        pilot: true,
      },
      {
        name: "Product copy and translation",
        description:
          "Catalogue descriptions, multilingual product pages and translation of technical documents.",
      },
      {
        name: "Contract and quote comparison",
        description:
          "Flags differences, missing clauses and risky wording in long documents. A specialist does the final read.",
      },
    ],
  },
  {
    slug: "data",
    name: "Data and reporting",
    promise:
      "We bring scattered spreadsheets and systems into one place, so decisions rest on numbers rather than guesswork.",
    audience: "Managers, business owners and planning teams.",
    services: [
      {
        name: "Management dashboard",
        description:
          "Sales, production, stock and cash on one screen, always up to date.",
      },
      {
        name: "From Excel to a database",
        description:
          "A structured, backed-up database in place of shared files where data gets lost or corrupted.",
      },
      {
        name: "Demand and stock forecasting",
        description:
          "Predicts the coming weeks' needs from past sales, aiming to cut both overstock and shortages.",
        pilot: true,
      },
      {
        name: "Data cleansing",
        description:
          "Duplicate records, the same customer spelled three ways and missing fields, all cleaned up.",
      },
      {
        name: "Automated alerts",
        description:
          "Warns you when stock hits a critical level or a value moves outside its normal range.",
      },
      {
        name: "Profitability analysis",
        description:
          "Which products, customers or sales channels really make money, with their costs alongside.",
      },
    ],
  },
  {
    slug: "mobile",
    name: "Mobile and field",
    promise: "Phone and tablet apps for teams who don't work at a desk.",
    audience: "Service, maintenance, delivery, warehouse and field teams.",
    services: [
      {
        name: "Field team app",
        description:
          "Manages service, maintenance and delivery jobs. Works offline and syncs once back online.",
      },
      {
        name: "Warehouse and stocktake",
        description:
          "Scan barcodes and QR codes with a phone camera. Stocktakes go paperless and fast.",
      },
      {
        name: "Digital checklists",
        description:
          "Health and safety, quality, cleaning and shift handovers recorded with photos and timestamps instead of paper forms.",
      },
      {
        name: "Customer app",
        description: "Ordering, bookings and a loyalty scheme on the customer's phone.",
      },
      {
        name: "Fault and request reporting",
        description:
          "Staff report an issue with a photo; it goes to the person responsible and is tracked until resolved.",
      },
      {
        name: "Maintenance schedule",
        description:
          "Periodic maintenance for machines and vehicles is flagged when due, with a full service history.",
      },
    ],
  },
  {
    slug: "infrastructure",
    name: "Infrastructure and security",
    promise: "We keep your systems running, secure and connected to each other.",
    audience: "Businesses that run software but have no team to look after it.",
    services: [
      {
        name: "APIs and integration",
        description: "We connect different pieces of software to each other, securely.",
      },
      {
        name: "Legacy system renewal",
        description:
          "Software that works but nobody dares touch, renewed step by step without stopping the business.",
      },
      {
        name: "Cloud setup and migration",
        description:
          "Servers, hosting and domains set up, or moved to more cost-effective infrastructure.",
      },
      {
        name: "Email deliverability",
        description:
          "We set up domain authentication records (SPF, DKIM, DMARC) so your company's email stays out of spam.",
      },
      {
        name: "Backup and recovery plan",
        description:
          "If data is lost, you know in advance what comes back and how quickly.",
      },
      {
        name: "Monitoring and alerts",
        description:
          "If your site or system goes down, you hear about it before your customers do.",
      },
      {
        name: "Security review",
        description:
          "We identify vulnerabilities, weak passwords and unnecessary access in your current systems.",
      },
      {
        name: "Access and permissions",
        description:
          "A clear record of who can access what, and confirmation that leavers lose access.",
      },
    ],
  },
];
