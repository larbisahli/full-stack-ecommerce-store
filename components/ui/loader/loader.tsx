import cn from 'classnames';

import styles from './loader.module.css';

interface Props {
  className?: string;
  text?: string;
  showText?: boolean;
  simple?: boolean;
  height?: string;
  borderColor?: string;
}

const Loader = (props: Props) => {
  const {
    className,
    showText = true,
    text = 'Loading...',
    simple,
    height = 'calc(100vh - 200px)',
    borderColor
  } = props;
  return (
    <>
      {simple ? (
        <div
          className={cn(styles.simple_loading, className)}
          style={{ borderTopColor: borderColor }}
        />
      ) : (
        <div
          className={cn(
            'w-full flex flex-col items-center justify-center',
            className
          )}
          style={{ height, borderTopColor: borderColor }}
        >
          <div className={styles.loading} />

          {showText && (
            <h3 className="text-lg font-semibold text-body italic">{text}</h3>
          )}
        </div>
      )}
    </>
  );
};

export default Loader;
