import { useSettings } from '@contexts/settings.context';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import React from 'react';

import { Navbar, Sidebar, SidebarMini } from '../navigation/index';
import MobileNavigation from '../navigation/mobile-navigation';

const AppLayout: React.FC = ({ children }) => {
  const { storeName, favicon } = useSettings();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col transition-colors duration-150">
      <NextDefaultSeo
        title={`${storeName} | Admin`}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1 maximum-scale=1'
          },
          {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
          },
          {
            name: 'theme-color',
            content: '#ffffff'
          }
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: `${process.env.S3_ENDPOINT}/${favicon?.image}`
          },
          {
            rel: 'apple-touch-icon',
            href: `${process.env.S3_ENDPOINT}/${favicon?.image}`,
            sizes: '76x76'
          },
          {
            rel: 'apple-touch-icon',
            href: 'icons/apple-icon-180.png'
          },
          {
            rel: 'manifest',
            href: '/manifest.json'
          }
        ]}
      />
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
