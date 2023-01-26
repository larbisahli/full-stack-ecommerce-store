import Card from '@components/common/card';
import SortForm from '@components/common/sort-form';
import { Add } from '@components/icons/add';
import AppLayout from '@components/layouts/app';
import StaffList from '@components/staff/staff-list';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { OrderBy, SortOrder, StaffType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

interface TStaff {
  staffs: StaffType[];
  staffsCount: { count: number };
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
  sortedBy: SortOrder;
}

const limit = 10;

export default function Staff({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState(OrderBy.CREATED_AT);
  const [staffsData, setStaffsData] = useState<StaffType[]>([] as StaffType[]);

  // const { data, loading, error, fetchMore } = useQuery<TStaff, OptionsVariable>(
  //   STAFFS,
  //   {
  //     variables: {
  //       page,
  //       limit,
  //       orderBy,
  //       sortedBy: SortOrder.Desc
  //     },
  //     fetchPolicy: 'cache-and-network'
  //   }
  // );

  const couponsCount = 0; //data?.staffsCount?.count;

  useGetStaff(client);
  // useErrorLogger(error);

  // useEffect(() => {
  //   const staffs = data?.staffs;
  //   if (!isEmpty(staffs)) {
  //     setStaffsData(() => staffs);
  //   }
  // }, [data]);

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-staffs')}
          </h1>
        </div>
        <div className="w-full xl:w-3/4 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <SortForm
            className="md:ms-5"
            showLabel={false}
            onOrderChange={({ value }: { value: OrderBy }) => {
              setOrder(value);
            }}
            options={[
              { id: 1, value: 'created_at', label: 'Created At' },
              { id: 2, value: 'updated_at', label: 'Updated At' }
            ]}
          />
          <LinkButton
            href={`${ROUTES.STAFFS}/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <div className="w-full flex items-center justify-center">
              <div className="hidden md:flex items-center justify-center">
                <Add width="1rem" height="1rem" />
                <span className="m-1">{t('form:button-label-add-staff')}</span>
              </div>
              <div className="md:hidden flex items-center justify-center">
                <Add width="1rem" height="1rem" />
                <span className="m-1">{t('form:button-label-add-staff')}</span>
              </div>
            </div>
          </LinkButton>
        </div>
      </Card>
      <StaffList
        staffs={staffsData}
        onPagination={handlePagination}
        total={couponsCount}
        currentPage={page}
        perPage={limit}
      />
    </>
  );
}
Staff.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client
    }
  };
};
