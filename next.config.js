/**
 * @type {import('next').NextConfig}
 */

// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');
const { i18n } = require('./next-i18next.config');
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error', 'warn']
  //   }
  // },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true
      }
    ];
  },
  i18n,
  // pwa: {
  //   disable: process.env.NODE_ENV === 'development',
  //   dest: 'public',
  //   runtimeCaching
  // },
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // iconSizes: [],
    domains: ['127.0.0.1', 'ecom-bucket.fra1.digitaloceanspaces.com'],
    path: '/_next/image',
    loader: 'default'
  },
  env: {
    URL: 'http://127.0.0.1:3001',
    MEDIA_URL: 'https://media.dropgala.com',
    GTAG_MEASUREMENT_ID: 'G-TQMWTHM2FF',
    // NEXT_PUBLIC_GOOGLE_MAP_API_KEY: 'AIzaSyDB2j-G5LJM0yPNG0AqziJjgh1UOW10W7I',
    FB_APPID: '',
    // SENTRY_DSN: '',
    // NEXT_PUBLIC_SENTRY_DSN: '',
    // SENTRY_AUTH_TOKEN: ''
    POSTGRES_USER: 'crud_user',
    POSTGRES_PASSWORD: 'crud_password',
    POSTGRES_DB: 'development',
    PORT: 5432,
    END_POINT: '127.0.0.1',
    S3_BUCKET_NAME: 'ecom-bucket',
    S3_REGION: 'fra1',
    S3_ACCESS_KEY_ID: 'DO00H9TH8LTB7GVXQD2X',
    S3_SECRET_ACCESS_KEY: 'vgNsUneQXlOGcZP7blBiuxkh0AvKLBRQg5D5frE+dVo',
    S3_ENDPOINT: 'https://ecom-bucket.fra1.digitaloceanspaces.com'
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

const SentryWebpackPluginOptions = { silent: true };

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);

// module.exports = withSentryConfig(
//   withPWA(moduleExports),
//   SentryWebpackPluginOptions
// );
