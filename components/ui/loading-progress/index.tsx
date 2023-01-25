import classNames from 'classnames/bind';
import React from 'react';

import styles from './loading-bar.module.scss';

let cx = classNames.bind(styles);

const LoadingProgress = () => {
  return <div className={cx('container')}></div>;
};

export default LoadingProgress;
