import AttributeList from '@components/attribute/attribute-list';
import Card from '@components/common/card';
import { Add } from '@components/icons/add';
import { ArrowDown } from '@components/icons/arrow-down';
import { ArrowUp } from '@components/icons/arrow-up';
import AppLayout from '@components/layouts/app';
import LinkButton from '@components/ui/link-button';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { Attribute, OrderBy, SortOrder } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

const limit = 10;

export default function AttributePage({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);

  // const { data, loading, error, fetchMore } = useQuery<
  //   TAttributes,
  //   OptionsVariable
  // >(ATTRIBUTES, {
  //   variables: {
  //     page,
  //     limit,
  //     orderBy,
  //     sortedBy: SortOrder.Desc
  //   },
  //   fetchPolicy: 'cache-and-network'
  // });

  const attributesCount = 0 // data?.attributesCount?.count;
  const attributes = [] //data?.attributesForAdmin;

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
              {t('common:sidebar-nav-item-attributes')}
            </h1>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <div className="w-full flex items-center">
              <LinkButton
                href={`${ROUTES.ATTRIBUTES}/create`}
                className="h-12 ms-4 md:ms-6"
              >
                <div className="hidden md:flex items-center justify-center">
                  <Add width="1rem" height="1rem" />
                  <span className="m-1">
                    {t('form:button-label-add-attributes')}
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
        </div>
      </Card>
      <div></div>
      <AttributeList
        attributes={attributes}
        total={attributesCount}
        onPagination={handlePagination}
        currentPage={page}
        perPage={limit}
      />
    </>
  );
}

AttributePage.Layout = AppLayout;

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
