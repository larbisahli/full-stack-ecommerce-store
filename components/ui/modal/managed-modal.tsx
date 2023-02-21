import Modal from '@components/ui/modal/modal';
import {
  BAN_CUSTOMER,
  DELETE_ATTRIBUTE,
  DELETE_PRODUCT,
  DELETE_SLIDER,
  DELETE_STAFF
} from '@ts-types/constants';
import dynamic from 'next/dynamic';

import { useModalAction, useModalState } from './modal.context';

const BanCustomerView = dynamic(
  () => import('@components/staff/staff-ban-view')
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

const SliderDeleteView = dynamic(
  () => import('@components/hero-carousel/slider-delete-view')
);

const ManagedModal = () => {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  console.log('view', { isOpen, view });

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === DELETE_PRODUCT && <ProductDeleteView />}
      {view === DELETE_ATTRIBUTE && <AttributeDeleteView />}
      {view === BAN_CUSTOMER && <BanCustomerView />}
      {view === DELETE_STAFF && <StaffDeleteView />}
      {view === DELETE_SLIDER && <SliderDeleteView />}
    </Modal>
  );
};

export default ManagedModal;
