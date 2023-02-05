import DefaultSeo from '@components/ui/default-seo';
import { useErrorLogger } from '@hooks/useErrorLogger';
import Layout from '@store/containers/layout/layout';
import Products from '@store/containers/products';
import { useSearch } from '@store/contexts/search/use-search';
import { useRefScroll } from '@store/helpers/use-ref-scroll';
import { HeroBannerType, Product } from '@ts-types/generated';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Category from 'repositories/category';

interface props {
  categories: Category[];
  banners: HeroBannerType[];
  products: Product[];
  error: any;
}

export default function Home({ categories, banners, products, error }: props) {
  useErrorLogger(error);
  const { elRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -100
  });
  const { searchTerm } = useSearch();
  useEffect(() => {
    if (searchTerm) return scroll();
  }, [searchTerm]);

  console.log('index :>', { categories, banners, products });

  return (
    <Layout categories={categories}>
      <DefaultSeo />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>Store</title>
      </Head>
      <Products items={products} ref={elRef} />
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
  let products = [];
  let categories = [];
  let error = null;
  try {
    categories = await fetch(`${process.env.URL}/api/store/category/categories`)
      .then((data) => data.json())
      .then(({ categories }) => categories ?? []);

    products = await fetch(
      `${process.env.URL}/api/store/category/${params?.name}`
    )
      .then((data) => data.json())
      .then(({ product }) => product ?? {});
  } catch (err) {
    console.log('error :::>', err);
    error = err?.message ?? null;
  }

  return {
    props: {
      products,
      categories,
      error
    },
    revalidate: 60 // Every minute,
  };
};
