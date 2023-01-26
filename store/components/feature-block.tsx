import React from 'react';

import {
  FeatureBase,
  FeatureContent,
  FeatureCounter,
  FeatureDetails,
  FeatureTitle
} from './utils/theme';

type FeatureBLockProps = {
  title: string;
  description: string;
  className?: string;
  counterBg?: string;
  counter: number;
};

const FeatureBLock: React.FC<FeatureBLockProps> = ({
  title,
  description,
  className,
  counterBg,
  counter
}) => {
  const classNames = FeatureBase + ' ' + className;
  return (
    <div className={classNames}>
      <span className={FeatureCounter} style={{ backgroundColor: counterBg }}>
        {counter}
      </span>
      <div className={FeatureContent}>
        <span className={FeatureTitle}>{title}</span>

        <p className={FeatureDetails}>{description}</p>
      </div>
    </div>
  );
};

export default FeatureBLock;
