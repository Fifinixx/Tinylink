import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiny Link",
  description: "Shorten your url",
};

import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg- relative flex flex-col justify-center items-center p-10 gap-8`}
      >
        <ThemeProvider
           attribute="class"
           defaultTheme="system"
           enableSystem
           disableTransitionOnChange>
                <h1 className="text-3xl text-neutral-300">TINY LINK</h1>

        {children}
        <Toaster />
        </ThemeProvider>
        <footer className="text-sm p-2 bg-neutral-800 text-neutral-300 w-full text-center fixed bottom-0">Debmalya Maity Candidate ID: Naukri1125</footer>
      </body>
    </html>
  );
}
