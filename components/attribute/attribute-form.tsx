/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Card from '@components/common/card';
import { SaveIcon } from '@components/icons/save-icon';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/index';
import { Nullable } from '@ts-types/custom.types';
import { Attribute, AttributeValue } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import React, { InputHTMLAttributes, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

type FormValues = {
  name?: Nullable<string>;
  values: AttributeValue[];
};

type IProps = {
  initialValues?: Nullable<Attribute>;
};

export default function CreateOrUpdateAttributeForm({ initialValues }: IProps) {
  const { t } = useTranslation();

  const router = useRouter();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialValues ? initialValues : { name: null, values: [] }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'values',
    keyName: 'key'
  });

  useErrorLogger(error);

  const onSubmit = (fields: FormValues) => {
    if (!isEmpty(fields?.values)) {
      const hasEmptyField = fields?.values.find(({ value }) => value === '');
      if (hasEmptyField) {
        notify(t('common:value-required'), 'warning');
        return;
      }
    }

    setLoading(true);
    console.log({ fields });
    if (isEmpty(initialValues)) {
      fetch('/api/admin/attribute/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.attribute?.id) {
            notify(t('common:successfully-created'), 'success');
            router.push(ROUTES.ATTRIBUTES);
            reset();
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setLoading(false);
        });
    } else {
      const changes = initialValues?.values
        ?.map((att_value_init: AttributeValue) =>
          fields?.values.find((att_value) => {
            return (
              att_value.id === att_value_init.id &&
              (att_value.value != att_value_init.value ||
                att_value.color != att_value_init.color)
            );
          })
        )
        .filter(function (x) {
          return x !== undefined;
        });

      const variables = {
        id: initialValues.id,
        name: fields?.name,
        values: [
          ...changes,
          ...(fields?.values.filter(function (value) {
            return !value.id;
          }) ?? [])
        ]
      };

      console.log({ variables });

      fetch('/api/admin/attribute/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.attribute?.id) {
            notify(t('common:successfully-updated'), 'success');
            router.push(ROUTES.ATTRIBUTES);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setLoading(false);
        });
    }
  };

  const removeAttributeValue = (item: AttributeValue, index: number) => {
    setDeletedIndex(index);
    if (item?.id) {
      setLoading(true);
      fetch('/api/admin/attribute/value/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item?.id })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.attribute?.id) {
            notify(t('common:successfully-deleted'), 'success');
            remove(index);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setLoading(false);
        });
    } else {
      remove(index);
    }
  };

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t('common:attribute')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('form:form-description-attribute-name')}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t('form:input-label-name')}
              {...register('name', { required: 'Name is required' })}
              error={t(errors.name?.message!)}
              variant="outline"
              className="mb-5"
            />
          </Card>
        </div>

        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t('common:attribute-values')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('form:form-description-attribute-value')}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div>
              {fields.map((item, index) => (
                <div
                  className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8"
                  key={index}
                >
                  <div className="flex justify-between">
                    <Input
                      className="sm:col-span-2"
                      label={t('form:input-label-value')}
                      variant="outline"
                      {...register(`values.${index}.value` as const)}
                      defaultValue={item.value}
                    />
                    <ColorPicker
                      control={control}
                      color={item.color}
                      {...register(`values.${index}.color` as const)}
                    ></ColorPicker>
                    <button
                      onClick={() => removeAttributeValue(item, index)}
                      type="button"
                      className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                    >
                      {t('form:button-label-remove')}
                      {loading && deletedIndex === index && (
                        <span
                          className="absolute h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin"
                          style={{
                            borderTopColor: 'red'
                          }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              onClick={() => append({ value: '', color: '' })}
              className="w-full sm:w-auto"
            >
              {t('form:button-label-add-value')}
            </Button>
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
    </>
  );
}

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  control: any;
  color: string;
}

const ColorPicker = React.forwardRef<HTMLInputElement, Props>(
  (
    { name, control, color, ...rest },
    // eslint-disable-next-line no-unused-vars
    ref
  ) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [currentColor, setCurrentColor] = useState('');

    const handleClick = (e) => {
      e.preventDefault();
      setDisplayColorPicker((prev) => !prev);
    };

    const handleClose = (e) => {
      e.preventDefault();
      setDisplayColorPicker(false);
    };

    useEffect(() => {
      setCurrentColor(color ?? '');
    }, [color]);

    return (
      <div className="flex items-end relative">
        <button
          style={{ fontSize: '.8rem' }}
          className="bg-white hover:bg-gray-100 text w-full font-semibold p-3 border border-gray-200 rounded shadow"
          onClick={handleClick}
        >
          <span>Pick Color</span>
          <span
            style={{ background: currentColor, width: '15px', height: '15px' }}
            className={cn('absolute top-0 left-0 rounded-full', {
              shadow: !isEmpty(currentColor),
              'border-gray-400': !isEmpty(currentColor),
              border: !isEmpty(currentColor)
            })}
          ></span>
        </button>
        {displayColorPicker ? (
          <div className="absolute z-10">
            <div
              role="button"
              className="fixed inset-0"
              onClick={handleClose}
            ></div>
            <Controller
              control={control}
              name={name}
              {...rest}
              render={({ field: { onChange, value } }) => {
                return (
                  <ChromePicker
                    color={value ?? ''}
                    onChange={(color) => {
                      onChange(color?.hex ?? '');
                      setCurrentColor(color?.hex ?? '');
                    }}
                  />
                );
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';
