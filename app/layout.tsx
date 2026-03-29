import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";

import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { personalInfo } from "@/constants/personal";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${personalInfo.name} · Portfolio`,
    template: `%s · ${personalInfo.name}`,
  },
  description: personalInfo.bio.slice(0, 160),
  /** Square assets in `public/` — PNG was 2816×1536 before; non-square favicons often do not show */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full scroll-smooth antialiased`}
    >
      <body
        className={`${geistSans.className} bg-background text-foreground min-h-full flex flex-col`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
