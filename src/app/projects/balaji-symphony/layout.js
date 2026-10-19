export const metadata = {
  title: "Balaji Symphony, Panvel | 2 BHK (₹88L+) & 2.5 BHK (₹1Cr+) by Vishesh Group",
  description:
    "Discover Balaji Symphony in New Panvel, Navi Mumbai. A 10-acre landmark township of 11 high-rise towers (G+30 to 33 storeys) offering luxury 2 BHK residences from ₹88 Lakhs+ and 2.5 BHK suites from ₹1 Crore+. Download official brochures and RERA documents.",
  keywords: [
    "Balaji Symphony",
    "Balaji Symphony Panvel",
    "Vishesh Group Balaji Symphony",
    "2 BHK flats Panvel 88 Lakhs",
    "2.5 BHK flats Panvel 1 Crore",
    "luxury apartments Panvel",
    "Navi Mumbai real estate",
    "flats near Panvel station",
    "Balaji Symphony floor plan",
    "Balaji Symphony price",
    "Balaji Symphony RERA",
  ],
  alternates: {
    canonical: "https://thevisheshgroup.com/projects/balaji-symphony",
  },
  openGraph: {
    title: "Balaji Symphony, Panvel | 2 BHK ₹88L+ & 2.5 BHK ₹1Cr+ | Vishesh Group",
    description:
      "Explore 2 BHK & 2.5 BHK luxury residences in New Panvel. 10-acre township with G+30 to 33 storeys, sky-amenities, and panoramic hill views. 2 BHK starting ₹88L+, 2.5 BHK starting ₹1Cr+.",
    url: "https://thevisheshgroup.com/projects/balaji-symphony",
    siteName: "Vishesh Realty",
    images: [
      {
        url: "/projects/balaji-symphony/images/Front_eve_view_F.jpg",
        width: 1200,
        height: 800,
        alt: "Balaji Symphony Front Evening Exterior View",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balaji Symphony | 2 BHK (₹88L+) & 2.5 BHK (₹1Cr+) in Panvel",
    description:
      "10-acre township with 11 high-rise towers (G+30 to 33 storeys) in New Panvel by Vishesh Group. 2 BHK ₹88 Lakhs+, 2.5 BHK ₹1 Crore+.",
    images: ["/projects/balaji-symphony/images/Front_eve_view_F.jpg"],
  },
};

export default function BalajiSymphonyLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: "Balaji Symphony",
    description:
      "10-acre luxury residential township in New Panvel, Navi Mumbai featuring 11 monolithic high-rise towers (G+30 to 33 storeys) offering 2 BHK residences from ₹88 Lakhs+ and 2.5 BHK suites from ₹1 Crore+ with 33+ sky amenities.",
    url: "https://thevisheshgroup.com/projects/balaji-symphony",
    image: "https://thevisheshgroup.com/projects/balaji-symphony/images/Front_eve_view_F.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Survey No. 45/4, Sukhapur, New Panvel",
      addressLocality: "Panvel, Navi Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "410206",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.9847",
      longitude: "73.1066",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "8800000",
      highPrice: "10000000",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: "Vishesh Group",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
