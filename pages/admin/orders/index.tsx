import Card from '@components/common/card';
import AppLayout from '@components/layouts/app';
import OrderList from '@components/order/order-list';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { useTime } from '@hooks/useTime';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import { fetcher, limit } from '@utils/utils';
import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import useSwr from 'swr';

interface TCategory {
  orders: any[];
  count: number;
}
export default function Orders({ client }: SSRProps) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { current } = useTime();
  const key = page ? [`/api/admin/order/orders/${page}?time=`, current] : null;
  const { data, error, isLoading } = useSwr<TCategory>(key, fetcher);

  const { orders = [], count = 0 } = data ?? {};

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
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading pb-3">
            {t('form:input-label-orders')}
          </h1>
        </div>
      </Card>

      <OrderList
        orders={orders}
        total={count}
        onPagination={handlePagination}
        currentPage={page}
        perPage={limit}
      />
    </>
  );
}

Orders.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale!, [
        'form',
        'common',
        'table',
        'error'
      ])),
      client
    }
  };
};
