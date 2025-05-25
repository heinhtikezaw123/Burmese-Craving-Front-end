import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // output: 'export', // <-- enable static export
    // dynamicParams: true, 
      // distDir: "dist",
       images: {
        domains: ['s3.ap-southeast-1.amazonaws.com'],
      },


  /* config options here */
};

export default nextConfig;
