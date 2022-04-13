/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles/')],
    prependData: `
    @import "variables.scss"; 
    @import "responsive.scss"; 
    @import "colors.scss"; 
    @import "mixins.scss"; 
    @import "animation.scss";`,
  },
  images: {
    domains: ['images.unsplash.com', 'edamam-product-images.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
