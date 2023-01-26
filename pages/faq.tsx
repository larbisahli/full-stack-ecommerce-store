import Accordion from '@store/components/accordion';
import Layout from '@store/containers/layout/layout';
import Head from 'next/head';

const accordionData = [
  {
    id: 1,
    title: 'How to contact with Customer Service?',
    details:
      'Our Customer Experience Team is available 6 days a week and we offer various ways to get in contact.Email and Chat. We try to reply quickly, so you need not to wait too long for a response!.'
  },
  {
    id: 2,
    title: 'App installation failed, how to update system information?',
    details:
      'Please read the documentation carefully. We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum'
  },
  {
    id: 3,
    title: 'Website reponse taking time, how to improve?',
    details:
      'At first, Please check your internet connection . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.'
  },
  {
    id: 4,
    title: 'How do I create a account?',
    details:
      'If you want to open an account for personal use you can do it over the phone or online. Opening an account online should only take a few minutes.'
  }
];

export default function FAQ() {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Put your description here." />
        <title>F.A.Q</title>
      </Head>

      <div className="py-35px px-4 md:p-35px">
        <h3 className="w-full flex justify-center mb-30px text-24px text-gray-900 text-center font-semibold">
          F.A.Q
        </h3>
        <Accordion items={accordionData} />
      </div>
    </Layout>
  );
}
