import DefaultSeo from '@components/ui/default-seo';
import { useErrorLogger } from '@hooks/useErrorLogger';
import CategoryHeader from '@store/components/CategoryHeader';
import Layout from '@store/containers/layout/layout';
import Products from '@store/containers/products';
import { useRefScroll } from '@store/helpers/use-ref-scroll';
import { Category, HeroBannerType, Product } from '@ts-types/generated';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface props {
  categories: Category[];
  category: Category;
  banners: HeroBannerType[];
  products: Product[];
  error: any;
}

export default function Home({ categories, category, products, error }: props) {
  useErrorLogger(error);
  const { elRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -100
  });

  console.log('category :>', { category, categories, products });

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
      <CategoryHeader category={category} />
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
  let category = {};
  let error = null;
  try {
    categories = await fetch(`${process.env.URL}/api/store/category/categories`)
      .then((data) => data.json())
      .then(({ categories }) => categories ?? []);

    const data = await fetch(
      `${process.env.URL}/api/store/category/${params?.name}`
    ).then((data) => data.json());
    products = data?.products ?? [];
    category = data?.category ?? {};
  } catch (err) {
    console.log('error :::>', err);
    error = err?.message ?? null;
  }

  return {
    props: {
      products,
      categories,
      category,
      error
    },
    revalidate: 60 // Every minute,
  };
};
