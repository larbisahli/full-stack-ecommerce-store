import React from 'react';

import { Navbar, Sidebar, SidebarMini } from '../navigation/index';
import MobileNavigation from '../navigation/mobile-navigation';

const AppLayout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col transition-colors duration-150">
      <Navbar />
      <MobileNavigation>
        <Sidebar absolute />
      </MobileNavigation>
      <div className="flex flex-1 pt-20">
        <Sidebar />
        <SidebarMini />
        <main className="w-full md:ps-20 lg:ps-72 xl:ps-76">
          <div className="p-5 md:p-8 overflow-y-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default AppLayout;
