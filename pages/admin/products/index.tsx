import Card from '@components/common/card';
import { Add } from '@components/icons/add';
import AppLayout from '@components/layouts/app';
import ProductList from '@components/product/product-list';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { useTime } from '@hooks/useTime';
import { verifyAuth } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { Product } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { fetcher, limit } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import useSwr from 'swr';

interface TProduct {
  products: Product[];
  count: number;
}

export default function ProductsPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);

  const { current } = useTime();
  const key = page
    ? [`/api/admin/product/products/${page}?time=`, current]
    : null;
  const { data, error, isLoading } = useSwr<TProduct>(key, fetcher);

  const { products = [], count = 0 } = data ?? {};

  useGetStaff(client);
  useErrorLogger(error);

  const handlePagination = (current: number) => {
    setPage(current);
  };

  if (isLoading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading pb-3">
              {t('form:input-label-products')}
            </h1>
          </div>
          <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center">
            <div className="w-full flex items-end justify-end md:items-center">
              {/* <Search onSearch={handleSearch} /> */}
              <LinkButton
                href={`${ROUTES.PRODUCTS}/create`}
                className="h-12 ms-4 md:ms-6"
              >
                <div className="hidden md:flex items-center justify-center">
                  <Add width="1rem" height="1rem" />
                  <span className="m-1">
                    {t('form:button-label-add-products')}
                  </span>
                </div>
                <div className="md:hidden flex items-center justify-center">
                  <Add width="1rem" height="1rem" />
                  <span className="m-1">{t('form:button-label-add')}</span>
                </div>
              </LinkButton>
            </div>
          </div>
        </div>
      </Card>
      <ProductList
        products={products}
        onPagination={handlePagination}
        total={count}
        currentPage={page}
        perPage={limit}
      />
    </>
  );
}

ProductsPage.Layout = AppLayout;

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

  return {
    props: {
      ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
      client
    }
  };
};
