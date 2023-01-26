import Scrollbar from '@components/ui/scrollbar';
import { siteSettings } from '@settings/site.settings';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import SidebarItem from './sidebar-item';

interface Props {
  absolute?: boolean;
}

const Sidebar: React.FC<Props> = ({ absolute = false }) => {
  const { t } = useTranslation();
  const [showLinkIdLevel1, setShowLinkIdLevel1] = useState<string>('');

  return (
    <aside
      style={{ backgroundColor: '#181818' }}
      className={classNames(
        'w-64 xl:w-64 overflow-y-auto fixed start-0 bottom-0 h-full pt-22',
        { hidden: !absolute, 'lg:block': !absolute, block: absolute }
      )}
    >
      <Scrollbar className="flex flex-col w-full h-full py-3">
        {siteSettings.sidebarLinks.admin.map(({ id, href, label, icon }) => (
          <SidebarItem
            key={id}
            id={id}
            href={href}
            label={t(label)}
            icon={icon}
            includes={href}
            showLinkId={showLinkIdLevel1}
            setShowLinkId={setShowLinkIdLevel1}
            showTriangle
          />
        ))}
        <div className="w-full h-32"></div>
      </Scrollbar>
    </aside>
  );
};
export default Sidebar;
