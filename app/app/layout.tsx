import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Main from "./page";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Retro Rings: Paris Olympics | 2024 Analysis and Predictions",
  description:
    "Hey? What are you doing. Join us to Analyze & Predict the Paris 2024 Olympics, in an 8-bit RPG vibe!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.className} cursor-default`}>
        {/* <Main fontClass={pressStart2P.className} /> */}
        {children}
        <Footer fontClass={pressStart2P.className} />
      </body>
    </html>
  );
}
