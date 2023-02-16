import { useSettings } from '@contexts/settings.context';
import { useErrorLogger } from '@hooks/useErrorLogger';
import CategoryHeader from '@store/components/CategoryHeader';
import Layout from '@store/containers/layout/layout';
import Products from '@store/containers/products';
import { useRefScroll } from '@store/helpers/use-ref-scroll';
import {
  Category,
  HeroBannerType,
  Product,
  Settings
} from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

interface props {
  categories: Category[];
  category: Category;
  banners: HeroBannerType[];
  products: Product[];
  settings: Settings;
  error: any;
}

export default function Home({
  categories,
  category,
  settings,
  products,
  error
}: props) {
  useErrorLogger(error);
  const { elRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -100
  });

  const { updateSettings } = useSettings();

  useEffect(() => {
    if (!isEmpty(settings)) {
      updateSettings(settings);
    }
  }, [settings]);

  const { name = '', description = '', image = '' } = category ?? {};
  const {
    storeName = '',
    seo: { twitterHandle = '' } = {},
    favicon: { image: faviconImage = '' }
  } = settings ?? {};

  return (
    <Layout categories={categories}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content={description} />
        <title>{name}</title>
      </Head>
      <NextSeo
        title={name}
        description={description}
        titleTemplate={name ?? 'store'}
        canonical={`${process.env.URL}/category/${name}`}
        openGraph={{
          url: `${process.env.URL}/category/${name}`,
          title: name,
          description: description,
          images: [
            {
              url: `${process.env.S3_ENDPOINT}/${image}`,
              width: 900,
              height: 800,
              alt: 'Og Image'
            },
            { url: `${process.env.S3_ENDPOINT}/${image}` }
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
      <div className="w-full max-w-[1380px] mx-auto">
        <CategoryHeader category={category} />
        <Products items={products} ref={elRef} label={name} />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          name: 'category'
        }
      }
    ],
    fallback: true
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let products = [],
    categories = [],
    category = {},
    error = null,
    settings = {};
  try {
    categories = await fetch(`${process.env.URL}/api/store/category/categories`)
      .then((data) => data.json())
      .then(({ categories }) => categories ?? []);

    const data = await fetch(
      `${process.env.URL}/api/store/category/${params?.name}`
    ).then((data) => data.json());
    products = data?.products ?? [];
    category = data?.category ?? {};

    settings = await fetch(`${process.env.URL}/api/store/settings`)
      .then((data) => data.json())
      .then(({ settings }) => settings ?? {});
  } catch (err) {
    console.log('error :::>', err);
    error = err?.message ?? null;
  }

  return {
    props: {
      products,
      categories,
      category,
      settings,
      error
    },
    revalidate: 60 * 5
  };
};
