import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { SUPPLIERS_FOR_SELECT } from '@graphql/supplier';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { OrderBy, Suppliers } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';
import { Control } from 'react-hook-form';

interface Props {
  control: Control<any>;
}

interface TSupplierSelect {
  suppliersForSelect: Suppliers[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
}

const ProductSupplierInput = ({ control }: Props) => {
  const { t } = useTranslation();

  // const { data, loading, error } = useQuery<TSupplierSelect, OptionsVariable>(
  //   SUPPLIERS_FOR_SELECT,
  //   {
  //     variables: {
  //       page: 1,
  //       limit: 999,
  //       orderBy: OrderBy.CREATED_AT
  //     },
  //     fetchPolicy: 'cache-and-network'
  //   }
  // );

  // useErrorLogger(error);

  return (
    <div className="mb-5">
      <Label>{t('form:input-label-suppliers')}</Label>
      <SelectInput
        name="suppliers"
        isMulti
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        // options={data?.suppliersForSelect ?? []}
        options={[]}
        // isLoading={loading}
      />
    </div>
  );
};

export default memo(ProductSupplierInput);
