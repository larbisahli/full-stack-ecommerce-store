if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js');
      let s = Promise.resolve();
      return (
        a[e] ||
          (s = new Promise(async (s) => {
            if ('document' in self) {
              const a = document.createElement('script');
              (a.src = e), document.head.appendChild(a), (a.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!a[e]) throw new Error(`Module ${e} didn’t register its module`);
          return a[e];
        })
      );
    },
    s = (s, a) => {
      Promise.all(s.map(e)).then((e) => a(1 === e.length ? e[0] : e));
    },
    a = { require: Promise.resolve(s) };
  self.define = (s, i, n) => {
    a[s] ||
      (a[s] = Promise.resolve().then(() => {
        let a = {};
        const c = { uri: location.origin + s.slice(1) };
        return Promise.all(
          i.map((s) => {
            switch (s) {
              case 'exports':
                return a;
              case 'module':
                return c;
              default:
                return e(s);
            }
          })
        ).then((e) => {
          const s = n(...e);
          return a.default || (a.default = s), a;
        });
      }));
  };
}
define('./sw.js', ['./workbox-4a677df8'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next//static/media/shop.6fb69313.jpg',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/server/middleware-build-manifest.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/server/middleware-react-loadable-manifest.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/CMmTRJwawKHukfZhYFTYL/_buildManifest.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/CMmTRJwawKHukfZhYFTYL/_middlewareManifest.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/CMmTRJwawKHukfZhYFTYL/_ssgManifest.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/1080-6d31da286f86d5a4.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/22-8d2270a08415f439.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/2512-e14ed5e49b5d1b13.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/2582.f0ca8a5b59730085.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/2651-691afc0420315628.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/2750-f40ce625f16aecb5.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/2814-71d761127d847cb3.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/29107295-4a69275373f23f88.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/2c386607.266851fdb4036405.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/3112-59b3fb29c8755436.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/3433-affcce3d72c6f674.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/361-c40d55f8f272cfe8.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/384-d7793f079a01479a.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/392.a12d099ef0d4ea78.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/3978-6b8af56001b9088a.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/4423.ec7bd9cbcb31e78d.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/4441.e9b8b961350e4d7e.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/4606.385ddb9a69308c58.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/472-a7572083a978f125.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/4775-9b23d968ce8d543e.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/4879.68e1bf703bae8058.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/4882-64ffb01db2769ef6.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/5416-053425fb551ea65b.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/5679.784f9c2b051d1022.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/6085-126cdfdd8ab422fa.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/6092-fc50d3c163775da7.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/6130.1f14793d4af9c50b.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/632cba62-8b8968b14fa1b5f9.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/6401.819c56d30f365165.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/6864-6ac8f5ddd897e6b1.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/6893-434f24ac8f9df24a.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/6c44d60f.da178477ca737a6e.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/713-e8b3930fbcf39bda.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/7229.06e5dbfcf8cbf0dd.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/7291.e8b7649fdca1b4db.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/7487-1b7c7fa1f6b51dfd.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/74fdba35-524c58e5c3f87a52.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/7507-dd9b791f1a3f99d0.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/7536-c5a0954456482815.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/79-d57dc22a2e55da4a.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/8067-bc5339a95d493423.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/8085.3e1e7ed9b69dc676.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/8087.86a8ceacda854d7d.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/812-fe8c09427db014b7.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/8813-ab0641678de41e30.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/894.a5f4088a852171bb.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/8960-fd4c4f526581e99e.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/9035.ff5f7a8e2e0fa3d2.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/9645.1db41935335e1e6f.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/9758.f6887fc95e326586.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/9867-451fd1010909738a.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/a908dc70-9aaf1f62924a51d8.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/c9184924-e9937ac3284a580e.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/framework-f56ddf58448cffad.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/main-884c983fab9e403d.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/_app-f154faf420301eb3.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/_error-750bc0b00d752237.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/attributes-a8fffb18d11fb237.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/attributes/create-311e09530c6227aa.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/attributes/edit/%5BattributeId%5D-bff0057151e67be0.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/categories-e0d2cafba2759911.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/categories/create-605ac9891b34d195.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/categories/edit/%5BcategoryId%5D-64a5decbee41f358.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/coupons-c591ebea0598f621.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/coupons/create-b3fb72f6b04de4b2.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/coupons/edit/%5BcouponId%5D-8d8e85da4b99f6e3.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/customers-c15e775bcdda0588.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/customers/customer/%5BcustomerId%5D-1ed862ea194870d7.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/dashboard-bab8505c25a71f42.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/hero-carousel-b9705ca316695f05.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/hero-carousel/create-5b3b0ef7cbb7b99e.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/hero-carousel/edit/%5BsliderId%5D-de944f29021f2f17.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/invoice-272b0dcf272e2244.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/login-bb2bb2638d56cedd.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/logout-ae0b28b3f901e22c.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/order-status-c2193df76099bd6f.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/order-status/create-55d9391bb47b4348.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/order-status/edit/%5BstatusId%5D-2225dc7130c65e05.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/orders-ff455a3986a048df.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/orders/%5BorderId%5D-1725e3292bc55f76.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/products-b5b56f260ee7f74c.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/products/create-f525c8ce79253a36.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/products/edit/%5BproductId%5D-22d446d8c605d4c1.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/profile-update-28b2caf06740ca43.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/settings/account-information-8c472fae7c5a19a0.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/shippings-bd2d9e913f33c01a.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/shippings/create-a6df22e7f23fa7db.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/shippings/edit/%5BshippingId%5D-d663ef3df812f0ff.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/staffs-1efeb7d226e5b30d.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/staffs/create-f068ee4d9adfb9a5.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/staffs/edit/%5BstaffId%5D-d2b6637f416ae9cd.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/suppliers-32c4de85657deb18.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/suppliers/create-8b84d6e9344c0688.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/suppliers/edit/%5BsupplierId%5D-b0151dca6b3b287a.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/tags-db7a25fa8beb3267.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/tags/create-797bf144b91fadb6.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/pages/tags/edit/%5BtagId%5D-095c33e51ac0c213.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/polyfills-5cd94c89d3acac5f.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/chunks/webpack-117308b63c06839c.js',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/0056c41b6510d70d.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/10bd8e73fdba40d0.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/1112162c6ee3583a.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/30629c2aeef53f42.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/32d2dcb17aacf3b0.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/7b8c9d0b782a3b10.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/847202140afdaf15.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/9379bc914e0719f6.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/94e257eff1df8ddd.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/a12ab886cca994bf.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/ac4fd91e95a81da3.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/c89b3d6a6d4e510a.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/c9ebd13c6d804675.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/cc70df9fb3dd828c.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/d235906a47c5c068.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/f6120d20681c350d.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/css/fe60b20bed1cfb6d.css',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-all-400-normal.d068e995.woff',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-all-600-normal.a80ef551.woff',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-all-700-normal.1a6a5671.woff',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-400-normal.d2d589c8.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-600-normal.7e63f7ff.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-700-normal.b00bec51.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-ext-400-normal.5a6c3ab9.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-ext-600-normal.854e799f.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-cyrillic-ext-700-normal.5b0f83ce.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-greek-400-normal.d584c03a.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-greek-600-normal.e0949010.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-greek-700-normal.01657045.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-greek-ext-400-normal.1039a17c.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-greek-ext-600-normal.1f997874.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-greek-ext-700-normal.7e4a80f5.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-hebrew-400-normal.fdef0626.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-hebrew-600-normal.64944248.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-hebrew-700-normal.0100cdff.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-latin-400-normal.45a6d40a.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-latin-600-normal.921982ef.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-latin-700-normal.dff9eb1f.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-latin-ext-400-normal.12c7eac5.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-latin-ext-600-normal.daf45a0b.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-latin-ext-700-normal.d9e58f76.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-vietnamese-400-normal.8a85f5aa.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-vietnamese-600-normal.7309d47d.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/_next/static/media/open-sans-vietnamese-700-normal.8013bf46.woff2',
          revision: 'CMmTRJwawKHukfZhYFTYL'
        },
        {
          url: '/arrow-next.svg',
          revision: '172baae96fdb01f26d62672e0d4afae3'
        },
        {
          url: '/arrow-previous.svg',
          revision: '6b5b9894d18bc548d347d0110c3b12cd'
        },
        {
          url: '/favicons/android-chrome-192x192.png',
          revision: 'a13ed34282540fd6aea2c789750513c8'
        },
        {
          url: '/favicons/android-chrome-256x256.png',
          revision: 'd6c4c0e48fc190455290841594ec6fa8'
        },
        {
          url: '/favicons/apple-touch-icon.png',
          revision: 'ac71d10876cb5a43bb5781817496bf04'
        },
        {
          url: '/favicons/browserconfig.xml',
          revision: 'b0df1d8364886483f481bc261ea8db4b'
        },
        {
          url: '/favicons/favicon-16x16.png',
          revision: 'ca54625f760a191d5c2cccb473fec502'
        },
        {
          url: '/favicons/favicon-32x32.png',
          revision: '76c72505f933e28379445e9a686e3b4a'
        },
        {
          url: '/favicons/favicon.ico',
          revision: 'ac797f721846a3e20b3859b48e329376'
        },
        {
          url: '/favicons/mstile-150x150.png',
          revision: '62caeece55fa935ca74c88d07bb63b20'
        },
        {
          url: '/favicons/safari-pinned-tab.svg',
          revision: 'b6966a9851a2efac3c0f79f6c0f41181'
        },
        {
          url: '/icons/apple-icon-180.png',
          revision: '4d0bd977c14af140d3069300e07805a1'
        },
        {
          url: '/icons/manifest-icon-192.png',
          revision: 'ec559f69af2f50fc6fd66a7802334197'
        },
        {
          url: '/icons/manifest-icon-512.png',
          revision: 'e29d5657a9035d3e22274d47f3e4c5ec'
        },
        {
          url: '/image/card-argon.png',
          revision: '3870fde74e6242af243ffa92bcaeef0d'
        },
        {
          url: '/image/card-helium.png',
          revision: 'c960dd64e795307c42c48e8f244b7ce5'
        },
        {
          url: '/image/card-krypton.png',
          revision: '173ad5241fb5525926a681f775ab04c4'
        },
        {
          url: '/image/card-neon.png',
          revision: '3165c5e257f5f5d3f1a61cd4571ef624'
        },
        {
          url: '/image/card-xenon.png',
          revision: '3d0b5eb11a9ac071a293d54dfcf09634'
        },
        {
          url: '/image/layout-classic.png',
          revision: '3466c03af75c85989d1aae9b6092d452'
        },
        {
          url: '/image/layout-modern.png',
          revision: 'f524fd6d77a95490dea9683845c0a854'
        },
        {
          url: '/image/layout-standard.png',
          revision: '3a38c5b45aeca63400bbc50454c66a5d'
        },
        {
          url: '/locales/ar/banner.json',
          revision: '5e685b1ef80295e6c826e324caaa9a68'
        },
        {
          url: '/locales/ar/common.json',
          revision: 'fa689d138b1446691dce26960e62d4ad'
        },
        {
          url: '/locales/ar/form.json',
          revision: 'e576f02e1dbdc64795acbcb80df9e604'
        },
        {
          url: '/locales/ar/table.json',
          revision: 'fabb51da67d395aebef878c027d0ad45'
        },
        {
          url: '/locales/ar/widgets.json',
          revision: '953a384792cc5207c53399334a98c42c'
        },
        {
          url: '/locales/en/banner.json',
          revision: 'c0064c757fc9489d809c0e3e7ff532d2'
        },
        {
          url: '/locales/en/common.json',
          revision: '2a72ef761a296576abf4f0ace9ebc04d'
        },
        {
          url: '/locales/en/error.json',
          revision: '65561accfb97a20e5b7df0c53ce5555d'
        },
        {
          url: '/locales/en/form.json',
          revision: '0c1ddd7883992c03b50f9d3c480796f3'
        },
        {
          url: '/locales/en/table.json',
          revision: 'ce845b0c373bb2f4a921139efef65a8f'
        },
        {
          url: '/locales/en/widgets.json',
          revision: '420276e458d72f42c9485de38207bb09'
        },
        {
          url: '/locales/fr/banner.json',
          revision: 'eadceea361eb79e4ac7a28a4cd4bd600'
        },
        {
          url: '/locales/fr/common.json',
          revision: '0b2f5560cc54efd0fbb4fa00879a37fe'
        },
        {
          url: '/locales/fr/form.json',
          revision: 'fb6e1ae77835dfd7e6610a4c5c4f641c'
        },
        {
          url: '/locales/fr/table.json',
          revision: '6ff8c23abd3b68f0d7cb75a672dfcd7a'
        },
        {
          url: '/locales/fr/widgets.json',
          revision: 'd630533b0f9f279498676871bfbb761e'
        },
        { url: '/logo.svg', revision: '602a6d1c80cb99e11e3f417eef27ac69' },
        { url: '/manifest.json', revision: '164ae0f869299d18a9478ca0a9073bdb' },
        {
          url: '/placeholders/avatar.jpg',
          revision: 'd2539261ffa9d45677d10dcdab6483e2'
        },
        {
          url: '/placeholders/avatar.svg',
          revision: '4f5628d48244291a5613c63171ba4168'
        },
        {
          url: '/placeholders/avatar__placeholder.png',
          revision: 'c31b1ddea8ce92d28670559cc792c3ee'
        },
        {
          url: '/placeholders/image.jpg',
          revision: 'c0154dc4bebd3da05d2576c96e9dd4e6'
        },
        {
          url: '/placeholders/image__placeholder.png',
          revision: '4d42aae9ae81346b54a3773429bbfdd4'
        },
        {
          url: '/placeholders/no-image.svg',
          revision: '497c5bb692fe3f0aa7c58582b42ced0b'
        },
        { url: '/robots.txt', revision: '9152d7f1724ed8fbcd2e0c87029f193c' },
        { url: '/shop.jpg', revision: 'cc0e694e0e0e495c0ae09c890b4d9ac0' }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers
                  })
                : s
          }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })
        ]
      }),
      'GET'
    );
});
