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
  metadataBase: new URL("https://thevisheshgroup.com"),

  title: {
    default:
      "Vishesh Realty | Premium Real Estate & Residential Projects in Navi Mumbai",
    template: "%s | Vishesh Realty",
  },

  description:
    "Discover premium residential and commercial real estate opportunities in Navi Mumbai with Vishesh Realty. Explore Balaji Symphony, Balaji Evergreen & Balaji Evara in Panvel, Taloja & Akurli — luxury living crafted for modern families.",

  keywords: [
    "Vishesh Realty",
    "Vishesh Group",
    "real estate Navi Mumbai",
    "residential projects Navi Mumbai",
    "property investment Navi Mumbai",
    "luxury apartments Panvel",
    "flats in Taloja",
    "flats in Akurli",
    "Balaji Symphony",
    "Balaji Evergreen",
    "Balaji Evara",
    "premium flats Navi Mumbai",
    "affordable housing Navi Mumbai",
    "2 BHK flats Panvel",
    "3 BHK flats Panvel",
    "new projects in Navi Mumbai",
    "RERA approved projects Navi Mumbai",
    "real estate developers Navi Mumbai",
    "best builders in Panvel",
    "upcoming projects Taloja",
    "property in Navi Mumbai",
  ],

  applicationName: "Vishesh Realty",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [
    { name: "Vishesh Realty", url: "https://thevisheshgroup.com" },
  ],
  creator: "Vishesh Realty",
  publisher: "Vishesh Realty",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: "https://thevisheshgroup.com",
  },

  openGraph: {
    title:
      "Vishesh Realty | Premium Real Estate & Residential Projects in Navi Mumbai",
    description:
      "Discover premium residential and commercial real estate opportunities in Navi Mumbai with Vishesh Realty. Explore Balaji Symphony, Balaji Evergreen & Balaji Evara — luxury living crafted for modern families.",
    url: "https://thevisheshgroup.com",
    siteName: "Vishesh Realty",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vishesh Realty — Premium Real Estate in Navi Mumbai",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Vishesh Realty | Premium Real Estate & Residential Projects in Navi Mumbai",
    description:
      "Discover premium residential and commercial real estate opportunities in Navi Mumbai with Vishesh Realty. Explore Balaji Symphony, Balaji Evergreen & Balaji Evara.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "Real Estate",
};

import WhatsAppButton from "../components/WhatsAppButton";

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Vishesh Realty",
    alternateName: "Vishesh Group",
    url: "https://thevisheshgroup.com",
    logo: "https://thevisheshgroup.com/og-image.jpg",
    description:
      "Premium real estate developer in Navi Mumbai specializing in residential projects including Balaji Symphony, Balaji Evergreen and Balaji Evara.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Navi Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.0330",
      longitude: "73.0297",
    },
    areaServed: [
      { "@type": "City", name: "Navi Mumbai" },
      { "@type": "City", name: "Panvel" },
      { "@type": "City", name: "Taloja" },
    ],
    sameAs: [],
    priceRange: "$$",
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-zinc-900">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

