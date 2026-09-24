import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function GlobalNotFound() {
  return (
    <html lang="en-GB">
      <body>
        <main>
          <h1>Page not found</h1>
          <p>
            <Link href="/">Go to the home page</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
