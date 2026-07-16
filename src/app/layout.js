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
  title: "Premium Real Estate in Navi Mumbai | Vishesh Group",
  description: "Discover luxury real estate and premium commercial spaces in Navi Mumbai, Panvel, Taloja, and Akurli with Vishesh Group. Explore Balaji Symphony, Balaji Evergreen, and Balaji Evara.",
};

import AnimatedCursor from "../components/AnimatedCursor";
import WhatsAppButton from "../components/WhatsAppButton";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-zinc-900">
        <AnimatedCursor />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

