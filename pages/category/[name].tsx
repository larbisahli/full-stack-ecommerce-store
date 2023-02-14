import DefaultSeo from '@components/ui/default-seo';
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

  return (
    <Layout categories={categories}>
      <DefaultSeo />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content={category?.description} />
        <title>{category?.name}</title>
      </Head>
      <div className="w-full max-w-[1380px] mx-auto">
        <CategoryHeader category={category} />
        <Products items={products} ref={elRef} label={category?.name} />
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
    revalidate: 60*5
  };
};
