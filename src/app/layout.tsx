import type { Metadata } from "next";
import { Source_Serif_4, Manrope } from "next/font/google";
import "./globals.css";

const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Umar Ahmad — Software Engineer",
  description:
    "Architecting production systems across web, mobile, and applied AI. Portfolio of Umar Ahmad.",
  authors: [{ name: "Umar Ahmad" }],
  openGraph: {
    title: "Umar Ahmad — Software Engineer",
    description:
      "Production systems across web, mobile, and applied AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${display.variable} ${body.variable} bg-background font-sans text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
