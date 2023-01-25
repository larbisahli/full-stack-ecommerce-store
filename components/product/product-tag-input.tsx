import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import { TAGS_FOR_SELECT } from '@graphql/tag';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { OrderBy, Tag } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';
import { Control } from 'react-hook-form';

interface Props {
  control: Control<any>;
}

interface TagSelect {
  tagsSelectForAdmin: Tag[];
}

interface OptionsVariable {
  page: number;
  limit: number;
  orderBy: OrderBy;
}

const ProductTagInput = ({ control }: Props) => {
  const { t } = useTranslation();

  // const { data, loading, error } = useQuery<TagSelect, OptionsVariable>(
  //   TAGS_FOR_SELECT,
  //   {
  //     variables: {
  //       page: 1,
  //       limit: 999,
  //       orderBy: OrderBy.CREATED_AT
  //     },
  //     fetchPolicy: 'cache-and-network'
  //   }
  // );

  const tags = [] //data?.tagsSelectForAdmin;

  // useErrorLogger(error);

  return (
    <div>
      <Label>{t('sidebar-nav-item-tags')}</Label>
      <SelectInput
        name="tags"
        isMulti
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={tags}
        // isLoading={loading}
      />
    </div>
  );
};

export default memo(ProductTagInput);
