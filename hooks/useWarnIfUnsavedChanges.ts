import Router from 'next/router';
import { useEffect } from 'react';

export const useWarnIfUnsavedChanges = (
  unsavedChanges: boolean,
  callback: () => boolean
) => {
  useEffect(() => {
    const routeChangeStart = () => {
      if (unsavedChanges) {
        const ok = callback();
        if (!ok) {
          Router.events.emit('routeChangeError');
          // INFO ignore this error with sentry
          throw 'Abort route change. Please ignore this error.';
        }
      }
    };
    Router.events.on('routeChangeStart', routeChangeStart);
    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [unsavedChanges]);
};
