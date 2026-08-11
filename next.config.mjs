/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // Defense-in-depth. App is static + stateless; inline scripts come only
    // from Next.js itself and our no-flash theme snippet.
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://www.gstatic.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://www.google-analytics.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com https://*.doubleclick.net https://adservice.google.com https://www.google.com",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://www.google.com",
      // AdSense renders creatives inside cross-origin iframes.
      "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com https://www.google.com https://www.google.com.adsensecustomsearchads.com https://adservice.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // FOT 修复：公开页加边缘缓存（Next.js 默认 max-age=0 每次回源验证）。
      // 排除 /api（接口）、/upload（上传处理）；覆盖 sitemap.xml/robots.txt 与全部公开页
      // （含 /en/pricing 等语言前缀页、博客、隐私政策等）。
      {
        source: '/:path((?!api|upload).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
