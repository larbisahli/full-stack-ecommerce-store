import ActionButtons from '@components/common/action-buttons';
import ImageComponent from '@components/ImageComponent';
import Badge from '@components/ui/badge/badge';
import Pagination from '@components/ui/pagination';
import { Table } from '@components/ui/table';
import { useSettings } from '@contexts/settings.context';
import { usePrice } from '@hooks/use-price';
import { siteSettings } from '@settings/site.settings';
import type { Nullable } from '@ts-types/custom.types';
import type {
  Category,
  CreatedUpdatedByAt,
  ImageType,
  Product
} from '@ts-types/generated';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

const RenderPrice = ({ salePrice, record }) => {
  const {
    currency: { code }
  } = useSettings();

  const minPrice = usePrice({
    amount: record?.minPrice,
    locale: 'us',
    currencyCode: code
  });

  const maxPrice = usePrice({
    amount: record?.maxPrice,
    locale: 'us',
    currencyCode: code
  });

  const price = usePrice({
    amount: salePrice,
    locale: 'us',
    currencyCode: code
  });
  if (record?.maxPrice > 0 && record?.minPrice > 0) {
    return (
      <span
        className="whitespace-nowrap"
        title={`${minPrice} - ${maxPrice}`}
      >{`${minPrice} - ${maxPrice}`}</span>
    );
  } else {
    return (
      <span className="whitespace-nowrap" title={`$${price}`}>
        {`$${price}`}
      </span>
    );
  }
};

type IProps = {
  products: Nullable<Product[]>;
  // eslint-disable-next-line no-unused-vars
  onPagination: (key: number) => void;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
};

const ProductList = ({
  products,
  onPagination,
  total,
  currentPage,
  perPage
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  let columns = [
    {
      title: t('table:table-item-image'),
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      align: alignLeft,
      width: 85,
      render: (thumbnail: string) => (
        <div className="shadow min-w-0 overflow-hidden">
          <ImageComponent
            src={
              `${process.env.S3_ENDPOINT}/${thumbnail}` ??
              siteSettings.product.image
            }
            layout="fill"
            objectFit="contain"
            className="overflow-hidden"
          />
        </div>
      )
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 200,
      ellipsis: true
    },
    {
      title: t('table:table-item-categories'),
      dataIndex: 'categories',
      key: 'categories',
      width: 200,
      align: 'center',
      ellipsis: true,
      render: (categories: Category[]) => {
        const categories_values = categories
          ?.map(({ name }: Category, index: number) => {
            return index > 0 ? `, ${name}` : `${name}`;
          })
          ?.join('');
        return (
          <span
            title={categories_values}
            className="whitespace-nowrap truncate"
          >
            {categories_values}
          </span>
        );
      }
    },
    {
      title: t('table:table-item-unit'),
      dataIndex: 'salePrice',
      key: 'salePrice',
      align: 'center',
      width: 200,
      render: (salePrice: number, record: Product) => (
        <RenderPrice salePrice={salePrice} record={record} />
      )
    },
    {
      title: t('table:table-item-quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: 100
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
      width: 80,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.PRODUCTS}/edit/${id}`}
          deleteModalView="DELETE_PRODUCT"
        />
      )
    }
  ];

  return (
    <>
      <div className="card overflow-hidden mb-6">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={products}
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
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
