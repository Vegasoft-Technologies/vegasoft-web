// Facts about the site that appear in more than one place.

export const site = {
  name: "Vegasoft Technologies",
  /** The shorter name, offered to Google as an alternative and used by the manifest. */
  shortName: "Vegasoft",
  url: "https://vegasoft.co.uk",
  email: "hello@vegasoft.co.uk",
  phone: "+44 7767 080863",
  phoneHref: "tel:+447767080863",
  /**
   * Cloudflare Web Analytics. Public by design: it is in the markup of every page, it
   * identifies the site rather than the account, and it grants nothing. Counting is
   * switched on for the canonical host only, in Analytics.tsx.
   */
  analyticsToken: "219379cacc5b41dabc4f059fb7225fef",
  /** The one host whose visits are counted. */
  analyticsHost: "vegasoft.co.uk",
} as const;
