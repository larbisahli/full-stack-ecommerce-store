import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { COUPONS, DELETE_COUPON } from '@graphql/coupons';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useState } from 'react';

const CouponDeleteView = () => {
  const [error, setError] = useState(null);
  // const [deleteCoupon, { loading }] = useMutation(DELETE_COUPON, {
  //   refetchQueries: [
  //     COUPONS,
  //     'CouponsForAdmin' // Query name
  //   ]
  // });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    // deleteCoupon({ variables: { id } }).catch((err) => {
    //   setError(err);
    // });
    closeModal();
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      // deleteBtnLoading={loading}
    />
  );
};

export default CouponDeleteView;
