// src/app/layout.tsx
"use client";

import React from 'react'; // Explicitly import React
import '../globals.css'; // Direct path to global styles
// Temporarily remove Toaster and font imports to simplify

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
