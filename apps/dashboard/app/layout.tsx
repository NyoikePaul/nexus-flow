import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({ src: "./fonts/GeistVF.woff",     variable: "--font-geist-sans", display: "swap" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title:       { default: "NexusFlow — Logistics Command Center", template: "%s | NexusFlow" },
  description: "Real-time shipment tracking and AI-powered risk analysis for global supply chains.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://nexus-flow.vercel.app"),
  openGraph: { title: "NexusFlow", description: "Enterprise Logistics Command Center", type: "website" },
  twitter:   { card: "summary_large_image", title: "NexusFlow" },
  robots:    { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#2563eb" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
