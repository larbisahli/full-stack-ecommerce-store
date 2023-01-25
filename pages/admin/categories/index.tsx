import CategoryList from '@components/category/category-list';
import Card from '@components/common/card';
import SortForm from '@components/common/sort-form';
import { Add } from '@components/icons/add';
import { ArrowDown } from '@components/icons/arrow-down';
import { ArrowUp } from '@components/icons/arrow-up';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { Category } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { fetcher } from '@utils/utils';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import useSwr from 'swr'

const limit = 10;

interface TCategory {
  categories: Category[]
  count: number
}

export default function Categories({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);

  const { data, error, isLoading } = useSwr<TCategory>(page ? `/api/category/categories/${page}` : null, fetcher)

  console.log({data, error})

  const {categories = [], count = 0} = data

  useGetStaff(client);
  useErrorLogger(error);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const handlePagination = (current: number) => {
    setPage(current);
  };

  if (isLoading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-xl font-semibold text-heading pb-3">
              {t('form:input-label-categories')}
            </h1>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <div className="w-full flex items-center">
              <LinkButton
                href={`${ROUTES.CATEGORIES}/create`}
                className="h-12 m-1 md:ms-6"
              >
                <div className="w-full flex items-center justify-center">
                  <div className="hidden md:flex items-center justify-center">
                    <Add width="1rem" height="1rem" />
                    <span className="m-1">
                      {t('form:button-label-add-categories')}
                    </span>
                  </div>
                  <div className="md:hidden flex items-center justify-center">
                    <Add width="1rem" height="1rem" />
                    <span className="m-1">{t('form:button-label-add')}</span>
                  </div>
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
      <CategoryList
        categories={categories}
        total={count}
        onPagination={handlePagination}
        currentPage={page}
        perPage={limit}
      />
    </>
  );
}

Categories.Layout = AppLayout;

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
