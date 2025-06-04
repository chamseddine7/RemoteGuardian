import { GeistSans } from 'geist/font/sans'; // Import from the local package
import { GeistMono } from 'geist/font/mono'; // Import from the local package
import './globals.css'; // Ensure this path is correct (should be if fixed previously)
import { Toaster } from "@/components/ui/toaster";

// No need to call GeistSans() or GeistMono() like a function here,
// we just use their class names directly or their variable names.

export const metadata = { // Your metadata can stay the same
  title: 'Remote Guardian',
  description: 'Secure remote management for your devices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      {/* NO WHITESPACE OR {" "} HERE */}
      <head>
        {/* You can add meta tags, title (though metadata object is preferred) here */}
      </head>
      {/* NO WHITESPACE OR {" "} HERE EITHER */}
      <body className={`antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
