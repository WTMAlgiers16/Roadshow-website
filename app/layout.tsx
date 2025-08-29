import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { DestinationsProvider } from "@/contexts/destinations"
import { useDestinationsData } from "@/hooks/useDestinationsData"

// Montserrat Font
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// Lemon Juice Font
const lemonJuice = localFont({
  src: "../public/fonts/LemonJuice.otf",
  variable: "--font-lemon-juice",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UniTour - WTM Algiers Roadshow",
  description: "WTM Algiers Roadshow - Explore the world with UniTour",
  icons: {
    icon: "/favicon.svg",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${montserrat.variable} ${lemonJuice.variable} md:px-16 px-3 pb-32 pt-8 flex flex-col gap-0`}
      >
        <DestinationsProvider firestoreHook={useDestinationsData}>
          {children}
        </DestinationsProvider>
      </body>
    </html>
  );
}
