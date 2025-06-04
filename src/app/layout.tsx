"use client"; // Keep this if you added it, though root layouts are usually Server Components unless specific client hooks are needed directly in them.

import React from 'react';
import { Geist_Sans } from 'next/font/google'; // Corrected import name if using Geist v1+
import { Geist_Mono } from 'next/font/google'; // Corrected import name
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Keep this if Toaster component is ready

const geistSans = Geist_Sans({ // Use the imported name
  variable: '--font-geist-sans',
  subsets: ['latin'], // Add subsets if needed, or remove if not
});

const geistMono = Geist_Mono({ // Use the imported name
  variable: '--font-geist-mono',
  subsets: ['latin'], // Add subsets if needed, or remove if not
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
