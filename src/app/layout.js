import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Vishesh Group | Premium Modern Luxury Real Estate & Corporate Spaces",
  description: "Experience modern luxury, corporate excellence, and premium spaces designed by Vishesh Group. Explore our businesses: Real Estate, Coworking, Education, and Horticulture.",
};

import AnimatedCursor from "../components/AnimatedCursor";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-zinc-900">
        <AnimatedCursor />
        {children}
      </body>
    </html>
  );
}

