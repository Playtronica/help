/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // For dev we run normal SSR (so unknown slugs return a proper 404 instead of
  // crashing). For production static export, `npm run build` sets
  // NEXT_OUTPUT_MODE=export, which re-includes the export directive below.
  ...(process.env.NEXT_OUTPUT_MODE === "export"
    ? { output: "export", trailingSlash: true }
    : {}),
  images: { unoptimized: true },
};

module.exports = nextConfig;
