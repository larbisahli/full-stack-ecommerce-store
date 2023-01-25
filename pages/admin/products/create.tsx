import AppLayout from '@components/layouts/app';
import CreateOrUpdateProductForm from '@components/product/product-form';
import { useGetStaff } from '@hooks/index';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import type { SSRProps } from '@ts-types/custom.types';
import { ROUTES } from '@utils/routes';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateProductPage({ client }: SSRProps) {
  const { t } = useTranslation();

  useGetStaff(client);

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:create-product')}
        </h1>
      </div>
      <CreateOrUpdateProductForm />
    </>
  );
}

CreateProductPage.Layout = AppLayout;

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
      ...(await serverSideTranslations(locale, ['common', 'form'])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
