import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--f-serif",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--f-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--f-mono",
});

export const metadata: Metadata = {
  title: "Ankit Premi — Software Engineer",
  description: "AI/ML Engineer specializing in GenAI, Agentic AI, and MLOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className={`${cormorant.variable} ${syne.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}
