"use client"; // This must be the very first line for client-side functionality

// Required imports
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css'; // Your global styles
import { Toaster } from "@/components/ui/toaster"; // Your Toaster component

// Geist Font Definitions (These should be kept as they are)
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// IMPORTANT: Metadata is now defined in src/app/layout.ts
// Do NOT export metadata from this file (layout.tsx) as it is a "use client" component.
// export const metadata: Metadata = { ... }; // This line MUST NOT be here

// This is the default export, which MUST be a React Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
