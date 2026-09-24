import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Sent with every page.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Next.js otherwise writes a block of its own guidance into local tooling files in the
  // working tree on every dev run. Those files are not part of this repository.
  agentRules: false,

  // Workers has no image optimiser, and the site's only images are SVG files.
  images: { unoptimized: true },

  experimental: {
    // There is no single root layout (English now, Turkish later), so addresses that
    // match no route are answered by app/global-not-found.tsx.
    globalNotFound: true,
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
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
