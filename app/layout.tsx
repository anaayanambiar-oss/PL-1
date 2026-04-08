import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "PoliticaLearn — Civics for Indian Kids",
  description:
    "The first civics platform built for Indian children aged 7–13. Learn how your government works, why your vote matters — and how you can shape the world around you.",
  keywords: ["civics", "India", "children", "education", "government", "politics"],
  openGraph: {
    title: "PoliticaLearn — Learn. Lead. Change.",
    description: "A free civic education platform for Indian children aged 7–13.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <head>
          {/* Baloo 2 (display/headings) + Plus Jakarta Sans (body) — loaded via CDN */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="min-h-full antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
