const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "randomuser.me"],
  },
  // Other Next.js configuration options can go here
};

module.exports = withBundleAnalyzer(nextConfig);
