import {
  SectionTitleBar,
  SectionTitleBarBase,
  SectionTitleBarHeading,
  SectionTitleBarSubTitle,
  SectionTitleBase,
  SectionTitleHeading,
  SectionTitleSubTitle
} from './utils/theme';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className
}) => {
  const classNames = SectionTitleBase + ' ' + className;
  return (
    <div className={classNames}>
      <h1 className={SectionTitleHeading}>{title}</h1>

      <p className={SectionTitleSubTitle}>{subtitle}</p>
    </div>
  );
};

export const SectionTitleWithBar: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className
}) => {
  const classNames = SectionTitleBarBase + ' ' + className;
  return (
    <div className={classNames}>
      <span className={SectionTitleBar} />
      <h1 className={SectionTitleBarHeading}>{title}</h1>

      <p className={SectionTitleBarSubTitle}>{subtitle}</p>
    </div>
  );
};
