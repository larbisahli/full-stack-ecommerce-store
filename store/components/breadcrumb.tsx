import ChevronForward from '@store/assets/icons/chevron-right';
import HomeOutline from '@store/assets/icons/home';
import { ROUTES } from '@utils/routes';
import useBreadcrumb, { convertBreadcrumbTitle } from '@utils/use-breadcrumb';
import React from 'react';

import ActiveLink from './active-link';

interface Props {
  children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className="lg:text-sm line-clamp-1 text-xs text-skin-muted px-2.5 transition duration-200 ease-in first:ps-0 last:pe-0 hover:text-skin-base min-w-min"
      {...props}
    >
      {children}
    </li>
  );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li className="text-base text-skin-base mt-[1px]" {...props}>
      {children}
    </li>
  );
};

export const BreadcrumbItems = (props: any) => {
  let children: any = React.Children.toArray(props.children);

  children = children.map((child: string, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc: any, child: string, index: number) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {props.separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <div className="borobazarBreadcrumb flex items-center mb-5">
      <ol className="flex items-center w-full overflow-hidden">{children}</ol>
    </div>
  );
};

const Breadcrumb: React.FC<{ separator?: string }> = ({
  separator = (
    <div className="text-skin-base text-opacity-40 text-15px">
      <ChevronForward width="6px" height="10px" />
    </div>
  )
}) => {
  const breadcrumbs = useBreadcrumb();
  return (
    <BreadcrumbItems separator={separator}>
      <ActiveLink href={'/'} activeClassName="font-semibold text-black">
        <a className="inline-flex items-center">
          <div className="mr-1.5 text-skin-base text-15px">
            <HomeOutline />
          </div>
          Home
        </a>
      </ActiveLink>

      {breadcrumbs?.map((breadcrumb: any) => (
        <ActiveLink
          href={breadcrumb.href}
          activeClassName="font-semibold text-black"
          key={breadcrumb.href}
        >
          <a className="capitalize">
            {convertBreadcrumbTitle(breadcrumb.breadcrumb)}
          </a>
        </ActiveLink>
      ))}
    </BreadcrumbItems>
  );
};

export default Breadcrumb;
