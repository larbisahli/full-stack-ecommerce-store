/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Button from '@components/ui/button';
import ColorPicker from '@components/ui/color-picker/color-picker';
import Description from '@components/ui/description';
import FileInput from '@components/ui/file-input';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Radio from '@components/ui/radio';
import TextArea from '@components/ui/text-area';
import { useErrorLogger, useWarnIfUnsavedChanges } from '@hooks/index';
import { notify } from '@lib/index';
import { NoteNotify } from '@lib/notify';
import { Nullable } from '@ts-types/custom.types';
import { HeroCarouselType, ImageType } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import HeroBannerCard from './hero-banner-card';

type FormValues = HeroCarouselType;

const defaultValues = {
  title: '',
  destinationUrl: null,
  thumbnail: null,
  description: null,
  btnLabel: null,
  displayOrder: 0,
  status: 'draft',
  styles: {
    textColor: '#cccccc',
    btnBgc: '#dcdbdb',
    btnTextColor: '#222121'
  }
};

type IProps = {
  initialValues?: Nullable<HeroCarouselType>;
};

export default function CreateOrUpdateSlideForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: initialValues
      ? cloneDeep({
          ...initialValues,
          status: initialValues?.published ? 'publish' : 'draft'
        })
      : (defaultValues as HeroCarouselType)
  });

  const styles = watch('styles');
  const thumbnail = watch('thumbnail') as ImageType;
  const btnLabel = watch('btnLabel');
  const title = watch('title');
  const description = watch('description');

  useErrorLogger(error);

  const onSubmit = async (values: FormValues) => {
    if (isEmpty(values.thumbnail)) {
      notify('form:category-image-required', 'warning');
      return;
    }

    const variables = {
      id: initialValues?.id,
      title: values.title,
      destinationUrl: values.destinationUrl,
      thumbnail: values.thumbnail,
      description: values.description,
      btnLabel: values.btnLabel,
      displayOrder: Number(values.displayOrder),
      published: values.status === 'publish',
      styles: values.styles
    };

    console.log({ variables });

    setUnsavedChanges(false);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variables)
    };
    setLoading(true);
    if (isEmpty(initialValues)) {
      fetch('/api/admin/banner/create', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data?.banner?.id) {
            notify(t('common:successfully-created'), 'success');
            NoteNotify('Your changes will be live in 10 minutes.');
            router.push(ROUTES.HERO_CAROUSEL);
            reset();
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      fetch('/api/admin/banner/update', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data?.banner?.id) {
            notify(t('common:successfully-updated'), 'success');
            NoteNotify('Your changes will be live in 10 minutes.');
            router.push(ROUTES.HERO_CAROUSEL);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  useWarnIfUnsavedChanges(unsavedChanges, () => {
    return confirm(t('common:UNSAVED_CHANGES'));
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:hero-slider-image-helper-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="thumbnail" control={control} multiple={false} />
          {!!thumbnail && (
            <div>
              <div className="my-2 border-b border-dashed border-border-base"></div>
              <HeroBannerCard
                thumbnail={thumbnail}
                btnLabel={btnLabel}
                title={title}
                description={description}
                styles={styles}
              />
            </div>
          )}
        </Card>
      </div>

      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-description-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-title')}
            {...register('title')}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-description')}
            {...register('description')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-destination-url')}
            {...register('destinationUrl')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-button-label')}
            {...register('btnLabel')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={`${t('form:input-label-display-order')}`}
            type="number"
            min={0}
            {...register('displayOrder')}
            error={t(errors.displayOrder?.message!)}
            variant="outline"
            className="mb-5"
          />
          <div>
            <Label>{t('form:input-label-status')}</Label>
            <Radio
              {...register('status')}
              label={t('form:input-label-published')}
              id="published"
              value="publish"
              className="mb-2"
            />
            <Radio
              {...register('status')}
              id="draft"
              label={t('form:input-label-draft')}
              value="draft"
            />
          </div>
        </Card>
      </div>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:input-label-slider-styles')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:hero-slider-style-helper-text')}`}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <ColorPicker
            label={t('form:input-text-color')}
            {...register(`styles.textColor`)}
            className="mt-5"
          >
            <DisplayColorCode color={styles?.textColor} />
          </ColorPicker>

          <ColorPicker
            label={t('form:input-button-text-color')}
            {...register(`styles.btnTextColor`)}
            className="mt-5"
          >
            <DisplayColorCode color={styles?.btnTextColor} />
          </ColorPicker>

          <ColorPicker
            label={t('form:input-button-background-color')}
            {...register(`styles.btnBgc`)}
            className="mt-5"
          >
            <DisplayColorCode color={styles?.btnBgc} />
          </ColorPicker>
        </Card>
      </div>
      <div className="mb-4 flex justify-end items-center">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        )}

        <Button loading={loading} disabled={loading}>
          <div className="mr-1">
            <SaveIcon width="1.3rem" height="1.3rem" />
          </div>
          <div>{t('form:button-label-save')}</div>
        </Button>
      </div>
    </form>
  );
}

const DisplayColorCode = ({ color }: { color: string }) => {
  return (
    <>
      {color !== null && (
        <span className="ms-3 px-2 py-1 text-sm text-heading bg-gray-100 border border-border-200 rounded">
          {color}
        </span>
      )}
    </>
  );
};
