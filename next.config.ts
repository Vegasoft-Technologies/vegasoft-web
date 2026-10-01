import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// The canonical address. HSTS is sent for this host alone: the mail names (mail, ftp,
// autoconfig and the rest) are another provider's and must not be forced to HTTPS by us,
// which is also why includeSubDomains and preload are left off.
const canonicalHost = "vegasoft.co.uk";

/**
 * What a page may load, and from where. The pages are prerendered at build time, so a
 * per-request nonce would turn every page dynamic and end static caching; Next.js inlines
 * its own bootstrap script and the page data, and the contact form carries one inline
 * <style> for the no-JavaScript fallback, so scripts and styles need 'unsafe-inline'.
 * Nothing else does. docs/security.md says what that costs and what holds the line
 * instead. Turnstile needs challenges.cloudflare.com as a script and a frame; Web
 * Analytics needs static.cloudflareinsights.com as a script, and sends to this site's own
 * /cdn-cgi/rum when Cloudflare injects it, or to cloudflareinsights.com when it does not.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "frame-src https://challenges.cloudflare.com",
  "connect-src 'self' https://cloudflareinsights.com",
  "img-src 'self' data:",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// The browser features the site never uses. An empty list means "nobody, not even us".
const permissionsPolicy = [
  "accelerometer",
  "autoplay",
  "browsing-topics",
  "camera",
  "display-capture",
  "encrypted-media",
  "fullscreen",
  "geolocation",
  "gyroscope",
  "magnetometer",
  "microphone",
  "midi",
  "payment",
  "picture-in-picture",
  "publickey-credentials-get",
  "screen-wake-lock",
  "serial",
  "usb",
  "xr-spatial-tracking",
]
  .map((feature) => `${feature}=()`)
  .join(", ");

// Sent with every page.
const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: permissionsPolicy },
];

const nextConfig: NextConfig = {
  // Next.js otherwise writes a block of its own guidance into local tooling files in the
  // working tree on every dev run. Those files are not part of this repository.
  agentRules: false,

  // Nothing is gained by telling every visitor which framework serves the page.
  poweredByHeader: false,

  // Workers has no image optimiser, and the site's only images are SVG files.
  images: { unoptimized: true },

  experimental: {
    // There is no single root layout (English now, Turkish later), so addresses that
    // match no route are answered by app/global-not-found.tsx.
    globalNotFound: true,
    // Off because @opennextjs/cloudflare 1.20 answers a segment prefetch with the whole
    // page when it is on, and the router then requests it again without end.
    prefetchInlining: false,
  },

  // The services index is not a page; it answers with the section of the home page that
  // lists every area.
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/tr/hizmetler", destination: "/tr#hizmetler", permanent: true },
      // The old site linked to the privacy notice by file name.
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      // One address for the site: www goes to the apex, keeping the path. The root and
      // the rest are separate rules, because an empty :path* is left unfilled.
      {
        source: "/",
        has: [{ type: "host", value: "www.vegasoft.co.uk" }],
        destination: "https://vegasoft.co.uk/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.vegasoft.co.uk" }],
        destination: "https://vegasoft.co.uk/:path+",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // A year, on the canonical host only. A preview address is not told to insist on
      // HTTPS for ever, and neither is anything else that shares the domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: canonicalHost }],
        headers: [{ key: "Strict-Transport-Security", value: "max-age=31536000" }],
      },
      // Preview and workers.dev addresses must never be indexed. The canonical address
      // is always https://vegasoft.co.uk.
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.workers\\.dev" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;

// In `next dev`, gives the application the same bindings it has on Cloudflare, simulated
// locally from wrangler.jsonc. Guarded so that a production build does not start it too.
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}
