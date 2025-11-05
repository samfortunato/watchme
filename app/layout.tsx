import type { Metadata } from "next";
import Link from 'next/link';

import "./globals.css";

export const metadata: Metadata = {
  title: "watchme",
  description: "A generic video sharing platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">watchme</Link>

          <nav>
            <ul>
              <li>
                <Link href="/upload">Upload</Link>
              </li>
            </ul>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
