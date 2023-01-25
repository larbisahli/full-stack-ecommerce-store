import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

type Props = {
  activeClassName: string;
  includes: string;
  className: string;
};

const ActiveLink: React.FC<NextLinkProps & Props> = ({
  href,
  children,
  activeClassName,
  className,
  includes,
  ...props
}) => {
  const { asPath } = useRouter();

  const A = useMemo(() => asPath?.split('/'), [asPath]);
  const B = useMemo(() => includes?.split('/'), [includes]);

  const class_name =
    asPath === href ||
    asPath === props.as ||
    A[A?.length - 1] === B[B?.length - 1]
      ? `${className} ${activeClassName}`.trim()
      : className;

  return (
    <NextLink href={href} passHref>
      <a className={class_name}>{children}</a>
    </NextLink>
  );
};

export default ActiveLink;
