// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Footer from "./components/Footer"; // Import the Footer component
import Main from "./page";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Main fontClass={inter.className} />
        <Footer fontClass={pressStart2P.className} />
      </body>
    </html>
  );
}
