import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { siteSettings } from '@settings/site.settings';
import { Nullable } from '@ts-types/custom.types';
import {
  CreatedUpdatedByAt,
  HeroCarouselType,
  ImageType
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import React from 'react';

export type IProps = {
  heroCarouselList: HeroCarouselType[];
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const HeroCarouselList = ({
  heroCarouselList,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-thumbnail'),
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      align: alignLeft,
      width: 150,
      render: (thumbnail: ImageType) => (
        <div
          style={{ maxWidth: '100px' }}
          className="shadow min-w-0 overflow-hidden rounded-sm w-[56px] h-[56px]"
        >
          <ImageComponent
            src={
              `${process.env.S3_ENDPOINT}/${thumbnail?.image}` ??
              siteSettings.product.image
            }
            width={100}
            height={100}
            objectFit="cover"
          />
        </div>
      )
    },
    {
      title: t('table:table-item-title-title'),
      dataIndex: 'title',
      key: 'title',
      align: alignLeft,
      width: 150,
      ellipsis: true,
      render: (category_name: string) => {
        return (
          <span className="font-semibold text-gray-800 capitalize">
            {category_name}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-clicks'),
      dataIndex: 'clicks',
      key: 'clicks',
      align: 'center',
      width: 70,
      ellipsis: true
    },
    {
      title: t('table:table-item-display-order'),
      dataIndex: 'displayOrder',
      key: 'displayOrder',
      align: 'center',
      width: 120,
      ellipsis: true
    },
    {
      title: t('table:table-item-status'),
      dataIndex: 'published',
      key: 'published',
      align: 'center',
      width: 100,
      render: (published: boolean) => (
        <Badge
          text={published ? 'Publish' : 'Draft'}
          color={published ? 'bg-accent' : 'bg-yellow-400'}
        />
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
      width: 140,
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
          editUrl={`${ROUTES.HERO_CAROUSEL}/edit/${id}`}
          deleteModalView="DELETE_SLIDER"
        />
      )
    }
  ];

  return (
    <React.Fragment>
      <div className="card overflow-hidden mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={heroCarouselList}
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
    </React.Fragment>
  );
};

export default HeroCarouselList;
