import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const origin = `${host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https"}://${host}`;
  return {
    title: {
      default: "Hacktoberfest Cebu 2026 — Made in Cebu. Open to everyone.",
      template: "%s | Hacktoberfest Cebu",
    },
    description:
      "Find your people. Build in the open. Discover Cebu’s next chapter of Hacktoberfest this October 3, 10, 18, and 25, 2026.",
    icons: {
      icon: "/favicon.png",
    },
    metadataBase: new URL(origin),
    openGraph: {
      type: "website",
      locale: "en_PH",
      siteName: "Hacktoberfest Cebu",
      title: "Hacktoberfest Cebu 2026 — Made in Cebu. Open to everyone.",
      description: "Four October dates. A community that keeps going.",
      images: [
        {
          url: `${origin}/og.png`,
          alt: "Hacktoberfest Cebu 2026. Made in Cebu. Open to everyone. October 03, 10, 18, 25.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Hacktoberfest Cebu 2026",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
