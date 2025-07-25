// app/layout.tsx
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "./client-layout";
import "./globals.css";

const montserrat = Montserrat({
  display: "swap",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    default: "Online Store",
    template: "%s | Online Store",
  },
  description: "Discover and shop top-quality products in our modern online store. Fast checkout, mobile-ready, and user-friendly!",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#ff6600",
      },
    ],
  },
  keywords: ["online store", "ecommerce", "shop", "buy online", "fashion", "electronics", "books"],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Online Store",
    description: "Shop a wide range of products with the best deals and fast delivery.",
    url: "https://yourstore.com",
    siteName: "Online Store",
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "Online Store preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Store",
    description: "Browse the best deals in our modern and responsive online store.",
    images: ["/favicon.svg"],
    creator: "@your_twitter_handle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
