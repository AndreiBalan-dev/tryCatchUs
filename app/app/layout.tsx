import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Main from "./page";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Olympics Paris 2024 Analysis and Predictions",
  description:
    "Welcome to the ultimate analysis and prediction site for the Paris 2024 Olympics!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Main fontClass={pressStart2P.className} />
        <Footer fontClass={pressStart2P.className} />
      </body>
    </html>
  );
}
