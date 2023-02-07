import ActionButtons from '@components/common/action-buttons';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { useSettings } from '@contexts/settings.context';
import { usePrice } from '@hooks/use-price';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Nullable } from '@ts-types/custom.types';
import { useIsRTL } from '@utils/locals';
import cn from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import InvoicePdf from './invoice-pdf';

export type IProps = {
  orders: any[];
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const Price = ({ total }) => {
  const router = useRouter();
  const { locale } = router;
  const {
    currency: { currencyCode }
  } = useSettings();

  const price = usePrice({
    amount: Number(total),
    locale,
    currencyCode
  });
  return (
    <span className="text-black font-semibold whitespace-nowrap">{price}</span>
  );
};

const OrderList = ({
  orders,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: 'Orders ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 190,
      render: (id: string) => (
        <div className="whitespace-nowrap font-semibold">{id}</div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      align: alignLeft,
      width: 100,
      render: (orderStatus: string) => (
        <span
          className={cn(
            'whitespace-nowrap px-3 py-2 rounded-sm font-semibold capitalize',
            {
              'bg-yellow-500 text-white': orderStatus === 'pending',
              'bg-green text-white': orderStatus === 'complete',
              'bg-red-500 text-white': orderStatus === 'failed'
            }
          )}
        >
          {orderStatus}
        </span>
      )
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      width: 120,
      render: (total) => <Price total={total} />
    },
    {
      title: 'full name',
      dataIndex: 'fullName',
      key: 'fullName',
      align: alignLeft,
      width: 120,
      render: (fullName: string) => (
        <div className="whitespace-nowrap font-semibold">{fullName}</div>
      )
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: alignLeft,
      width: 120,
      render: (phoneNumber: string) => (
        <div className="whitespace-nowrap font-semibold">{phoneNumber}</div>
      )
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      align: alignLeft,
      width: 100,
      render: (city: string) => (
        <div className="whitespace-nowrap capitalize font-semibold">{city}</div>
      )
    },
    {
      title: 'Products',
      dataIndex: 'productQuantity',
      key: 'productQuantity',
      align: 'center',
      width: 80,
      render: (productQuantity: string) => (
        <div className="font-semibold">{productQuantity}</div>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      align: 'center',
      width: 80,
      render: (totalQuantity: string) => (
        <div className="font-semibold">{totalQuantity}</div>
      )
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (createdAt: string) => {
        return (
          <span className="whitespace-nowrap font-semibold">
            {dayjs(createdAt).format('DD/MM/YYYY')} at{' '}
            {dayjs(createdAt).format('h:mm A')}
          </span>
        );
      }
    },
    {
      title: 'Download',
      dataIndex: 'id',
      key: 'download',
      align: 'center',
      render: (_id: string, order) => (
        <div>
          <PDFDownloadLink
            document={<InvoicePdf order={order} />}
            fileName="invoice.pdf"
          >
            {({ loading }: any) =>
              loading ? t('common:text-loading') : t('common:text-download')
            }
          </PDFDownloadLink>
        </div>
      )
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      width: 100,
      render: (id: string) => (
        <ActionButtons id={id} detailsUrl={`${router.asPath}/${id}`} />
      )
    }
  ];

  return (
    <>
      <div className="card overflow-hidden mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={orders}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>

      {!!total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={total}
            current={currentPage}
            pageSize={perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default OrderList;
