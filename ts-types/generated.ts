/* eslint-disable no-unused-vars */
import type { Nullable, PrivilegesType, Scalars } from './custom.types';

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  DISPLAY_ORDER = 'display_order'
}

export enum ProductStatus {
  Publish = 'publish',
  Draft = 'draft'
}

export enum ShippingType {
  Fixed = 'fixed',
  Free = 'free_shipping'
}

export enum CouponType {
  Fixed = 'fixed',
  Percentage = 'percentage',
  FreeShipping = 'free_shipping'
}

export enum PrivacyType {
  Public = 'public',
  Private = 'private'
}

export enum ProductType {
  Simple = 'simple',
  Variable = 'variable'
}

export enum ShippingRateEnum {
  Weight = 'weight',
  Price = 'price'
}

export declare enum WithdrawStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  OnHold = 'ON_HOLD',
  Rejected = 'REJECTED',
  Processing = 'PROCESSING'
}

export enum VariationActions {
  APPEND_VARIATION = 'APPEND_VARIATION',
  CHANGE_VARIATION = 'CHANGE_VARIATION',
  REMOVE_VARIATION = 'REMOVE_VARIATION',
  CHANGE_VARIATION_VALUES = 'CHANGE_VARIATION_VALUES',
  CHANGE_VARIATION_OPTION = 'CHANGE_VARIATION_OPTION',
  INIT = 'INIT',
  CARTESIAN = 'CARTESIAN'
}

export enum ShippingsActions {
  INSERT = 'INSERT',
  INIT = 'INIT',
  DELETE = 'DELETE',
  ADD_SHIPPING = 'ADD_SHIPPING',
  DELETE_SHIPPING = 'DELETE_SHIPPING',
  ADD_SHIPPING_PROVIDER = 'ADD_SHIPPING_PROVIDER',
  ADD_SHIPPING_ZONE = 'ADD_SHIPPING_ZONE',
  ADD_ZONE = 'ADD_ZONE',
  SHIPPING_PRICE = 'SHIPPING_PRICE',
  CLEAR_GLOBAL = 'CLEAR_GLOBAL',
  DELETE_SHIPPING_ZONE = 'DELETE_SHIPPING_ZONE'
}

export interface CreatedUpdatedByAt {
  createdAt?: Scalars['DateTime'];
  updatedAt?: Scalars['DateTime'];
  createdBy?: Nullable<{
    id: string;
    firstName: string;
    lastName: string;
    profile?: string;
  }>;
  updatedBy?: Nullable<{
    id: string;
    firstName: string;
    lastName: string;
    profile?: string;
  }>;
  page?: number;
  limit?: number;
}

export interface RoleType extends CreatedUpdatedByAt {
  id?: string;
  roleName?: string;
  privileges?: PrivilegesType[];
}

export interface StaffType extends CreatedUpdatedByAt {
  id: string;
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  profile: ImageType;
  phoneNumber: Nullable<Scalars['Int']>;
  active: boolean;
  isAdmin: boolean;
  csrfToken?: string;
  csrfError?: string;
}

export interface Category extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
  parentId?: Nullable<Scalars['ID']>;
  name?: Scalars['String'];
  description?: Nullable<Scalars['String']>;
  children?: Nullable<Array<CategoryRef>>;
  subCategories?: Nullable<Array<CategoryRef>>;
  active?: Scalars['Boolean'];
  thumbnail?: { image: string };
  image?: string;
  icon?: Nullable<Scalars['String']>;
  hasChildren?: Scalars['Boolean'];
  parent?: Nullable<CategoryRef>;
}

export interface CategoryRef extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
  parentId?: Nullable<Scalars['ID']>;
  name?: Scalars['String'];
  description?: Nullable<Scalars['String']>;
  active?: Scalars['Boolean'];
  image?: string;
  icon?: Nullable<Scalars['String']>;
  // parent?: Nullable<Category>;
}

export interface ProductShippingInfo {
  id?: Scalars['ID'];
  productId?: Scalars['ID'];
  weight?: Scalars['Int'];
  weightUnit?: { unit: Scalars['String'] };
  volume?: Scalars['Int'];
  volumeUnit?: { unit: Scalars['String'] };
  dimensionWidth?: Scalars['Int'];
  dimensionHeight?: Scalars['Int'];
  dimensionDepth?: Scalars['Int'];
  dimensionUnit?: { unit: Scalars['String'] };
}

export interface AttributeValue {
  id?: Scalars['ID'];
  attributeId?: Scalars['ID'];
  value?: Scalars['String'];
  color?: Nullable<Scalars['String']>;
}

export interface Attribute extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
  name?: Scalars['String'];
  values?: AttributeValue[] | [];
}

export interface Tag extends CreatedUpdatedByAt {
  id?: Nullable<Scalars['ID']>;
  name?: Nullable<Scalars['String']>;
  icon?: Nullable<Scalars['String']>;
}

export interface OrderStatus extends CreatedUpdatedByAt {
  id?: Nullable<Scalars['ID']>;
  name?: Nullable<Scalars['String']>;
  color?: Nullable<Scalars['String']>;
  privacy?: PrivacyType;
  // serial: Scalars['Int'];
}

export interface Coupon extends CreatedUpdatedByAt {
  id?: Nullable<Scalars['ID']>;
  code?: Nullable<Scalars['String']>;
  // description: Scalars['String'];
  // image: Scalars['String'];
  discountValue?: Scalars['Int'];
  discountType?:
    | {
        value: CouponType;
      }
    | CouponType;
  timesUsed?: Nullable<Scalars['Int']>;
  maxUsage?: Nullable<Scalars['Int']>;
  orderAmountLimit?: Nullable<Scalars['Int']>;
  couponStartDate?: Nullable<Scalars['Date']>;
  couponEndDate?: Nullable<Scalars['Date']>;
}

export interface ShippingZoneType extends CreatedUpdatedByAt {
  shippingZone: {
    id?: Scalars['ID'];
    name?: Scalars['String'];
    displayName?: Scalars['String'];
    active?: Scalars['Boolean'];
    freeShipping?: Scalars['Boolean'];
    rateType?: { id?: number; name?: string; type?: string };
  };
  zones?: CountriesType[];
  shippingRates?: ShippingRateType[];
}

export interface ShippingRateType {
  id?: Scalars['ID'];
  weightUnit?: { unit: Scalars['String'] };
  minValue?: Scalars['Int'];
  maxValue?: Nullable<Scalars['Int']>;
  noMax?: Scalars['Boolean'];
  price?: Scalars['Int'];
  index?: Scalars['Int'];
}

export interface CountriesType {
  id: Scalars['ID'];
  iso: Scalars['String'];
  name: Scalars['String'];
  upperName?: Scalars['String'];
  iso3?: Scalars['String'];
  numCode?: Scalars['String'];
  phoneCode?: Scalars['String'];
}

export declare type ContactDetails = {
  socials?: Nullable<Array<Nullable<Social>>>;
  email?: Nullable<Scalars['String']>;
  number?: Nullable<Scalars['String']>;
  location?: Nullable<LocationInput>;
  website?: Nullable<Scalars['String']>;
};

export declare type Social = {
  type?: Nullable<Scalars['String']>;
  link?: Nullable<Scalars['String']>;
  icon?: Nullable<Scalars['String']>;
};

export declare type LocationInput = {
  lat?: Nullable<Scalars['Float']>;
  lng?: Nullable<Scalars['Float']>;
  city?: Nullable<Scalars['String']>;
  state?: Nullable<Scalars['String']>;
  country?: Nullable<Scalars['String']>;
  zip?: Nullable<Scalars['String']>;
  formattedAddress?: Nullable<Scalars['String']>;
};

export interface Product extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
  key?: string;
  slug?: Scalars['String'];
  name: Scalars['String'];
  sku?: Nullable<Scalars['String']>;
  salePrice?: Scalars['Float'];
  comparePrice?: Scalars['Float'];
  buyingPrice?: Scalars['Float'];
  maxPrice?: Scalars['Float'];
  minPrice?: Scalars['Float'];
  quantity?: Scalars['Int'];
  orderQuantity?: Scalars['Int'];
  inStock?: Nullable<Scalars['Boolean']>;
  shortDescription?: Nullable<Scalars['String']>;
  description?: Scalars['String'];
  type?: { id: ProductType; name?: string };
  published?: Scalars['Boolean'];
  status?: ProductStatus;
  disableOutOfStock?: Scalars['Boolean'];
  note?: Nullable<Scalars['String']>;
  thumbnail?: ImageType;
  gallery?: Nullable<ImageType[]>;
  categories?: Array<Category>;
  suppliers?: Nullable<Array<Suppliers>>;
  tags?: Nullable<Array<Nullable<Tag>>>;
  productShippingInfo?: ProductShippingInfo;
  variationOptions?: VariationOptionsType[];
  orderVariationOption?: VariationOptionsType;
  variations?: VariationType[];
  // [key: string]: any;
}

export interface ImageType {
  id?: string;
  image: string;
}
export interface VariationType {
  attribute: Attribute;
  selectedValues: Array<Nullable<AttributeValue>>;
}

export interface VariationOptionsType {
  id?: string;
  title: string;
  key?: string;
  isDisable?: boolean;
  active?: boolean;
  image: string;
  options: string[];
  salePrice: Scalars['Float'];
  comparePrice: Scalars['Float'];
  buyingPrice: Scalars['Float'];
  quantity: Scalars['Int'];
  sku: Scalars['String'];
}

export interface Suppliers extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
  name?: Scalars['String'];
  company?: Nullable<Scalars['String']>;
  phoneNumber?: Nullable<Scalars['String']>;
  addressLine1?: Scalars['String'];
  addressLine2?: Nullable<Scalars['String']>;
  country?: Nullable<CountriesType>;
  city?: Nullable<Scalars['String']> | { name: string };
  note?: Nullable<Scalars['String']>;
}

export interface HeroBannerType {
  id?: Scalars['ID'];
  destinationUrl?: Nullable<Scalars['String']>;
  thumbnail?: ImageType;
  title?: Scalars['String'];
  description?: Nullable<Scalars['String']>;
  btnLabel?: Scalars['String'];
  styles?: {
    textColor?: string;
    btnBgc?: string;
    btnTextColor?: string;
  };
  displayOrder?: Scalars['Int'];
}

export interface Settings {
  currency?: any;
  logo?: { image: string };
  favicon?: { image: string };
  storeName?: string;
  storeEmail?: string;
  storeNumber?: string;
  canonicalUrl?: string;
  socials?: {
    items?: {
      url: string;
      icon: {
        value: string;
        label: string;
      };
    }[];
  };
  maxCheckoutQuantity?: number;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: any;
    twitterHandle: string;
    twitterCardType: string;
    metaTags: string;
    canonicalUrl: string;
  };
  google?: {
    isEnable: boolean;
    tagManagerId: string;
  };
  facebook?: {
    isEnable: boolean;
    appId: string;
    pageId: string;
  };
}

export interface HeroCarouselType extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
  destinationUrl?: Nullable<Scalars['String']>;
  thumbnail?: ImageType;
  title?: Scalars['String'];
  description?: Nullable<Scalars['String']>;
  btnLabel?: Scalars['String'];
  styles?: {
    textColor?: string;
    btnBgc?: string;
    btnTextColor?: string;
  };
  displayOrder?: Scalars['Int'];
  published?: Scalars['Boolean'];
  status?: 'draft' | 'publish';
  clicks?: Scalars['Int'];
}
