import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "./layout.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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
        <Header />
        {/* <div className="hero"></div> */}
        <main>{children}</main>
        <Sidebar />
        <footer></footer>
      </body>
    </html>
  );
}
