import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
// import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata = {
  title: "Keyspace — Property Rental & Booking Platform",
  description: "Find a home that's already been checked.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}