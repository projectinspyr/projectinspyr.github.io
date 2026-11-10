import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// GitHub Pages build (PAGES_EXPORT=1): fully static, so no image server and no custom headers.
const staticExport = process.env.PAGES_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const, trailingSlash: true } : {}),
  // Static export cannot use cacheComponents; scripts/prepare-pages.mjs adjusts the image routes for it.
  ...(staticExport ? {} : { cacheComponents: true, partialPrefetching: true }),
  // The /keystatic editor redirects localhost to 127.0.0.1 during local setup.
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    // The site and the /keystatic editor have separate root layouts, so 404s need their own file.
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
    ...(staticExport ? { unoptimized: true } : {}),
  },
  ...(staticExport
    ? {}
    : {
        async headers() {
          return [{ source: "/(.*)", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
