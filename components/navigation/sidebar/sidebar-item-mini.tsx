/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as sidebarIcons from '@components/icons/sidebar';
import ActiveLink from '@components/ui/activeLink';
import { useUI } from '@contexts/ui.context';
import cn from 'classnames';
import classNames from 'classnames/bind';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import styles from '../scss/index.module.scss';

let cx = classNames.bind(styles);

interface Props {
  href: string;
  icon: string;
  label: string;
  includes: string;
  line?: boolean;
  margin?: boolean;
  showTriangle?: boolean;
  subLinks?: {
    id: string;
    href: string;
    icon?: string;
    label: string;
    padding: string;
  }[];
}

const SidebarItem = ({
  href,
  icon,
  label,
  includes,
  line,
  margin = false,
  subLinks
}: Props) => {
  const { asPath } = useRouter();

  const { toggleSidebar } = useUI();
  const hadSubLinks = useMemo(() => !isEmpty(subLinks), [subLinks]);

  const A = useMemo(() => asPath?.split('/'), [asPath]);
  const B = useMemo(() => includes?.split('/'), [includes]);

  return (
    <React.Fragment>
      {line && <div className="w-full h-px bg-sidenav-divider mt-2 mb-2"></div>}
      {hadSubLinks ? (
        <div
          className={cn(
            'overflow-hidden flex relative justify-center w-full py-4 pb-6 hover:bg-gray-700 p-2 items-center text-base text-start text-sidenav-color focus:text-accent hover:border-green-300 hover:border-l-2 border-l-2 border-transparent border-solid cursor-pointer',
            {
              'mb-12': margin,
              'sidebar-triangle': A[1] === B[1],
              '!bg-blue-600': A[1] === B[1],
              '!text-white': A[1] === B[1]
            }
          )}
          onClick={toggleSidebar}
        >
          <SidebarLabel icon={icon} label={label} />
        </div>
      ) : (
        <ActiveLink
          href={href}
          activeClassName="sidebar-triangle relative !bg-green-600 hover:!bg-green-500 !text-white"
          className={cn(
            'overflow-hidden flex relative justify-center w-full py-4 pb-6 hover:bg-gray-700 p-2 items-center text-base text-start text-sidenav-color focus:text-accent hover:border-green-300 hover:border-l-2 border-l-2 border-transparent border-solid',
            { 'mb-12': margin }
          )}
          includes={includes}
        >
          <SidebarLabel icon={icon} label={label} />
        </ActiveLink>
      )}
    </React.Fragment>
  );
};

const SidebarLabel = ({ icon, label }: { icon: string; label: string }) => {
  const { closeSidebar } = useUI();

  const TagName = sidebarIcons[icon];

  return (
    <React.Fragment>
      {TagName && <TagName className="w-5 h-5 me-4 ml-2" />}
      <span
        className={`${cx('mini-slider-container')}`}
        onClick={() => closeSidebar()}
      >
        {label}
      </span>
    </React.Fragment>
  );
};

export default SidebarItem;
