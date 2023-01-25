import Modal from '@components/ui/modal/modal';
import {
  BAN_CUSTOMER,
  DELETE_ATTRIBUTE,
  DELETE_COUPON,
  DELETE_ORDER_STATUS,
  DELETE_PRODUCT,
  DELETE_SHIPPING,
  DELETE_SLIDER,
  DELETE_STAFF,
  DELETE_SUPPLIER,
  DELETE_TAG
} from '@ts-types/constants';
import dynamic from 'next/dynamic';

import { useModalAction, useModalState } from './modal.context';

const TagDeleteView = dynamic(() => import('@components/tag/tag-delete-view'));

const BanCustomerView = dynamic(
  () => import('@components/staff/staff-ban-view')
);

const CouponDeleteView = dynamic(
  () => import('@components/coupon/coupon-delete-view')
);

const ProductDeleteView = dynamic(
  () => import('@components/product/product-delete-view')
);

const AttributeDeleteView = dynamic(
  () => import('@components/attribute/attribute-delete-view')
);

const StaffDeleteView = dynamic(
  () => import('@components/staff/staff-delete-view')
);

const SupplierDeleteView = dynamic(
  () => import('@components/suppliers/supplier-delete-view')
);

const SliderDeleteView = dynamic(
  () => import('@components/hero-carousel/slider-delete-view')
);

// const ExportImportView = dynamic(
//   () => import('@components/product/import-export-modal')
// );

// const AttributeExportImport = dynamic(
//   () => import('@components/attribute/attribute-import-export')
// );

const ManagedModal = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  console.log('view', { isOpen, view });

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === DELETE_PRODUCT && <ProductDeleteView />}
      {view === DELETE_ATTRIBUTE && <AttributeDeleteView />}
      {view === DELETE_COUPON && <CouponDeleteView />}
      {view === DELETE_SHIPPING && <ShippingDeleteView />}
      {view === DELETE_TAG && <TagDeleteView />}
      {view === BAN_CUSTOMER && <BanCustomerView />}
      {view === DELETE_ORDER_STATUS && <OrderStatusDeleteView />}
      {view === DELETE_STAFF && <StaffDeleteView />}
      {view === DELETE_SUPPLIER && <SupplierDeleteView />}
      {view === DELETE_SLIDER && <SliderDeleteView />}
    </Modal>
  );
};

export default ManagedModal;
