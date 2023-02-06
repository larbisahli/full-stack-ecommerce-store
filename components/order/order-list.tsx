import ActionButtons from '@components/common/action-buttons';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Nullable } from '@ts-types/custom.types';
import { OrderStatus } from '@ts-types/generated';
import { formatAddress } from '@utils/format-address';
import { useIsRTL } from '@utils/locals';
import usePrice from '@utils/use-price';
import cn from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
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

const OrderList = ({
  orders,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const router = useRouter();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: 'Orders ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 150
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      width: 120,
      render: (value: any) => {
        // const { price } = usePrice({
        //   amount: value
        // });
        return <span className="whitespace-nowrap">{0}</span>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      align: alignLeft,
      render: (orderStatus: string) => (
        <span
          className={cn(
            'whitespace-nowrap px-3 py-2 rounded-sm font-semibold',
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
      title: 'Address',
      dataIndex: 'addressLine1',
      key: 'addressLine1',
      align: alignLeft,
      render: (addressLine1: string) => <div>{addressLine1}</div>
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      align: alignLeft,
      render: (addressLine1: string) => <div>{addressLine1}</div>
    },
    {
      title: 'Order Date',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return (
          <span className="whitespace-nowrap">
            {dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}
          </span>
        );
      }
    },
    // {
    //   // title: "Download",
    //   title: t('common:text-download'),
    //   dataIndex: 'id',
    //   key: 'download',
    //   align: 'center',
    //   render: (_id: string, order: Order) => (
    //     <div>
    //       <PDFDownloadLink
    //         document={<InvoicePdf order={order} />}
    //         fileName="invoice.pdf"
    //       >
    //         {({ loading }: any) =>
    //           loading ? t('common:text-loading') : t('common:text-download')
    //         }
    //       </PDFDownloadLink>
    //     </div>
    //   )
    // },
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
          expandable={{
            expandedRowRender: () => '',
            rowExpandable: rowExpandable
          }}
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
