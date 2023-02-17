import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';

export function useErrorLogger(error?: any) {
  useEffect(() => {
    if (!isEmpty(error)) {
      console.log({ error });
    }
  }, [error]);
}
