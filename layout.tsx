import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PricePulse AI | Competitor Price Monitoring",
  description: "Track competitor prices automatically and get instant Telegram alerts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-zinc-950 text-zinc-50">
        {children}
      </body>
    </html>
  );
}
