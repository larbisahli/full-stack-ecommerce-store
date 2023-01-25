import Card from '@components/common/card';
// import Search from '@components/common/search';
// import SortForm from '@components/common/sort-form';
import { Add } from '@components/icons/add';
// import { ArrowDown } from '@components/icons/arrow-down';
// import { ArrowUp } from '@components/icons/arrow-up';
import AppLayout from '@components/layouts/app';
import ProductList from '@components/product/product-list';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { verifyAuth } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { Product } from '@ts-types/generated';
import { OrderBy, SortOrder } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
// import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

interface TProduct {
  productsForAdmin: Product[];
  productsCount: { count: number };
}

interface ProductVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

const limit = 10;

export default function ProductsPage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);

  // const { data, loading, error, fetchMore } = useQuery<
  //   TProduct,
  //   ProductVariable
  // >(PRODUCTS_FOR_ADMIN, {
  //   variables: {
  //     page,
  //     limit,
  //     orderBy,
  //     sortedBy: SortOrder.Desc
  //   },
  //   fetchPolicy: 'cache-and-network'
  // });

  const productsCount = 0 // data?.productsCount?.count;
  const productsForAdmin = [] // data?.productsForAdmin;

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
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading pb-3">
              {t('form:input-label-products')}
            </h1>
          </div>

          {/* <div className="w-full md:w-3/4 flex flex-col items-center ms-auto">
            <Search onSearch={handleSearch} />
          </div> */}
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
            {/* <button
              className="text-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
              onClick={toggleVisible}
            >
              {t('common:text-filter')}{' '}
              {visible ? (
                <ArrowUp className="ms-2" />
              ) : (
                <ArrowDown className="ms-2" />
              )}
            </button> */}
          </div>
        </div>

        {/* <div
          className={cn('w-full flex transition', {
            'h-auto visible': visible,
            'h-0 invisible': !visible
          })}
        >
          <div className="flex flex-col md:flex-row md:items-center mt-5 md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full">
            <CategoryTypeFilter
              className="w-full md:w-2/3 md:mr-5"
              onCategoryFilter={({ slug }: { slug: string }) => {
                setCategory(slug);
              }}
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
              }}
            />
            <SortForm
              className="w-full md:w-1/3 mt-5 md:mt-0"
              onSortChange={({ value }: { value: SortOrder }) => {
                setColumn(value);
              }}
              onOrderChange={({ value }: { value: string }) => {
                setOrder(value);
              }}
              options={[
                { value: 'name', label: 'Name' },
                { value: 'price', label: 'Price' },
                { value: 'max_price', label: 'Max Price' },
                { value: 'mix_price', label: 'Min Price' },
                { value: 'sale_price', label: 'Sale Price' },
                { value: 'quantity', label: 'Quantity' },
                { value: 'created_at', label: 'Created At' },
                { value: 'updated_at', label: 'Updated At' }
              ]}
            />
          </div>
        </div> */}
      </Card>
      <ProductList
        products={productsForAdmin}
        onPagination={handlePagination}
        total={productsCount}
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
