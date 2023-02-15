import Card from '@components/common/card';
import ImageComponent from '@components/ImageComponent';
import AppLayout from '@components/layouts/app';
import Button from '@components/ui/button';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import SelectInput from '@components/ui/select-input';
import { Table } from '@components/ui/table';
import { useSettings } from '@contexts/settings.context';
import { usePrice } from '@hooks/use-price';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useGetStaff } from '@hooks/useGetStaff';
import { notify } from '@lib/notify';
import { verifyAuth, XSRFHandler } from '@middleware/utils';
import { siteSettings } from '@settings/site.settings';
import { SSRProps } from '@ts-types/custom.types';
import { useIsRTL } from '@utils/locals';
import { ROUTES } from '@utils/routes';
import { fetcher } from '@utils/utils';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSwr from 'swr';

type FormValues = {
  order_status: any;
};

const orderStatuses = [
  {
    id: 'pending',
    name: 'Pending'
  },
  {
    id: 'complete',
    name: 'Complete'
  },
  {
    id: 'failed',
    name: 'Failed'
  }
];
export default function OrderDetailsPage({ client }: SSRProps) {
  const { t } = useTranslation();
  const { query } = useRouter();
  const router = useRouter();
  const { alignLeft, alignRight } = useIsRTL();

  const [loading, setLoading] = useState(false);

  const { orderId } = query;

  const random = React.useRef(Date.now());
  const key = orderId
    ? [`/api/admin/order/${orderId}?time=`, random.current]
    : null;
  const { data, error, isLoading } = useSwr<any>(key, fetcher);

  const { order = {} } = data ?? {};

  useGetStaff(client);
  useErrorLogger(error);

  const { handleSubmit, control, setValue } = useForm<FormValues>({
    defaultValues: { order_status: { id: 'pending', name: 'Pending' } }
  });

  useEffect(() => {
    if (order?.orderStatus) {
      setValue('order_status', {
        id: order?.orderStatus,
        name: order?.orderStatus
      });
    }
  }, [order?.orderStatus, setValue]);

  const ChangeStatus = ({ order_status }: FormValues) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, order_status: order_status?.id })
    };
    fetch('/api/admin/order/update-status', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data?.order?.id) {
          notify(t('common:successfully-updated'), 'success');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const columns = [
    {
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 70,
      render: (thumbnail) => (
        <ImageComponent
          src={
            thumbnail
              ? `${process.env.S3_ENDPOINT}/${thumbnail}`
              : siteSettings.product.image
          }
          layout="fixed"
          objectFit="cover"
          width={50}
          height={50}
          className="rounded"
        />
      )
    },
    {
      title: 'Products',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      render: (name: string, item: any) => (
        <div title={name} className="text-black">
          <span>{name}</span>
          <span className="mx-2">X</span>
          <span className="font-bold text-heading">{item.quantity}</span>
        </div>
      )
    },
    {
      title: 'Option',
      dataIndex: 'option',
      key: 'option',
      align: 'center',
      render: (option) => (
        <span className="font-semibold text-black">{option}</span>
      )
    },
    {
      title: 'Unit price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: alignRight,
      render: (unitPrice) => <UnitPrice amount={unitPrice} />
    },
    {
      title: 'Total',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: alignRight,
      render: (unitPrice, item) => {
        return <UnitPrice amount={unitPrice * (item?.quantity ?? 1)} />;
      }
    }
  ];

  const {
    currency: { code }
  } = useSettings();

  const total = usePrice({
    amount: order?.total,
    locale: 'us',
    currencyCode: code
  });

  if (isLoading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <Card>
      <div className="flex flex-col lg:flex-row items-center">
        <h3 className="text-2xl font-semibold text-heading text-center lg:text-start w-full lg:w-1/3 mb-8 lg:mb-0 whitespace-nowrap">
          {t('form:input-label-order-id')} - {order?.id}
        </h3>

        <form
          onSubmit={handleSubmit(ChangeStatus)}
          className="flex items-start ms-auto w-full lg:w-2/4"
        >
          <div className="w-full me-5 z-20">
            <SelectInput
              name="order_status"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={orderStatuses}
              placeholder={t('form:input-placeholder-order-status')}
            />
          </div>
          <Button loading={loading}>
            <span className="hidden sm:block">
              {t('form:button-label-change-status')}
            </span>
            <span className="block sm:hidden">
              {t('form:form:button-label-change')}
            </span>
          </Button>
        </form>
      </div>

      <div className="my-10">
        {order?.products ? (
          <Table
            //@ts-ignore
            columns={columns}
            emptyText={t('table:empty-table-data')}
            data={order?.products}
            rowKey="id"
            scroll={{ x: 400 }}
          />
        ) : (
          <span>{t('common:no-order-found')}</span>
        )}

        <div className="border-t-4 border-double border-border-200 flex flex-col w-full sm:w-1/2 md:w-1/3 ms-auto px-4 py-4 space-y-2">
          <div className="flex items-center font-semibold justify-between text-sm text-gray-600">
            <span>Quantity</span>
            <span>{order?.totalQuantity}</span>
          </div>
          <div className="flex items-center justify-between text-lg text-heading font-bold">
            <span>{t('common:order-total')}</span>
            <span>{total}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="w-full sm:w-1/2 sm:pe-8 mb-10 sm:mb-0">
          <h3 className="text-heading font-semibold mb-3 pb-2 border-b border-border-200">
            {t('common:shipping-address')}
          </h3>
          <div className="text-base flex flex-col items-start space-y-1">
            <div className="flex items-center">
              <div className="mr-2 underline">Full name:</div>
              <span className="text-black font-semibold">
                {order?.fullName}
              </span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 underline">Address:</div>
              <span className="text-black font-semibold">
                {order?.addressLine1}
              </span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 underline">Phone number:</div>
              <span className="text-black font-semibold">{`+${order?.phoneNumber}`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button
          variant="outline"
          onClick={router.back}
          className="me-4"
          type="button"
        >
          {t('form:button-label-back')}
        </Button>
      </div>
    </Card>
  );
}

const UnitPrice = ({ amount }) => {
  const {
    currency: { code }
  } = useSettings();

  const price = usePrice({
    amount,
    locale: 'us',
    currencyCode: code
  });
  return <span className="text-black font-semibold">{price}</span>;
};

OrderDetailsPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { client } = verifyAuth(context);

  if (!client) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN
      }
    };
  }

  const { csrfToken, csrfError } = await XSRFHandler(context);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['form', 'common', 'error'])),
      client: { ...(client ?? {}), csrfToken, csrfError }
    }
  };
};
