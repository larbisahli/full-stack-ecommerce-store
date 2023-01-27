import Card from '@components/common/card';
import SortForm from '@components/common/sort-form';
import { Add } from '@components/icons/add';
import AppLayout from '@components/layouts/app';
import StaffList from '@components/staff/staff-list';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { useTime } from '@hooks/useTime';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { StaffType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { fetcher, limit } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import useSwr from 'swr';

interface TStaff {
  staffs: StaffType[];
  count: number;
}
export default function Staff({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);

  const { current } = useTime();
  const key = page ? [`/api/admin/staff/staffs/${page}?time=`, current] : null;
  const { data, error, isLoading } = useSwr<TStaff>(key, fetcher);

  const { staffs = [], count = 0 } = data ?? {};

  useGetStaff(client);
  useErrorLogger(error);

  function handlePagination(current: any) {
    setPage(current);
  }

  if (isLoading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-staffs')}
          </h1>
        </div>
        <div className="w-full xl:w-3/4 flex md:flex-row space-y-4 md:space-y-0 items-center ms-auto justify-end">
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
        staffs={staffs}
        onPagination={handlePagination}
        total={count}
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
