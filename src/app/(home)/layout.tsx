import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "./layout.css"

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Yigitus Blog",
  description: "A blog",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header role="heading" aria-level={1}></header>
        <main>{children}</main>
        <aside></aside>
        <footer></footer>
      </body>
    </html>
  );
}
