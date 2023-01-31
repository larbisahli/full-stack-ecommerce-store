import AppLayout from '@components/layouts/app';
import CreateOrUpdateProductForm from '@components/product/product-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { Product } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { fetcher } from '@utils/utils';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import useSwr from 'swr';

interface TProduct {
  product: Product;
}
export default function UpdateProductPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const { productId } = query;

  const random = React.useRef(Date.now());
  const key = productId
    ? [`/api/admin/product/${productId}?time=`, random.current]
    : null;
  const { data, error, isLoading } = useSwr<TProduct>(key, fetcher);

  const { product = null } = data ?? {};

  useGetStaff(client);
  useErrorLogger(error);

  if (isLoading) {
    return <Loader text={t('common:text-loading')} />;
  }

  if (error) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:edit-product')}
        </h1>
      </div>
      <CreateOrUpdateProductForm initialValues={product} />
    </>
  );
}

UpdateProductPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client } = verifyAuth(context);

  if (!client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }

  const { csrfToken, csrfError } = await XSRFHandler(context);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'form', 'error'])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
