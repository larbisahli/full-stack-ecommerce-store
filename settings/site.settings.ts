import { ROUTES } from '@utils/routes';

export const siteSettings = {
  name: 'DropGala',
  description: 'Great place to buy items with a fair price.',
  logo: {
    url: '/logo.svg',
    alt: 'DropGala',
    href: '/',
    width: 128,
    height: 40
  },
  defaultLanguage: 'en',
  author: {
    name: 'DropGala',
    websiteUrl: 'https://business.dropgala.com',
    address: ''
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: ROUTES.PROFILE_UPDATE,
      labelTransKey: 'authorized-nav-item-profile'
    },
    {
      href: ROUTES.LOGOUT,
      labelTransKey: 'authorized-nav-item-logout'
    }
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      {
        id: '0aoqNP',
        href: ROUTES.DASHBOARD,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon'
      },
      {
        id: 'vwAaJY',
        href: ROUTES.ORDERS,
        label: 'sidebar-nav-item-orders',
        icon: 'OrdersIcon'
      },
      {
        id: 'h4ifwC',
        href: ROUTES.PRODUCTS,
        label: 'sidebar-nav-item-products',
        icon: 'ProductsIcon'
      },
      {
        id: '489yLk',
        href: ROUTES.CATEGORIES,
        label: 'sidebar-nav-item-categories',
        icon: 'CategoriesIcon'
      },
      {
        id: 'vGN6vK',
        href: ROUTES.ATTRIBUTES,
        label: 'sidebar-nav-item-attributes',
        icon: 'AttributeIcon'
      },
      // {
      //   id: 'yNqHtb',
      //   href: ROUTES.TAGS,
      //   label: 'sidebar-nav-item-tags',
      //   icon: 'TagIcon'
      // },
      // {
      //   id: 'Qk3MiG',
      //   href: ROUTES.COUPONS,
      //   label: 'sidebar-nav-item-coupons',
      //   icon: 'CouponsIcon'
      // },
      // {
      //   id: 'D2IcKt',
      //   href: ROUTES.SUPPLIERS,
      //   label: 'sidebar-nav-item-suppliers',
      //   icon: 'SuppliersIcon'
      // },
      // {
      //   id: 'D2IcLt',
      //   href: ROUTES.CUSTOMERS,
      //   label: 'sidebar-nav-item-customers',
      //   icon: 'UsersIcon'
      // },
      {
        id: 'WaIqCI',
        href: ROUTES.HERO_CAROUSEL,
        label: 'sidebar-nav-item-hero-carousel',
        icon: 'ImageMultipleIcon'
      },
      {
        id: 'JU3uYy',
        href: ROUTES.STAFFS,
        label: 'sidebar-nav-item-staffs',
        icon: 'StaffsIcon'
      },
      {
        id: 'nMtvIg',
        href: '/settings',
        label: 'sidebar-nav-item-settings',
        icon: 'SettingsIcon'
      }
    ]
  },
  product: {
    image: 'placeholders/image.jpg',
    placeholder: 'placeholders/image__placeholder.png'
  },
  avatar: {
    image: 'placeholders/avatar.jpg',
    placeholder: 'placeholders/avatar__placeholder.png'
  }
};
