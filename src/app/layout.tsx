// src/app/layout.tsx
"use client"; // REQUIRED: This MUST be the very first line for client-side components

// Import necessary libraries and components
import { Geist, Geist_Mono } from 'next/font/google'; // Your chosen fonts
import './globals.css'; // Your global CSS file
import { Toaster } from "@/components/ui/toaster"; // Shadcn UI Toaster component

// Font Definitions (these are correct)
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// IMPORTANT: Metadata MUST NOT be exported from this file (.tsx)
// It is exported from the separate src/app/layout.ts (Server Component file)

// This is the DEFAULT EXPORT, which MUST be a valid React Functional Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply font variables to the <html> tag for stability
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* Keep body className simple and static to avoid hydration mismatches */}
      <body className="font-sans antialiased">
        {children} {/* This renders your page content */}
        <Toaster /> {/* This renders your toast notifications */}
      </body>
    </html>
  );
}
