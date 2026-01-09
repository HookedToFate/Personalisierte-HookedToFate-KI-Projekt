import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Effective Board of Fate",
  description: "Zentralisierungs_Projekt_BIG.DATA.OMEGA V1.0 - Andre's personalized KI-Agent & tool centralization platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
