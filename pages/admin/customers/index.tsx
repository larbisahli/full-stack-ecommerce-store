import Card from '@components/common/card';
import Search from '@components/common/search';
import CustomerList from '@components/customers/customer-list';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
// import { useUsersQuery } from "@data/user/use-users.query";
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  // const {
  //   data,
  //   isLoading: loading,
  //   error,
  // } = useUsersQuery({
  //   limit: 20,
  //   page,
  //   text: searchTerm,
  // });

  const data = [];
  const loading = false;
  const error = null;

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-staffs')}
          </h1>
        </div>

        <div className="w-full md:w-3/4 flex items-center ms-auto">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${ROUTES.STAFFS}/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <span className="hidden md:block">
              + {t('form:button-label-add-customer')}
            </span>
            <span className="md:hidden">+ {t('form:button-label-add')}</span>
          </LinkButton>
        </div>
      </Card>

      {loading ? null : (
        <CustomerList customers={data?.users} onPagination={handlePagination} />
      )}
    </>
  );
}
Customers.Layout = AppLayout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form']))
  }
});
