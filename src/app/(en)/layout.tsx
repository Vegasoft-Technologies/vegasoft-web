import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://vegasoft.co.uk"),
  title: "Vegasoft Technologies",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
