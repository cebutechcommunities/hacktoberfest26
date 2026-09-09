import type { Metadata } from "next";
import { headers } from "next/headers";
import { homeTitle, homeDescription, metadataOrigin, socialMetadata } from "@/lib/seo";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const origin = metadataOrigin(requestHeaders.get("host"));
  return {
    title: {
      default: homeTitle,
      template: "%s | Hacktoberfest Cebu",
    },
    description: homeDescription,
    icons: {
      icon: "/favicon.png",
    },
    metadataBase: new URL(origin),
    ...socialMetadata(homeTitle, homeDescription, "/"),
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
