import { CartIconBig } from '@components/icons/cart-icon-bag';
import { CoinIcon } from '@components/icons/coin-icon';
import { DollarIcon } from '@components/icons/shops/dollar';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import ColumnChart from '@components/widgets/column-chart';
import StickerCard from '@components/widgets/sticker-card';
import { useSettings } from '@contexts/settings.context';
import { usePrice } from '@hooks/use-price';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useTime } from '@hooks/useTime';
import { fetcher } from '@utils/utils';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import useSwr from 'swr';

interface TDash {
  totalOrders: number;
  totalRevenue: number;
  todaysRevenue: number;
}

export default function Dashboard() {
  const { t } = useTranslation();

  const { current } = useTime();
  const { data, error, isLoading } = useSwr<TDash>(
    ['/api/admin/dashboard?time=', current],
    fetcher
  );

  const {
    salesHistory = [],
    totalOrders = 0,
    totalRevenue = 0,
    todaysRevenue = 0
  } = data ?? {};

  useErrorLogger(error);

  let salesByYear: number[] = [2, 3, 5, 2, 1, 7, 9, 3, 9, 3, 3, 2];

  console.log({ salesByYear });

  const {
    currency: { code }
  } = useSettings();

  const totalRevenuePrice = usePrice({
    amount: totalRevenue,
    locale: 'us',
    currencyCode: code
  });

  const todaysRevenuePrice = usePrice({
    amount: todaysRevenue,
    locale: 'us',
    currencyCode: code
  });

  const sales = useMemo(() => {
    return salesHistory?.map((sale) => {
      return sale.sales;
    });
  }, [salesHistory]);

  const categories = useMemo(() => {
    return salesHistory?.map((sale) => {
      return dayjs(sale?.dt).format('YY, MMMM');
    });
  }, [salesHistory]);

  console.log({ categories });

  if (isLoading) {
    return <Loader text={t('common:text-loading')} />;
  }
  if (!isEmpty(error)) {
    return <ErrorMessage message={t('common:MESSAGE_SOMETHING_WENT_WRONG')} />;
  }

  if (isLoading) {
    return <Loader text={t('common:text-loading')} />;
  }
  return (
    <>
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <div className="w-full">
          <StickerCard
            titleTransKey="sticker-card-title-order"
            subtitleTransKey="sticker-card-subtitle-order"
            icon={<CartIconBig />}
            price={totalOrders?.toCommas()}
          />
        </div>
        <div className="w-full">
          <StickerCard
            titleTransKey="sticker-card-title-rev"
            subtitleTransKey="sticker-card-subtitle-rev"
            icon={<DollarIcon className="w-7 h-7" color="#047857" />}
            iconBgStyle={{ backgroundColor: '#A7F3D0' }}
            price={totalRevenuePrice}
          />
        </div>
        <div className="w-full">
          <StickerCard
            titleTransKey="sticker-card-title-today-rev"
            icon={<CoinIcon />}
            price={todaysRevenuePrice}
          />
        </div>
      </div>

      <div className="w-full flex flex-wrap mb-6">
        <ColumnChart
          widgetTitle="Sale History"
          totalValue={totalOrders?.toCommas()}
          colors={['#03D3B5']}
          series={sales}
          position={'up'}
          categories={categories}
        />
      </div>
    </>
  );
}
