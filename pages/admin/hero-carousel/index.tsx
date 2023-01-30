import Card from '@components/common/card';
import HeroCarouselList from '@components/hero-carousel/hero-carousel-list';
import { Add } from '@components/icons/add';
import AppLayout from '@components/layouts/app';
import ErrorMessage from '@components/ui/error-message';
import LinkButton from '@components/ui/link-button';
import Loader from '@components/ui/loader/loader';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { useTime } from '@hooks/useTime';
import { verifyAuth } from '@middleware/utils';
import { SSRProps } from '@ts-types/custom.types';
import { HeroCarouselType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { fetcher, limit } from '@utils/utils';
import isEmpty from 'lodash/isEmpty';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import useSwr from 'swr';

interface TBanner {
  banners: HeroCarouselType[];
  count: number;
}

export default function HeroCarousel({ client }: SSRProps) {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);

  const { current } = useTime();
  const key = page ? [`/api/admin/banner/banners?time=`, current] : null;
  const { data, error, isLoading } = useSwr<TBanner>(key, fetcher);

  const { banners = [], count = 0 } = data ?? {};

  useGetStaff(client);
  useErrorLogger(error);

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
              {t('form:input-label-hero-carousel')}
            </h1>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <div className="w-full flex items-center">
              <LinkButton
                href={`${ROUTES.HERO_CAROUSEL}/create`}
                className="h-12 m-1 md:ms-6"
              >
                <div className="w-full flex items-center justify-center">
                  <div className="hidden md:flex items-center justify-center">
                    <Add width="1rem" height="1rem" />
                    <span className="m-1">
                      {t('form:button-label-add-slide')}
                    </span>
                  </div>
                  <div className="md:hidden flex items-center justify-center">
                    <Add width="1rem" height="1rem" />
                    <span className="m-1">{t('form:button-label-add')}</span>
                  </div>
                </div>
              </LinkButton>
            </div>
          </div>
        </div>
      </Card>
      <HeroCarouselList
        heroCarouselList={banners}
        total={0}
        onPagination={handlePagination}
        currentPage={page}
        perPage={limit}
      />
    </>
  );
}

HeroCarousel.Layout = AppLayout;

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
