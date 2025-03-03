import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en-US', 'vi-VN'],
    defaultLocale: 'en-US',
    localeDetection: false,

  }
};

export default nextConfig;
