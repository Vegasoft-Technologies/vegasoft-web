import Script from "next/script";
import { site } from "@/content/site.ts";

// Cloudflare Web Analytics. It counts page views and nothing else: no cookie, no
// identifier, nothing that follows a visitor between sites, which is why the privacy
// notice can say what it says.
//
// The same build answers on the canonical address and on the Worker's own workers.dev
// address, so which one a visitor is on can only be known in the browser. This loads
// the beacon from the host that counts and nowhere else, which keeps previews and
// workstation runs out of the figures. The element it creates carries exactly the
// attributes Cloudflare's snippet gives.

const beacon = "https://static.cloudflareinsights.com/beacon.min.js";

const loader = `
if (location.hostname === ${JSON.stringify(site.analyticsHost)}
    && !document.querySelector("script[data-cf-beacon]")) {
  var s = document.createElement("script");
  s.type = "module";
  s.src = ${JSON.stringify(beacon)};
  s.defer = true;
  s.setAttribute("data-cf-beacon", ${JSON.stringify(JSON.stringify({ token: site.analyticsToken }))});
  document.head.appendChild(s);
}`.trim();

export default function Analytics() {
  return (
    <Script id="cf-analytics" strategy="afterInteractive">
      {loader}
    </Script>
  );
}
