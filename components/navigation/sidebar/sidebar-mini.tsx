import Scrollbar from '@components/ui/scrollbar';
import { siteSettings } from '@settings/site.settings';
import { useTranslation } from 'next-i18next';
import React from 'react';

import SidebarItem from './sidebar-item-mini';

const SidebarMini: React.FC = () => {
  const { t } = useTranslation();

  return (
    <aside className="w-20 xl:w-76 hidden lg:hidden md:block overflow-y-auto bg-sidenav fixed start-0 bottom-0 h-full pt-22">
      <Scrollbar className="flex flex-col w-full h-full space-y-6 py-3">
        {siteSettings.sidebarLinks.admin.map(
          ({ id, href, label, icon, line, subLinks }) => (
            <SidebarItem
              key={id}
              href={href}
              label={t(label)}
              icon={icon}
              includes={href}
              line={line}
              subLinks={subLinks}
              showTriangle
            />
          )
        )}
        <div className="w-full h-32"></div>
      </Scrollbar>
    </aside>
  );
};
export default SidebarMini;
