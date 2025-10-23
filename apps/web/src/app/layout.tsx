import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mira Cars - Luxury Car Rental",
  description: "Premium luxury car rental service in Greece",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
