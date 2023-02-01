/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as sidebarIcons from '@components/icons/sidebar';
import ActiveLink from '@components/ui/activeLink';
import { useUI } from '@contexts/ui.context';
import { useGetStaff } from '@hooks/useGetStaff';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  id: string;
  href: string;
  icon?: string;
  label: string;
  includes: string;
  line?: boolean;
  margin?: boolean;
  showTriangle?: boolean;
  padding?: string;
  showLinkId: string;
  setShowLinkId: Dispatch<SetStateAction<string>>;
}

interface LabelProps {
  icon: string;
  label: string;
  padding: string;
}

const SidebarItem = ({
  href,
  icon,
  label,
  includes,
  line,
  showTriangle,
  padding
}: Props) => {
  const { t } = useTranslation();

  const { staffInfo } = useGetStaff();

  if (!staffInfo?.isAdmin && ROUTES.STAFFS === href) {
    return <div></div>;
  }

  return (
    <React.Fragment>
      <ActiveLink
        href={href}
        activeClassName={cn(
          'relative !bg-gray-700 hover:!bg-gray-500 !text-white',
          {
            'sidebar-triangle': showTriangle
          }
        )}
        className={cn(
          'overflow-hidden flex w-full pl-6 hover:bg-gray-700 p-2 items-center text-base text-sidenav-color text-start focus:text-accent hover:border-solid hover:border-green-300 hover:border-l-2 border-l-2 border-transparent border-solid',
          { 'nav-sub-links-bg': !!padding }
        )}
        includes={includes}
      >
        <SidebarLabel icon={icon} padding={padding} label={label} />
      </ActiveLink>
    </React.Fragment>
  );
};

const SidebarLabel = ({ icon, padding, label }: LabelProps) => {
  const { closeSidebar } = useUI();

  const handleCloseSidebar = () => {
    closeSidebar();
  };

  const TagName = sidebarIcons[icon];

  return (
    <React.Fragment>
      <div className="flex items-center">
        {icon && TagName && <TagName className="w-5 h-5 me-4" />}
        <span style={{ paddingLeft: padding }} onClick={handleCloseSidebar}>
          {label}
        </span>
      </div>
    </React.Fragment>
  );
};

export default SidebarItem;
