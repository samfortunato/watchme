import type { Metadata } from "next";
import Link from 'next/link';
import { Session } from 'next-auth';

import { auth, signOut } from '@/lib/auth';

import "./globals.css";

export const metadata: Metadata = {
  title: "watchme",
  description: "A generic video sharing platform",
};

type SessionControlProps = {
  session: Session | null,
};

function SessionControl({ session }: SessionControlProps) {
  async function handleSignOut() {
    'use server';

    await signOut();
  }

  function SignOutButton() {
    return (
      <form action={handleSignOut}>
        <button>Sign Out</button>
      </form>
    );
  }

  function SignInButton() {
    return (
      <Link href="/sign-in">Sign In</Link>
    );
  }

  return session ? <SignOutButton /> : <SignInButton />;
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">watchme</Link>

          <nav>
            <ul>
              <li><SessionControl session={session} /></li>
              <li><Link href="/upload">Upload</Link></li>
            </ul>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
