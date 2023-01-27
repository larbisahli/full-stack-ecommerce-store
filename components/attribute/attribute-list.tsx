import ActionButtons from '@components/common/action-buttons';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { Nullable } from '@ts-types/custom.types';
import {
  Attribute,
  AttributeValue,
  CreatedUpdatedByAt
} from '@ts-types/generated';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

type IProps = {
  attributes: Attribute[];
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const AttributeList = ({
  attributes,
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
      title: t('table:table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 80,
      ellipsis: true
    },
    {
      title: t('table:table-item-name'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 100,
      ellipsis: true,
      render: (name: string) => {
        return (
          <span className="font-semibold text-gray-800 capitalize">{name}</span>
        );
      }
    },
    {
      title: t('table:table-item-values'),
      dataIndex: 'values',
      key: 'values',
      align: alignLeft,
      ellipsis: true,
      width: 200,
      render: (values: AttributeValue[]) => {
        const att_values = values
          ?.map(({ value }: AttributeValue, index: number) => {
            return index > 0 ? `, ${value}` : `${value}`;
          })
          ?.join('');
        return (
          <span title={att_values} className="whitespace-nowrap">
            {att_values}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-created-at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: alignLeft,
      width: 200,
      render: (createdAt: CreatedUpdatedByAt['createdAt']) => {
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
          deleteModalView="DELETE_ATTRIBUTE"
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
          data={attributes}
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

export default AttributeList;
