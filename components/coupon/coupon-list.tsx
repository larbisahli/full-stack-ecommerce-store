/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ActionButtons from '@components/common/action-buttons';
import { CopyIcon } from '@components/icons/copy';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { notify } from '@lib/index';
import { Nullable } from '@ts-types/custom.types';
import { Coupon, CouponType, CreatedUpdatedByAt } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import { CopyToClipboard } from '@utils/utils';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

type IProps = {
  coupons: Coupon[] | null | undefined;
  // eslint-disable-next-line no-unused-vars
  onPagination: (current: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const CouponList = ({
  coupons,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-code'),
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      width: 120,
      ellipsis: true,
      render: (code: string) => (
        <>
          <div
            role="button"
            className="flex items-center justify-center text-accent"
            onClick={(event) =>
              CopyToClipboard(event, (value) => {
                notify(`Coupon (${value}) successfully copied`, 'success');
              })
            }
          >
            <span className="font-semibold capitalize whitespace-nowrap">
              {code}
            </span>
            <span style={{ pointerEvents: 'none' }} className="m-1">
              <CopyIcon />
            </span>
          </div>
        </>
      )
    },
    {
      title: t('table:table-item-order-amount-limit'),
      dataIndex: 'orderAmountLimit',
      key: 'orderAmountLimit',
      align: 'center',
      ellipsis: true,
      width: 150,
      render: (orderAmountLimit: number) => (
        <span className="whitespace-nowrap">
          {orderAmountLimit ? `${orderAmountLimit} USD` : 'Any'}
        </span>
      )
    },
    {
      title: t('table:table-item-value'),
      dataIndex: 'discountValue',
      key: 'discountValue',
      align: 'center',
      ellipsis: true,
      width: 135,
      render: (discountValue: number, record: Coupon) => {
        const className =
          'font-medium bg-gray-100 w-fit text-13px md:text-sm rounded block border border-sink-base px-2 py-1';

        if (record.discountType === CouponType.Percentage) {
          return <span className={className}>{`- ${discountValue} %`}</span>;
        } else if (record.discountType === CouponType.Fixed) {
          return <span className={className}>{`- ${discountValue} USD`}</span>;
        } else {
          return (
            <span className={className}>
              {t('form:input-label-free-shipping')}
            </span>
          );
        }
      }
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'couponEndDate',
      key: 'couponEndDate',
      align: 'center',
      ellipsis: true,
      width: 100,
      render: (coupon_end_date: string, recode: Coupon) => {
        const expired = Date.now() >= Number(coupon_end_date.valueOf());
        const limited = recode.timesUsed === recode.maxUsage;
        return (
          <Badge
            className="!text-sm"
            text={expired || limited ? 'Expired' : 'Active'}
            color={expired || limited ? 'bg-red-500' : 'bg-green-500'}
          />
        );
      }
    },
    {
      title: t('table:table-item-times-used'),
      dataIndex: 'timesUsed',
      key: 'timesUsed',
      align: 'center',
      ellipsis: true,
      width: 140,
      render: (timesUsed: number) => {
        return <span>{timesUsed ?? 0}</span>;
      }
    },
    {
      title: t('table:table-item-usage-limit'),
      dataIndex: 'maxUsage',
      key: 'maxUsage',
      align: 'center',
      ellipsis: true,
      width: 100,
      render: (maxUsage: number) => {
        return <span>{maxUsage}</span>;
      }
    },
    {
      title: t('table:table-item-start-date'),
      dataIndex: 'couponStartDate',
      key: 'couponStartDate',
      align: 'center',
      ellipsis: true,
      width: 180,
      render: (couponStartDate: string) => (
        <span className="whitespace-nowrap">
          {dayjs(couponStartDate).format('DD/MM/YYYY')} at{' '}
          {dayjs(couponStartDate).format('h:mm A')}
        </span>
      )
    },
    {
      title: t('table:table-item-end-date'),
      dataIndex: 'couponEndDate',
      key: 'couponEndDate',
      align: 'center',
      ellipsis: true,
      width: 180,
      render: (couponEndDate: string) => (
        <span className="whitespace-nowrap">
          {dayjs(couponEndDate).format('DD/MM/YYYY')} at{' '}
          {dayjs(couponEndDate).format('h:mm A')}
        </span>
      )
    },
    {
      title: t('table:table-item-created-by'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: alignLeft,
      width: 100,
      ellipsis: true,
      render: (createdBy: CreatedUpdatedByAt['createdBy']) => {
        return (
          <div>{`${createdBy?.firstName ?? ''} ${
            createdBy?.lastName ?? ''
          }`}</div>
        );
      }
    },
    {
      title: t('table:table-item-updated-by'),
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      align: alignLeft,
      width: 140,
      ellipsis: true,
      render: (updatedBy: CreatedUpdatedByAt['updatedBy']) => {
        return (
          <div>{`${updatedBy?.firstName ?? ''} ${
            updatedBy?.lastName ?? ''
          }`}</div>
        );
      }
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      width: 100,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.COUPONS}/edit/${id}`}
          deleteModalView="DELETE_COUPON"
        />
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
          //@ts-ignore
          data={coupons}
          rowKey="id"
          scroll={{ x: 900 }}
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

export default CouponList;
