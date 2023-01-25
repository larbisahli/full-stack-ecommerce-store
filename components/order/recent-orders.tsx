import { Table } from '@components/ui/table';
// import { Order, OrderStatus } from '@ts-types/generated';
import dayjs from 'dayjs';
// import usePrice from '@utils/use-price';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useTranslation } from 'next-i18next';

type IProps = {
  orders: any[];
  title?: string;
};

const RecentOrders = ({ orders, title }: IProps) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('table:table-item-tracking-number'),
      dataIndex: 'tracking_number',
      key: 'tracking_number',
      align: 'center',
      width: 150
    },
    {
      title: t('table:table-item-total'),
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      render: (value: any) => {
        // const { price } = usePrice({
        //   amount: value
        // });
        const price = 22;
        return <span className="whitespace-nowrap">{price}</span>;
      }
    },
    {
      title: t('table:table-item-order-date'),
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
    {
      title: t('table:table-item-status'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: any) => (
        <span
          className="whitespace-nowrap font-semibold"
          style={{ color: status?.color! }}
        >
          {status?.name}
        </span>
      )
    }
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <h3 className="text-heading text-center font-semibold px-4 py-3 bg-light border-b border-border-200">
          {title}
        </h3>
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={orders}
          rowKey="id"
          scroll={{ x: 700 }}
        />
      </div>
    </>
  );
};

export default RecentOrders;
