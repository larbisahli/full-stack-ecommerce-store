import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@styles/main.css';
import '@store/assets/styles/index.css';
import 'typeface-open-sans';

import ErrorBoundary from '@components/ErrorBoundary';
import LoadingBar from '@components/ui/loading-bar';
// import ErrorMessage from "@components/ui/error-message";
import ManagedModal from '@components/ui/modal/managed-modal';
import { ModalProvider } from '@components/ui/modal/modal.context';
import { SettingsProvider } from '@contexts/settings.context';
import { StaffInfoProvider } from '@contexts/staff.context';
import { TimeCacheProvider } from '@contexts/time.context';
import { UIProvider } from '@contexts/ui.context';
import store from '@redux/index';
// import { ModalProvider } from 'contexts/modal/modal.provider';
import { DrawerProvider } from '@store/contexts/drawer/drawer.provider';
import { SearchProvider } from '@store/contexts/search/use-search';
import { StickyProvider } from '@store/contexts/sticky/sticky.provider';
// import PageLoader from "@components/ui/page-loader/page-loader";
// import { useSettingsQuery } from "@graphql/settings.graphql";
import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { Slide, ToastContainer } from 'react-toastify';

const Noop: React.FC = ({ children }) => <>{children}</>;

// const AppSettings: React.FC = (props) => {
//   // const { data, loading, error } = useSettingsQuery();
//   const data ={}
//   // if (loading) return <PageLoader />;
//   // if (error) return <ErrorMessage message={error.message} />;
//   return <SettingsProvider initialValue={data?.settings?.options} {...props} />;
// };

function App({ Component, pageProps }: AppProps) {
  // const { asPath } = useRouter();

  const Layout = (Component as any).Layout || Noop;

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        className="text-sm"
        // hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <Provider store={store}>
        <SettingsProvider>
          <ErrorBoundary>
            <SearchProvider>
              <StickyProvider>
                <DrawerProvider>
                  <TimeCacheProvider>
                    <StaffInfoProvider>
                      <LoadingBar />
                      {/* <AppSettings> */}
                      <UIProvider>
                        <ModalProvider>
                          <ManagedModal />
                          <Layout {...pageProps}>
                            <Component {...pageProps} />
                          </Layout>
                        </ModalProvider>
                      </UIProvider>
                      {/* </AppSettings> */}
                    </StaffInfoProvider>
                  </TimeCacheProvider>
                </DrawerProvider>
              </StickyProvider>
            </SearchProvider>
          </ErrorBoundary>
        </SettingsProvider>
      </Provider>
    </Fragment>
  );
}

const FixNum = (num: number) => Number((num / 1000).toFixed(6));

export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'FCP':
      console.log('First Contentful Paint (s): ', FixNum(metric.startTime));
      break;
    case 'LCP':
      console.log('Largest Contentful Paint (s): ', FixNum(metric.startTime));
      break;
    case 'CLS':
      console.log('Cumulative Layout Shift (s): ', FixNum(metric.startTime));
      break;
    case 'FID':
      console.log('First Input Delay (s): ', FixNum(metric.startTime));
      break;
    case 'TTFB':
      console.log('Time to First Byte (s): ', FixNum(metric.startTime));
      break;
    case 'Next.js-hydration':
      console.log('Next.js hydration (s): ', FixNum(metric.startTime));
      break;
    default:
      console.log(`${metric.name} (S)`, FixNum(metric.startTime));
      break;
  }
}

export default appWithTranslation(App);
