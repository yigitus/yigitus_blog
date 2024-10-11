import React from "react";
import styles from "./Header.module.css";
import { Syne } from "next/font/google";

const syne = Syne({ weight: "variable", subsets: ["latin"] });

export default function Header() {
  return (
    <header className={styles.header} role="heading" aria-level={1}>
      <a href="/" className={`${styles.logo} ${syne.className}`}>
        YİGİTUS BLOG
      </a>
      <div className={styles.menu}></div>
    </header>
  );
}
