import { useSettings } from '@contexts/settings.context';
import Breadcrumb from '@store/components/breadcrumb';
import Layout from '@store/containers/layout/layout';
import ProductDetails from '@store/containers/product/product-details';
import { Category, Product, Settings } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { GetStaticProps } from 'next';
import { NextSeo, ProductJsonLd } from 'next-seo';
import { useEffect } from 'react';

interface ProductProps {
  product: Product;
  categories: Category[];
  settings: Settings;
}

export default function ProductPage({
  product,
  categories,
  settings
}: ProductProps) {
  const { updateSettings } = useSettings();

  useEffect(() => {
    if (!isEmpty(settings)) {
      updateSettings(settings);
    }
  }, [settings]);

  const {
    storeName = '',
    seo: { twitterHandle = '' } = {},
    favicon: { image: faviconImage = '' } = {}
  } = settings ?? {};
  const {
    name = '',
    shortDescription = '',
    slug = '',
    thumbnail: { image = '' } = {}
  } = product ?? {};

  return (
    <Layout style={{ height: 'auto' }} categories={categories}>
      <NextSeo
        title={name}
        description={shortDescription}
        titleTemplate={name ?? 'store'}
        canonical={`${process.env.URL}/${slug}`}
        openGraph={{
          url: `${process.env.URL}/${slug}`,
          title: name,
          description: shortDescription,
          images: [
            {
              url: `${process.env.S3_ENDPOINT}/${image}`,
              width: 900,
              height: 800,
              alt: 'Og Image'
            },
            { url: `${process.env.S3_ENDPOINT}/${image}` },
            ...(product?.gallery?.map(({ image: gaImage }) => ({
              url: `${process.env.S3_ENDPOINT}/${gaImage}`
            })) ?? [])
          ],
          site_name: storeName ?? ''
        }}
        twitter={{
          handle: twitterHandle,
          site: storeName,
          cardType: 'summary_large_image'
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
            rel: 'icon',
            href: `${process.env.S3_ENDPOINT}/${faviconImage}`
          },
          {
            rel: 'apple-touch-icon',
            href: `${process.env.S3_ENDPOINT}/${faviconImage}`,
            sizes: '76x76'
          },
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
      <ProductJsonLd
        productName={product?.name}
        images={product?.gallery?.map(
          ({ image: gaImage }) => `${process.env.S3_ENDPOINT}/${gaImage}`
        )}
        description={shortDescription}
      />
      <div className="relative py-35px px-4 md:px-50px max-w-[1300px] mx-auto overflow-hidden">
        {isEmpty(product) ? (
          <div className="pt-10px h-[500px] md:pt-40px flex items-center justify-center lg:pt-20px pb-40px">
            <div className="animate-spin w-10 h-10 bg-gray-300 rounded"></div>
          </div>
        ) : (
          <>
            <div className="pt-6 lg:pt-7">
              <div className="mx-auto max-w-[1920px]">
                <Breadcrumb />
              </div>
            </div>
            <div className="mb-52">
              <ProductDetails product={product} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: 'my-product'
        }
      }
    ],
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    let revalidate = 60 * 10;
    const {
      categories = [],
      product = {},
      settings = {},
      processID = null,
      error = null
    } = await fetch(`${process.env.URL}/api/store/product/${params?.slug}`)
      .then((data) => data.json())
      .then((data) => data);

    if (!isEmpty(error)) {
      revalidate = 60;
    }

    return {
      props: {
        product,
        categories,
        settings,
        processID,
        error: JSON.stringify(error)
      },
      revalidate
    };
  } catch (err) {
    console.log('error :::>', err);
    return {
      props: {
        product: {},
        categories: [],
        settings: {},
        error: JSON.stringify(err)
      },
      revalidate: 60
    };
  }
};
