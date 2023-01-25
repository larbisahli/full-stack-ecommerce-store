import { CloseIcon } from '@components/icons/close-icon';
import { UploadIcon } from '@components/icons/upload-icon';
import ImageComponent from '@components/ImageComponent';
import Loader from '@components/ui/loader/loader';
import { DELETE_IMAGE_OBJECT } from '@graphql/common';
import { useErrorLogger, useGetStaff } from '@hooks/index';
import { notify } from '@lib/notify';
import { apiURL } from '@utils/utils';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageType {
  bucket: string;
  image: string;
  mimeType: string;
  originalname: string;
  placeholder: string;
  success: boolean;
}

export default function Uploader({ onChange, value, multiple }: any) {
  const { t } = useTranslation();

  const imagesCache = useRef<string[]>([]);

  const [error, setError] = useState(null);
  const [images, setImages] = useState<ImageType | ImageType[]>(value);
  const [deletedImage, setDeletedImage] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const { staffInfo } = useGetStaff();
  // const csrfToken = staffInfo?.csrfToken;

  // const [deleteImageObject, { loading: deleteLoading }] = useMutation(
  //   DELETE_IMAGE_OBJECT,
  //   {
  //     context: {
  //       headers: {
  //         'x-csrf-token': csrfToken
  //       }
  //     }
  //   }
  // );
  // useErrorLogger(error);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple,
    maxSize: 5 * (1024 * 1024),
    onDrop: async (acceptedFiles) => {
      try {
        setLoading(true);
        imagesCache.current = [];

        if (!isEmpty(images) && !multiple) {
          notify('You should remove the current image first', 'warning');
          setLoading(false);
          return;
        }

        for await (const file of acceptedFiles) {
          var formData = new FormData();
          formData.append('image', file);
          fetch(`${apiURL}/upload`, {
            credentials: 'include',
            method: 'POST',
            body: formData
          }).then(async (res) => {
            const image = (await res.json()) as ImageType;

            if (image.success) {
              if (multiple) {
                setImages((prev) => [...((prev as ImageType[]) ?? []), image]);
                imagesCache.current.push(image.image);
              } else {
                setImages(image as ImageType);
                setLoading(false);
              }
            }

            // @ts-ignore
            if (image?.error?.message) {
              // @ts-ignore
              notify(image?.error?.message, 'error');
            }

            if (acceptedFiles.length === imagesCache.current.length) {
              setLoading(false);
            }
            console.log(`<:FINISHED UPLOAD:>`, image);
          });
        }
      } catch (error) {
        // send error to sentry
        console.log('error :>> ', error);
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    onChange(images);
  }, [onChange, images]);

  const handleDelete = (
    e,
    {
      isMultiple,
      image,
      placeholder
    }: { isMultiple: boolean; image: string; placeholder: string }
  ) => {
    e.preventDefault();

    setDeletedImage((prev) => {
      return [...prev, image];
    });

    // deleteImageObject({
    //   variables: { image, placeholder },
    //   onCompleted: (data: { deleteImageObject: { image: string } }) => {
    //     const image = data?.deleteImageObject.image;
    //     if (!isEmpty(data)) {
    //       let images_;
    //       if (isArray(images) && isMultiple) {
    //         images_ = images?.filter((file) => file.image !== image);
    //       } else {
    //         images_ = null;
    //       }
    //       setImages(images_);
    //       onChange(images_);
    //       setDeletedImage([]);
    //       notify(t('common:successfully-deleted'), 'success');
    //     }
    //   }
    // }).catch((err) => {
    //   setError(err);
    // });
  };

  const thumbs = useMemo(() => {
    if (isEmpty(images)) {
      return null;
    }

    if (isArray(images)) {
      return images?.map(({ image, placeholder }, idx) => {
        return (
          <div
            className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative"
            key={idx}
          >
            {deletedImage.includes(image) && (
              <div className="absolute top-0 right-0 left-0 bottom-0 w-16 h-16 z-40 bg-red-50 opacity-80 flex justify-center items-center">
                <Loader
                  simple={true}
                  borderColor={'#000'}
                  className="w-8 h-8 z-50"
                />
              </div>
            )}

            <div className="relative flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <ImageComponent
                src={image}
                customPlaceholder={placeholder ?? '/placeholders/no-image.svg'}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <button
              type="button"
              className="w-4 h-4 flex items-center justify-center rounded-full 
                bg-red-600 text-xs text-light absolute top-1 
                  end-1 shadow-xl outline-none"
              onClick={(e) =>
                handleDelete(e, { isMultiple: true, image, placeholder })
              }
            >
              <CloseIcon width={10} height={10} />
            </button>
          </div>
        );
      });
    } else {
      return (
        <div className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative">
          {deletedImage.includes(images?.image) && (
            <div className="absolute top-0 right-0 left-0 bottom-0 w-16 h-16 z-40 bg-red-50 opacity-80 flex justify-center items-center">
              <Loader
                simple={true}
                borderColor={'#000'}
                className="w-8 h-8 z-50"
              />
            </div>
          )}
          <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <ImageComponent
              src={images?.image ?? '/placeholders/no-image.svg'}
              customPlaceholder={images?.placeholder}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <button
            type="button"
            className="w-4 h-4 flex items-center justify-center rounded-full 
        bg-red-600 text-xs text-light absolute top-1 
          end-1 shadow-xl outline-none"
            onClick={(e) =>
              handleDelete(e, {
                isMultiple: false,
                image: images?.image,
                placeholder: images?.placeholder
              })
            }
          >
            <CloseIcon width={10} height={10} />
          </button>
        </div>
      );
    }
  }, [images, deleteLoading, deletedImage]);

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none'
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="text-muted-light" />
        <p className="text-body text-sm mt-4 text-center">
          <span className="text-accent font-semibold">
            {t('text-upload-highlight')}
          </span>{' '}
          {t('text-upload-message')} <br />
          <span className="text-xs text-body">{t('text-img-format')}</span>
        </p>
      </div>

      {(!!thumbs || loading) && (
        <aside className="flex flex-wrap mt-2">
          {!!thumbs && thumbs}
          {loading && (
            <div className="h-16 flex items-center mt-2 ms-2">
              <Loader simple={true} className="w-6 h-6" />
            </div>
          )}
        </aside>
      )}
    </section>
  );
}
