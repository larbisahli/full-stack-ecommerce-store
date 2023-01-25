import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import styles from './loading-bar.module.scss';

let cx = classNames.bind(styles);

const LoadingBar = () => {
  const Router = useRouter();
  const [Loading, setLoading] = useState<boolean>(false);
  const LoadingStateCache = useRef<boolean>(false);
  LoadingStateCache.current = Loading;

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      if (!LoadingStateCache.current) setLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      if (LoadingStateCache.current) {
        setLoading(false);
      }
    });
    Router.events.on('routeChangeError', () => {
      setLoading(false);
      // if (LoadingStateCache.current) {

      // }
    });
    return () => setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Router.events]);

  return <div className={cx('container', { show: Loading })}></div>;
};

export default LoadingBar;
