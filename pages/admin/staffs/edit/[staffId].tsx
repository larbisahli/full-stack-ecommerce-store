import AppLayout from '@components/layouts/app';
import StaffCreateUpdateForm from '@components/staff/staff-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { StaffType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { fetcher } from '@utils/utils';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import useSwr from 'swr';

interface TStaff {
  staff: StaffType;
}

export default function EditStaffPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const { staffId } = query;

  const random = React.useRef(Date.now());
  const key = staffId
    ? [`/api/admin/staff/${staffId}?time=`, random.current]
    : null;
  const { data, error, isLoading } = useSwr<TStaff>(key, fetcher);

  const { staff } = data ?? {};

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
          {t('form:form-title-create-staff')}
        </h1>
      </div>
      <StaffCreateUpdateForm initialValues={staff} />
    </>
  );
}

EditStaffPage.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
