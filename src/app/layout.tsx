import type { Metadata } from "next";
import { Geist, Sometype_Mono, Titan_One, Comfortaa } from "next/font/google";

import "./globals.css";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const titanOne = Titan_One({
  variable: "--font-titan-one",
  weight: "400",
});

const sometypeMon = Sometype_Mono({
  variable: "--font-sometype-mono",
  subsets: ["latin"],
});

export const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Spinnersonic",
  description: "A fast-paced action game where your spinner is your hero.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${sometypeMon.className} ${titanOne.variable} ${comfortaa.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
