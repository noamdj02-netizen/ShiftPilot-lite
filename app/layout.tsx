import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ShiftPilot Lite | Plannings resto simplifiés",
  description:
    "Générez vos plannings restaurant en 2 clics. Fini Excel. Simple, rapide, 19€/mois.",
  keywords: [
    "planning restaurant",
    "gestion shifts",
    "planning employés",
    "horaires resto",
  ],
  openGraph: {
    title: "ShiftPilot Lite | Plannings resto simplifiés",
    description: "Générez vos plannings restaurant en 2 clics.",
    url: "https://shiftpilot.fr",
    siteName: "ShiftPilot",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

