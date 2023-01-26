import Layout from '@store/containers/layout/layout';
import TermsPageContent from '@store/containers/term/terms';
import Head from 'next/head';

export default function FAQ() {
  return (
    <Layout style={{ height: 'auto' }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>Terms &amp; Condition</title>
      </Head>

      <div className="px-0">
        <TermsPageContent />
      </div>
    </Layout>
  );
}
