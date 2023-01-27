import ActionButtons from '@components/common/action-buttons';
import Avatar from '@components/common/avatar';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { useGetStaff } from '@hooks/useGetStaff';
import { siteSettings } from '@settings/site.settings';
import { Nullable } from '@ts-types/custom.types';
import { CreatedUpdatedByAt, ImageType, StaffType } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

type IProps = {
  staffs: StaffType[] | null | undefined;
  // eslint-disable-next-line no-unused-vars
  onPagination: (current: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};
const StaffList = ({
  staffs,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const { staffInfo } = useGetStaff();

  const columns = [
    {
      title: t('table:table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 80,
      ellipsis: true
    },
    {
      title: t('table:table-item-profile'),
      dataIndex: 'profile',
      key: 'profile',
      align: 'center',
      width: 74,
      render: (profile: ImageType, record: StaffType) => (
        <Avatar
          src={profile?.image ?? siteSettings.avatar.image}
          alt={`${record?.firstName} ${record?.lastName}`}
          customPlaceholder={
            profile?.placeholder ?? siteSettings.avatar.placeholder
          }
        />
      )
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'firstName',
      key: 'firstName',
      align: alignLeft,
      width: 120,
      ellipsis: true,
      render: (firstName: string, record: StaffType) => (
        <span className="font-semibold text-gray-800 capitalize">
          {`${firstName} ${record?.lastName}`}
        </span>
      )
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      width: 90,
      render: (active: boolean) => {
        return (
          <Badge
            className="!test-sm"
            text={active ? 'Active' : 'Inactive'}
            color={active ? 'bg-green' : 'bg-red'}
          />
        );
      }
    },
    {
      title: t('table:table-item-email'),
      dataIndex: 'email',
      key: 'email',
      align: alignLeft,
      width: 200,
      ellipsis: true
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
          <div className="ml-1">{`${createdBy?.firstName ?? ''} ${
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
      width: 150,
      render: (id: string, { active }: StaffType) => {
        return (
          <>
            <ActionButtons
              id={id}
              editUrl={`${ROUTES.STAFFS}/edit/${id}`}
              deleteModalView={staffInfo?.id != id ? 'DELETE_STAFF' : null}
              userStatus={staffInfo?.id != id}
              isUserActive={active}
            />
          </>
        );
      }
    }
  ];

  return (
    <>
      <div className="card overflow-hidden mb-6">
        {/* @ts-ignore */}
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={staffs}
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

export default StaffList;
