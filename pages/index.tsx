import HeroBlock from '@store/containers/hero-block';
import HowItWorks from '@store/containers/how-it-works';
import InstagramReview from '@store/containers/instagram-review';
import Layout from '@store/containers/layout/layout';
import Products from '@store/containers/products';
import { useSearch } from '@store/contexts/search/use-search';
import { getProducts } from '@store/helpers/get-products';
import { useRefScroll } from '@store/helpers/use-ref-scroll';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Home({ products }) {
  const { elRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -100
  });
  const { searchTerm } = useSearch();
  useEffect(() => {
    if (searchTerm) return scroll();
  }, [searchTerm]);

  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>Medsy</title>
      </Head>

      <HeroBlock />
      <HowItWorks />
      <Products items={products} ref={elRef} />
      <InstagramReview />
    </Layout>
  );
}

export async function getServerSideProps() {
  const products = []; // await getProducts();

  return {
    props: {
      products
    }
  };
}
