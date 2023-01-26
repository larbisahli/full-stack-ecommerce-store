import AppLayout from '@components/layouts/app';
import CreateOrUpdateSupplierForm from '@components/suppliers/supplier-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import type { Suppliers } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface TAttribute {
  supplier: Suppliers;
}
interface OptionsVariable {
  id: string | string[];
}

export default function UpdateSupplierPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();

  const { supplierId } = query;

  // const { data, loading, error } = useQuery<TAttribute, OptionsVariable>(
  //   SUPPLIER,
  //   {
  //     variables: { id: supplierId },
  //     fetchPolicy: 'cache-and-network'
  //   }
  // );

  useGetStaff(client);
  // useErrorLogger(error);

  const supplier = {}; // data?.supplier;

  // if (loading) {
  //   return <Loader text={t('common:text-loading')} />;
  // }

  // if (error) {
  //   return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  // }

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:edit-supplier')}
        </h1>
      </div>
      <CreateOrUpdateSupplierForm initialValues={supplier} />
    </>
  );
}

UpdateSupplierPage.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, [
        'table',
        'common',
        'form',
        'error'
      ])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
