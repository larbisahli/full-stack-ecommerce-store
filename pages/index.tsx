import DefaultSeo from '@components/ui/default-seo';
import { useErrorLogger } from '@hooks/useErrorLogger';
import HeroBlock from '@store/containers/banner/hero-block';
import HowItWorks from '@store/containers/how-it-works';
import Layout from '@store/containers/layout/layout';
import Products from '@store/containers/products';
import { useSearch } from '@store/contexts/search/use-search';
import { useRefScroll } from '@store/helpers/use-ref-scroll';
import { HeroBannerType, Product } from '@ts-types/generated';
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

      <HeroBlock heroBanners={banners} />
      <HowItWorks />
      <Products items={products} ref={elRef} />
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await fetch(
    `${process.env.URL}/api/store/category/categories`
  )
    .then((data) => data.json())
    .then(({ categories }) => categories ?? []);

  const banners = await fetch(`${process.env.URL}/api/store/banner/banners`)
    .then((data) => data.json())
    .then(({ banners }) => banners ?? []);

  const products = await fetch(
    `${process.env.URL}/api/store/product/products/home/10`
  )
    .then((data) => data.json())
    .then(({ products }) => products ?? []);

  return {
    props: {
      categories,
      banners,
      products,
      error: null
    },
    revalidate: 60 // Every minute
  };
}
