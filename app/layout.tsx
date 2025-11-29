import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "ShiftPilot - Planification Intelligente",
  description: "Simplifiez la gestion de vos équipes avec ShiftPilot.",
  manifest: "/manifest.json",
  themeColor: "#3B82F6",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevent zooming on inputs in mobile
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ShiftPilot",
  },
};

import { ScrollToTop } from "@/components/shared/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <meta name="application-name" content="ShiftPilot" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ShiftPilot" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${inter.variable} ${ibmPlexSans.variable} font-sans antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100`}
      >
        <ScrollToTop />
        {children}
        <Toaster richColors position="top-right" theme="system" />
      </body>
    </html>
  );
}
