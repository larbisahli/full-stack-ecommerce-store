import LoginForm from '@components/auth/login-form';
import { verifyAuth } from '@middleware/utils';
import { ROUTES } from '@utils/routes';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment, useEffect } from 'react';

import shop from '../../public/shop.jpg';

const LoginPage = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard');
  }, []);

  return (
    <Fragment>
      <div
        className="fixed h-full w-full overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <Image
          alt="Shop-bg"
          src={shop}
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="m-auto max-w-[420px] w-full bg-light sm:shadow p-5 sm:p-8 rounded">
          <h3 className="text-center text-base italic text-body mb-6 mt-4">
            {t('admin-login-title')}
          </h3>
          <LoginForm />
        </div>
        <div className="mt-5 flex justify-center items-center text-white bg-black w-full bg-opacity-40 h-12">
          <p>© company 2022 All rights reserved</p>
          <span
            style={{ width: '1px', height: '20px' }}
            className="mx-2 bg-white"
          ></span>
          <Link href="/contact-us" passHref>
            <a>
              <p>Contact Us</p>
            </a>
          </Link>
          <span
            style={{ width: '1px', height: '20px' }}
            className="mx-2 bg-white"
          ></span>
          <Link href="/terms" passHref>
            <a>
              <p>Terms</p>
            </a>
          </Link>
          <span
            style={{ width: '1px', height: '20px' }}
            className="mx-2 bg-white"
          ></span>
          <Link href="/privacy" passHref>
            <a>
              <p>Privacy</p>
            </a>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client, error } = verifyAuth(context);

  if (client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.DASHBOARD
      }
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'form'])),
      error
    }
  };
};

export default LoginPage;
