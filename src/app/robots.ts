import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard", // matches /dashboard and /dashboard/*
          "/api", // matches /api and /api/*
          "/club-invite", // matches /checkout-status and /checkout-status/*
        ],
      },

    ],
    sitemap: "https://www.1beatclub.com/sitemap.xml",
  };
}
