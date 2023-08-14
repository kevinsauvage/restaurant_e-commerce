/** @type {import('next').NextConfig} */
const path = require('node:path');

const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles/')],
    prependData: `
    @import "variables.scss"; 
    @import "responsive.scss"; 
    @import "colors.scss"; 
    @import "mixins.scss"; 
    `,
  },
};

module.exports = nextConfig;
