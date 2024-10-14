/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OMDB_API_KEY: process.env.OMDB_API_KEY,
  },
  images: {
    domains: ['image.tmdb.org'], // Add the domain here
  },
};

export default nextConfig;
