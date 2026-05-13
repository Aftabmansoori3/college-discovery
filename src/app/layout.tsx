import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduDiscover | Find Your Perfect College & Course",
  description: "Discover top-rated colleges, compare courses, and read authentic student reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased scroll-smooth`}>
      <body className="min-h-full bg-white dark:bg-zinc-950 flex flex-col">
        <NextTopLoader color="#4f46e5" height={3} showSpinner={false} />
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
