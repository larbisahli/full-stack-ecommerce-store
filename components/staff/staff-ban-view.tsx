import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { BAN_STAFF, STAFFS } from '@graphql/staff';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useState } from 'react';

const StaffBanView = () => {
  const [error, setError] = useState(null);
  // const [BanStaff, { loading }] = useMutation(BAN_STAFF, {
  //   refetchQueries: [
  //     STAFFS,
  //     'Staffs' // Query name
  //   ]
  // });

  const { id, meta } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    if (meta === 'ban') {
      // Block staff
      // BanStaff({
      //   variables: {
      //     id,
      //     active: false
      //   }
      // }).catch((err) => {
      //   setError(err);
      // });
    } else {
      // Unblock staff
      // BanStaff({
      //   variables: {
      //     id,
      //     active: true
      //   }
      // }).catch((err) => {
      //   setError(err);
      // });
    }
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={meta === 'ban' ? 'Block' : 'Unblock'}
      title={meta === 'ban' ? 'Block Staff' : 'Unblock Staff'}
      description={
        meta === 'ban'
          ? 'Are you sure you want to block this Staff?'
          : 'Are you sure you want to unblock this Staff?'
      }
      // deleteBtnLoading={loading}
    />
  );
};

export default StaffBanView;
