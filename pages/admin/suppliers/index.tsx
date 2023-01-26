import Card from '@components/common/card';
import SortForm from '@components/common/sort-form';
import { Add } from '@components/icons/add';
import { ArrowDown } from '@components/icons/arrow-down';
import { ArrowUp } from '@components/icons/arrow-up';
import AppLayout from '@components/layouts/app';
import SuppliersList from '@components/suppliers/supplier-list';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { OrderBy, SortOrder, Suppliers } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

interface TSupplier {
  suppliers: Suppliers[];
  suppliersCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

const limit = 10;

export default function SuppliersPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  // const { data, loading, error, fetchMore } = useQuery<
  //   TSupplier,
  //   OptionsVariable
  // >(SUPPLIERS, {
  //   variables: {
  //     page,
  //     limit,
  //     orderBy,
  //     sortedBy: SortOrder.Desc
  //   },
  //   fetchPolicy: 'cache-and-network'
  // });

  const suppliersCount = 0; // data?.suppliersCount?.count;
  const suppliers = []; //data?.suppliers;

  useGetStaff(client);
  // useErrorLogger(error);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const handlePagination = (current: number) => {
    setPage(current);
  };

  // if (loading) {
  //   return <Loader text={t('common:text-loading')} />;
  // }
  // if (!isEmpty(error)) {
  //   return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  // }

  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-xl font-semibold text-heading pb-3">
              {t('common:sidebar-nav-item-suppliers')}
            </h1>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <div className="w-full flex items-center">
              <LinkButton
                href={`${ROUTES.SUPPLIERS}/create`}
                className="h-12 ms-4 md:ms-6"
              >
                <div className="hidden md:flex items-center justify-center">
                  <Add width="1rem" height="1rem" />
                  <span className="m-1">
                    {t('form:button-label-add-supplier')}
                  </span>
                </div>
                <div className="md:hidden flex items-center justify-center">
                  <Add width="1rem" height="1rem" />
                  <span className="m-1">{t('form:button-label-add')}</span>
                </div>
              </LinkButton>
            </div>
            <button
              className="text-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
              onClick={toggleVisible}
            >
              {t('common:text-filter')}{' '}
              {visible ? (
                <ArrowUp className="ms-2" />
              ) : (
                <ArrowDown className="ms-2" />
              )}
            </button>
          </div>
        </div>
        <div
          className={cn('w-full flex transition', {
            'h-auto visible': visible,
            'h-0 invisible': !visible
          })}
        >
          <div
            className="flex flex-col md:flex-row md:items-center mt-5 
                    md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full"
          >
            <SortForm
              className="w-full md:w-1/2 mt-5 md:mt-0"
              orderValue={orderBy}
              onOrderChange={({ value }: { value: OrderBy }) => {
                setOrder(value);
              }}
              options={[
                { id: 1, value: 'created_at', label: 'Created At' },
                { id: 2, value: 'updated_at', label: 'Updated At' }
              ]}
            />
          </div>
        </div>
      </Card>
      <div></div>
      <SuppliersList
        suppliers={suppliers}
        total={suppliersCount}
        onPagination={handlePagination}
        currentPage={page}
        perPage={limit}
      />
    </>
  );
}

SuppliersPage.Layout = AppLayout;

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
        'table',
        'common',
        'form',
        'error'
      ])),
      client
    }
  };
};
