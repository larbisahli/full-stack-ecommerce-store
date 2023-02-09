import { useSettings } from '@contexts/settings.context';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';

const DefaultSeo = () => {
  const {
    seo: {
      metaTitle,
      metaDescription,
      ogDescription,
      ogTitle,
      ogImage,
      twitterHandle
    },
    canonicalUrl,
    storeName
  } = useSettings();

  return (
    <NextDefaultSeo
      title={metaTitle ?? 'Store'}
      titleTemplate={metaTitle ?? 'E-Commerce'}
      description={metaDescription || ''}
      canonical={canonicalUrl ?? ''}
      openGraph={{
        title: ogTitle,
        description: ogDescription,
        type: 'website',
        locale: 'en_US',
        site_name: storeName,
        images: [
          {
            url: `${process.env.S3_ENDPOINT}/${ogImage?.image}`,
            width: 800,
            height: 600,
            alt: ogTitle
          }
        ]
      }}
      twitter={{
        handle: twitterHandle,
        site: storeName
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1 maximum-scale=1'
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]}
      additionalLinkTags={[
        {
          rel: 'apple-touch-icon',
          href: 'icons/apple-icon-180.png'
        },
        {
          rel: 'manifest',
          href: '/manifest.json'
        }
      ]}
    />
  );
};

export default DefaultSeo;
