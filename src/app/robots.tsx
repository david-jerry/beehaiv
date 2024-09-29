import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/dashboard/", "/accounts/"],
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        disallow: "/",
      },
    ],
    sitemap: "https://beehaiv.jeremiahedavid.online/sitemap.xml",
  };
}
