import Breadcrumb from '@store/components/breadcrumb';
import Layout from '@store/containers/layout/layout';
import ProductDetails from '@store/containers/product/product-details';
import { Category, Product } from '@ts-types/generated';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface ProductProps {
  product: Product;
  categories: Category[];
}

export default function ProductPage({ product, categories }: ProductProps) {
  return (
    <Layout style={{ height: 'auto' }} categories={categories}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content={product?.shortDescription} />
        <meta property="og:title" content={product?.name}></meta>
        <meta
          property="og:image"
          content={`${process.env.S3_ENDPOINT}/${product?.thumbnail?.image}`}
        ></meta>
        <meta property="og:image:width" content="436"></meta>
        <meta property="og:image:height" content="228"></meta>
        <meta
          property="og:description"
          content={product?.shortDescription}
        ></meta>
        <link
          data-rh="true"
          rel="canonical"
          href={`${process.env.URL}/product/${product?.slug}`}
        ></link>
        <title>{product?.name}</title>
      </Head>
      <div className="relative py-35px px-4 md:px-50px max-w-[1200px] mx-auto overflow-hidden">
        <div className="pt-6 lg:pt-7">
          <div className="mx-auto max-w-[1920px]">
            <Breadcrumb />
          </div>
        </div>
        <div className="mb-52">
          <ProductDetails product={product} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: 'dolor-sit-amet-consectetur-adipiscing-2'
        }
      }
    ],
    fallback: true
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let product = {};
  let categories = [];
  let error = null;
  try {
    categories = await fetch(`${process.env.URL}/api/store/category/categories`)
      .then((data) => data.json())
      .then(({ categories }) => categories ?? []);

    product = await fetch(
      `${process.env.URL}/api/store/product/${params?.slug}`
    )
      .then((data) => data.json())
      .then(({ product }) => product ?? {});
  } catch (err) {
    console.log('error :::>', err);
    error = err?.message ?? null;
  }

  return {
    props: {
      product,
      categories,
      error
    },
    revalidate: 60 // Every minute,
  };
};