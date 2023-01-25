import ActionButtons from '@components/common/action-buttons';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { siteSettings } from '@settings/site.settings';
import { UserPaginator } from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import Image from 'next/image';
// import { useMeQuery } from '@data/user/use-me.query';
import { useTranslation } from 'next-i18next';

type IProps = {
  customers: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
};
const CustomerList = ({ customers, onPagination }: IProps) => {
  // const { data, paginatorInfo } = customers!;

  const data = [];
  const paginatorInfo = {};

  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-avatar'),
      dataIndex: 'profile',
      key: 'profile',
      align: 'center',
      width: 74,
      render: (profile: any, record: any) => (
        <Image
          src={profile?.avatar?.thumbnail ?? siteSettings.avatar.placeholder}
          alt={record?.name}
          layout="fixed"
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      )
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft
    },
    {
      title: t('table:table-item-email'),
      dataIndex: 'email',
      key: 'email',
      align: alignLeft
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      render: (is_active: boolean) => (is_active ? 'Active' : 'Inactive')
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      render: (id: string, { is_active }: any) => {
        // const { data } = useMeQuery();
        const data = [];
        return (
          <>
            {data?.id != id && (
              <ActionButtons
                id={id}
                userStatus={true}
                isUserActive={is_active}
              />
            )}
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
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default CustomerList;
