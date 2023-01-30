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
  slug?: Scalars['String'];
  name: Scalars['String'];
  sku?: Nullable<Scalars['String']>;
  salePrice?: Scalars['Float'];
  comparePrice?: Scalars['Float'];
  buyingPrice?: Scalars['Float'];
  maxPrice?: Scalars['Float'];
  minPrice?: Scalars['Float'];
  quantity?: Scalars['Int'];
  inStock?: Nullable<Scalars['Boolean']>;
  shortDescription?: Nullable<Scalars['String']>;
  description?: Scalars['String'];
  type?: { id: ProductType; name?: string };
  published?: Scalars['Boolean'];
  status?: ProductStatus;
  disableOutOfStock?: Scalars['Boolean'];
  note?: Nullable<Scalars['String']>;
  thumbnail?: string;
  gallery?: Nullable<string[]>;
  categories?: Array<Category>;
  suppliers?: Nullable<Array<Suppliers>>;
  tags?: Nullable<Array<Nullable<Tag>>>;
  productShippingInfo?: ProductShippingInfo;
  variationOptions?: VariationOptionsType[];
  variations?: VariationType[];
  // [key: string]: any;
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
  thumbnail?: string;
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

export interface HeroCarouselType extends CreatedUpdatedByAt {
  id?: Scalars['ID'];
  destinationUrl?: Nullable<Scalars['String']>;
  thumbnail?: string;
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

// export declare type Address = {
//   id: Scalars['ID'];
//   title?: Nullable<Scalars['String']>;
//   default?: Nullable<Scalars['Boolean']>;
//   address?: Nullable<UserAddress>;
//   type?: Nullable<Scalars['String']>;
//   customer?: Nullable<User>;
// };

// export declare type UserAddress = {
//   country?: Maybe<Scalars['String']>;
//   city?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   street_address?: Maybe<Scalars['String']>;
// };

// export declare type User = {
//   id: Scalars['ID'];
//   name: Scalars['String'];
//   shops: [Shop];
//   managed_shop: Shop;
//   is_active: Boolean;
//   email: Scalars['String'];
//   created_at: Scalars['DateTime'];
//   updated_at: Scalars['DateTime'];
//   profile?: Maybe<Profile>;
//   address: Array<Address>;
//   orders?: Maybe<OrderPaginator>;
// };

// export declare type Profile = {
//   id: Scalars['ID'];
//   avatar?: Maybe<String>;
//   bio?: Maybe<Scalars['String']>;
//   contact?: Maybe<Scalars['String']>;
//   socials?: Maybe<Array<Maybe<Social>>>;
//   customer?: Maybe<User>;
// };

// export declare type Order = {
//   id: Scalars['ID'];
//   tracking_number: Scalars['String'];
//   customer_contact: Scalars['String'];
//   customer_id: Scalars['Int'];
//   customer?: Maybe<User>;
//   status: OrderStatus;
//   amount: Scalars['Float'];
//   sales_tax: Scalars['Float'];
//   total: Scalars['Float'];
//   paid_total: Scalars['Float'];
//   payment_id?: Maybe<Scalars['String']>;
//   payment_gateway?: Maybe<Scalars['String']>;
//   coupon?: Maybe<Coupon>;
//   discount?: Maybe<Scalars['Float']>;
//   delivery_fee?: Maybe<Scalars['Float']>;
//   delivery_time: Scalars['String'];
//   products: Array<Product>;
//   created_at: Scalars['DateTime'];
//   updated_at: Scalars['DateTime'];
//   billing_address?: Maybe<UserAddress>;
//   shipping_address?: Maybe<UserAddress>;
// };

// export declare type Variation = {
//   __typename?: 'Variation';
//   id?: Maybe<Scalars['ID']>;
//   title?: Maybe<Scalars['String']>;
//   price?: Maybe<Scalars['Float']>;
//   sku?: Maybe<Scalars['String']>;
//   is_disable?: Maybe<Scalars['Boolean']>;
//   sale_price?: Maybe<Scalars['Float']>;
//   quantity?: Maybe<Scalars['Int']>;
//   options?: Maybe<Array<Maybe<VariationOption>>>;
// };

// export declare type VariationOption = {
//   __typename?: 'VariationOption';
//   name?: Maybe<Scalars['String']>;
//   value?: Maybe<Scalars['String']>;
// };

// export declare type TaxInput = {
//   name?: Maybe<Scalars['String']>;
//   rate?: Maybe<Scalars['Float']>;
//   is_global?: Maybe<Scalars['Boolean']>;
//   country?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   city?: Maybe<Scalars['String']>;
//   priority?: Maybe<Scalars['Int']>;
//   on_shipping?: Maybe<Scalars['Boolean']>;
// };

// export declare type TaxUpdateInput = {
//   name?: Maybe<Scalars['String']>;
//   rate?: Maybe<Scalars['Float']>;
//   is_global?: Maybe<Scalars['Boolean']>;
//   country?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   city?: Maybe<Scalars['String']>;
//   priority?: Maybe<Scalars['Int']>;
//   on_shipping?: Maybe<Scalars['Boolean']>;
// };

// export declare type AddressInput = {
//   title: Scalars['String'];
//   default?: Nullable<Scalars['Boolean']>;
//   address: UserAddressInput;
//   type: Scalars['String'];
//   customer?: Nullable<ConnectBelongsTo>;
// };

// export declare type AttributeValueInput = {
//   id?: Maybe<Scalars['Int']>;
//   value: Scalars['String'];
//   meta?: Maybe<Scalars['String']>;
// };

// export declare type AttributeInput = {
//   name: Scalars['String'];
//   shop_id: Scalars['Int'];
//   values: AttributeValueInput;
// };

// export declare type CheckoutVerificationInput = {
//   amount: Scalars['Float'];
//   products: Array<ConnectProductOrderPivot>;
//   billing_address?: Maybe<UserAddressInput>;
//   shipping_address?: Maybe<UserAddressInput>;
// };

// export declare type ConnectProductOrderPivot = {
//   product_id: Scalars['ID'];
//   order_quantity?: Maybe<Scalars['Int']>;
//   unit_price?: Maybe<Scalars['Float']>;
//   subtotal?: Maybe<Scalars['Float']>;
// };

// export declare type VerifiedCheckoutData = {
//   total_tax: Scalars['Float'];
//   shipping_charge: Scalars['Float'];
//   unavailable_products: Array<Scalars['ID']>;
// };

// export type Tax = {
//   id?: Maybe<Scalars['ID']>;
//   name?: Maybe<Scalars['String']>;
//   rate?: Maybe<Scalars['Float']>;
//   is_global?: Maybe<Scalars['Boolean']>;
//   country?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   city?: Maybe<Scalars['String']>;
//   priority?: Maybe<Scalars['Int']>;
//   on_shipping?: Maybe<Scalars['Boolean']>;
// };

// export declare type CardInput = {
//   number: Scalars['String'];
//   expiryMonth: Scalars['String'];
//   expiryYear: Scalars['String'];
//   cvv: Scalars['String'];
//   email?: Maybe<Scalars['String']>;
// };

// export type PasswordChangeResponse = {
//   message?: Maybe<Scalars['String']>;
//   success?: Maybe<Scalars['Boolean']>;
// };

// export type ForgetPasswordInput = {
//   email: Scalars['String'];
// };

// export type VerifyForgetPasswordTokenInput = {
//   token: Scalars['String'];
//   email: Scalars['String'];
// };

// export type ResetPasswordInput = {
//   token: Scalars['String'];
//   email: Scalars['String'];
//   password: Scalars['String'];
// };

// export type SocialInput = {
//   type?: Maybe<Scalars['String']>;
//   link?: Maybe<Scalars['String']>;
// };

// export declare type Analytics = {
//   totalRevenue?: Maybe<Scalars['Float']>;
//   todaysRevenue?: Maybe<Scalars['Float']>;
//   totalOrders?: Maybe<Scalars['Int']>;
//   totalShops?: Maybe<Scalars['Int']>;
//   newCustomers?: Maybe<Scalars['Int']>;
//   totalYearSaleByMonth?: Maybe<Array<Maybe<TotalYearSaleByMonth>>>;
// };

// export declare type TotalYearSaleByMonth = {
//   total?: Maybe<Scalars['Float']>;
//   month?: Maybe<Scalars['String']>;
// };

// export declare type ApproveShopInput = {
//   id: Scalars['ID'];
//   admin_commission_rate: Scalars['Float'];
// };

// export declare type ApproveWithdrawInput = {
//   id: Scalars['ID'];
//   status: WithdrawStatus;
// };

// export declare type PaymentInfo = {
//   account?: Maybe<Scalars['String']>;
//   name?: Maybe<Scalars['String']>;
//   email?: Maybe<Scalars['String']>;
//   bank?: Maybe<Scalars['String']>;
// };

// export declare type PaymentInfoInput = {
//   account?: Maybe<Scalars['String']>;
//   name?: Maybe<Scalars['String']>;
//   email?: Maybe<Scalars['String']>;
//   bank?: Maybe<Scalars['String']>;
// };

// export declare type Balance = {
//   id?: Maybe<Scalars['ID']>;
//   admin_commission_rate?: Maybe<Scalars['Float']>;
//   shop?: Maybe<Shop>;
//   total_earnings?: Maybe<Scalars['Float']>;
//   withdrawn_amount?: Maybe<Scalars['Float']>;
//   current_balance?: Maybe<Scalars['Float']>;
//   payment_info?: Maybe<PaymentInfo>;
// };

// export declare type BalanceInput = {
//   id?: Maybe<Scalars['ID']>;
//   payment_info?: Maybe<PaymentInfoInput>;
// };

// export declare type Location = {
//   lat?: Maybe<Scalars['Float']>;
//   lng?: Maybe<Scalars['Float']>;
//   city?: Maybe<Scalars['String']>;
//   state?: Maybe<Scalars['String']>;
//   country?: Maybe<Scalars['String']>;
//   zip?: Maybe<Scalars['String']>;
//   formattedAddress?: Maybe<Scalars['String']>;
// };

// export declare type ContactDetails = {
//   __typename?: 'ContactDetails';
//   socials?: Maybe<Array<Maybe<ShopSocials>>>;
//   contact?: Maybe<Scalars['String']>;
//   location?: Maybe<Location>;
//   website?: Maybe<Scalars['String']>;
// };
