import AppLayout from '@components/layouts/app';
import SettingsForm from '@components/settings/settings-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import { fetcher } from '@utils/utils';
import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSwr from 'swr';

export default function AccountInformation({ client }: SSRProps) {
  const { t } = useTranslation();

  const { data, error, isLoading } = useSwr<any>(
    '/api/admin/settings',
    fetcher
  );

  const { settings = {} } = data ?? {};

  useGetStaff(client);
  useErrorLogger(error);

  if (isLoading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-settings')}
        </h1>
      </div>
      <SettingsForm settings={settings} />
    </>
  );
}

AccountInformation.Layout = AppLayout;

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
