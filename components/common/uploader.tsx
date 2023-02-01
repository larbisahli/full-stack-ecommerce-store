import { CloseIcon } from '@components/icons/close-icon';
import { UploadIcon } from '@components/icons/upload-icon';
import ImageComponent from '@components/ImageComponent';
import Loader from '@components/ui/loader/loader';
import { notify } from '@lib/notify';
import S3 from '@lib/S3/react-aws-s3';
import { ImageType } from '@ts-types/generated';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const config = {
  bucketName: process.env.S3_BUCKET_NAME,
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  s3Url: process.env.S3_ENDPOINT
};

const ReactS3Client = new S3(config);

export default function Uploader({ onChange, value = [], multiple }: any) {
  const { t } = useTranslation();

  const imagesCache = useRef<ImageType[]>([]);

  const [error, setError] = useState(null);
  const [images, setImages] = useState<ImageType | ImageType[]>(value);
  const [deletedImage, setDeletedImage] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  console.log({ images });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple,
    onDrop: async (acceptedFiles) => {
      try {
        setLoading(true);
        imagesCache.current = [];

        if (!isEmpty((images as ImageType)?.image) && !multiple) {
          notify('You should remove the current image first', 'warning');
          setLoading(false);
          return;
        }

        for await (const file of acceptedFiles) {
          console.log({ file });
          if (
            ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(
              file.type
            )
          ) {
            ReactS3Client.uploadFile(file)
              .then((data) => {
                const image = data.key as string;

                if (image) {
                  if (multiple) {
                    setImages((prev) => [
                      ...((prev as ImageType[]) ?? []),
                      { image }
                    ]);
                    imagesCache.current.push({ image });
                  } else {
                    setImages({ image });
                    setLoading(false);
                  }
                }

                if (acceptedFiles.length === imagesCache.current.length) {
                  setLoading(false);
                }
                console.log(`<:FINISHED UPLOAD:>`, image);
              })
              .catch((err) => {
                console.error(err);
                setLoading(false);
              });
          } else {
            notify('Image type not supported!', 'error');
            setLoading(false);
          }
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
    { isMultiple, image }: { isMultiple: boolean; image: string }
  ) => {
    e.preventDefault();

    setDeletedImage((prev) => {
      return [...prev, { image }];
    });

    try {
      fetch('/api/admin/media/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image })
      })
        .then((response) => response.json())
        .then((data) => {
          if (!isEmpty(data?.Deleted)) {
            const image = data?.Deleted[0].Key;

            let images_;
            if (isArray(images) && isMultiple) {
              images_ = images?.filter((file) => file.image !== image);
            } else {
              images_ = [];
            }
            setImages(images_);
            onChange(images_);
            setDeletedImage([]);
            notify(t('common:successfully-deleted'), 'success');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const thumbs = useMemo(() => {
    if (isEmpty(images) || (!isArray(images) && !images?.image)) {
      return null;
    }

    if (isArray(images)) {
      return images?.map(({ image }, idx) => {
        return (
          <div
            className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative"
            key={idx}
          >
            {deletedImage.some((file) => file.image === image) && (
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
                src={`${process.env.S3_ENDPOINT}/${image}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <button
              type="button"
              className="w-4 h-4 flex items-center justify-center rounded-full
                bg-red-600 text-xs text-light absolute top-1
                  end-1 shadow-xl outline-none"
              onClick={(e) => handleDelete(e, { isMultiple: true, image })}
            >
              <CloseIcon width={10} height={10} />
            </button>
          </div>
        );
      });
    } else {
      return (
        <div className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative">
          {deletedImage.some((file) => file.image === images?.image) && (
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
              src={`${process.env.S3_ENDPOINT}/${images?.image}`}
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
                image: images?.image
              })
            }
          >
            <CloseIcon width={10} height={10} />
          </button>
        </div>
      );
    }
  }, [images, deletedImage]);

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
