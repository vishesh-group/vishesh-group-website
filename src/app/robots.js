export default function robots() {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: "https://thevisheshgroup.com/sitemap.xml",
    host: "https://thevisheshgroup.com",
  };
}
