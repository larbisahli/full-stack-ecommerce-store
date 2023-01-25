import { mediaURL } from '@utils/utils';
import { useEffect, useState } from 'react';

export function useGetDataUrl(customPlaceholder: string) {
  const [Base64Placeholder, setBase64Placeholder] = useState<string>(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+utrPQAJNQNlcqdyCgAAAABJRU5ErkJggg=='
  );

  useEffect(() => {
    async function toBase64() {
      try {
        const data = await fetch(`${mediaURL}/${customPlaceholder}`);
        const blob = await data.blob();

        // eslint-disable-next-line no-undef
        return await new Promise<string>((resolve) => {
          const reader = new window.FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result as string;
            return resolve(base64data);
          };
        })
          .then((res: string) => {
            setBase64Placeholder(res);
            return res;
          })
          .catch((error) => {
            console.log('error :>', error);
          });
      } catch (error) {
        console.log('error :>', error);
      }
    }

    if (customPlaceholder) {
      toBase64();
    }
  }, [customPlaceholder]);

  return Base64Placeholder;
}
