import { useErrorLogger } from '@hooks/useErrorLogger';
import HeroBlock from '@store/containers/banner/hero-block';
import HowItWorks from '@store/containers/how-it-works';
import InstagramReview from '@store/containers/instagram-review';
import Layout from '@store/containers/layout/layout';
import Products from '@store/containers/products';
import { useSearch } from '@store/contexts/search/use-search';
import { useRefScroll } from '@store/helpers/use-ref-scroll';
import Head from 'next/head';
import { useEffect } from 'react';
import Category from 'repositories/category';

const hero = [
  {
    id: 1,
    destinationUrl: '/',
    thumbnail: { image: '/shop.jpg' },
    title: 'Welcome to my store',
    description: 'Hello this is my cool store',
    btnLabel: 'More',
    styles: {
      textColor: '#000',
      btnBgc: '#fff',
      btnTextColor: '#000'
    },
    displayOrder: 0
  }
];

interface props {
  categories: Category[];
  error: any;
}

export default function Home({ categories, error }: props) {
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

  console.log('index :>', categories);

  return (
    <Layout categories={categories}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>Medsy</title>
      </Head>

      <HeroBlock heroBanners={hero} />
      <HowItWorks />
      <Products items={[]} ref={elRef} />
      <InstagramReview />
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await fetch(
    `${process.env.URL}/api/store/category/categories`
  )
    .then((data) => data.json())
    .then(({ categories }) => categories);

  return {
    props: {
      categories,
      error: null
    },
    revalidate: 60 // Every minute
  };
}
