import ActionButtons from '@components/common/action-buttons';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { Nullable } from '@ts-types/custom.types';
import { CreatedUpdatedByAt, Suppliers } from '@ts-types/generated';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

type IProps = {
  suppliers: Suppliers[];
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const SuppliersList = ({
  suppliers,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const alignLeft =
    router.locale === 'ar' || router.locale === 'he' ? 'right' : 'left';
  const alignRight =
    router.locale === 'ar' || router.locale === 'he' ? 'left' : 'right';

  let columns = [
    {
      title: t('table:table-item-name'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 100,
      ellipsis: true,
      render: (supplier_name: string) => {
        return (
          <span className="font-semibold text-gray-800 capitalize">
            {supplier_name}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-company'),
      dataIndex: 'company',
      key: 'company',
      align: alignLeft,
      width: 100,
      ellipsis: true,
      render: (company: string) => {
        return (
          <span title={company} className="text-gray-800 capitalize">
            {company}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-phone'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: alignLeft,
      width: 150,
      ellipsis: true,
      render: (phoneNumber: string, record: Suppliers) => {
        return (
          <span
            title={`+${record.country?.phoneCode} ${phoneNumber}`}
            className="text-gray-800 capitalize"
          >
            {`+${record.country?.phoneCode} ${phoneNumber}`}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-created-at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: alignLeft,
      width: 170,
      render: (createdAt: CreatedUpdatedByAt['updatedAt']) => {
        return `${dayjs(createdAt).format('MMM D, YYYY')} at ${dayjs(
          createdAt
        ).format('h:mm A')}`;
      }
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
      align: alignRight,
      width: 80,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${router.asPath}/edit/${id}`}
          deleteModalView="DELETE_SUPPLIER"
        />
      )
    }
  ];

  return (
    <React.Fragment>
      <div className="card overflow-hidden mb-6">
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={suppliers}
          rowKey="id"
          scroll={{ x: 380 }}
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
    </React.Fragment>
  );
};

export default SuppliersList;
