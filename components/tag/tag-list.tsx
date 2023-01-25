import ActionButtons from '@components/common/action-buttons';
import * as categoriesIcon from '@components/icons/category';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { Nullable } from '@ts-types/custom.types';
import { CreatedUpdatedByAt, Tag } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

export type IProps = {
  tags: Tag[] | undefined | null;
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const TagList = ({
  tags,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();

  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-icon'),
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
      width: 70,
      render: (icon: string) => {
        const TagName = categoriesIcon[icon];
        if (!icon) return null;
        return (
          <span className="flex items-center justify-center">
            {TagName && <TagName className="w-5 h-5 max-h-full max-w-full" />}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 120,
      ellipsis: true,
      render: (name: string) => (
        <div>
          <span
            style={{ width: 'fit-content' }}
            className="font-medium bg-gray-100 text-13px md:text-sm rounded shadow-sm block border border-sink-base px-2 py-1 capitalize"
          >
            {name}
          </span>
        </div>
      )
    },
    {
      title: t('table:table-item-created-at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: alignLeft,
      width: 180,
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
      width: 80,
      align: 'center',
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.TAGS}/edit/${id}`}
          deleteModalView="DELETE_TAG"
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
          data={tags}
          rowKey="id"
          scroll={{ x: 800 }}
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

export default TagList;
