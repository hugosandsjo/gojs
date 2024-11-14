import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Gojs",
  description: "Gojs is a webshop for local artists to sell their work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
