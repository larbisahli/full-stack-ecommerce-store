import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useTime } from '@hooks/useTime';
import { useState } from 'react';

const StaffBanView = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { revalidate } = useTime();
  const { id, meta } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    if (meta === 'ban') {
      // Block staff
      fetch('/api/admin/staff/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          active: false
        })
      })
        .then(() => {
          setLoading(false);
          revalidate();
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setLoading(false);
        });
    } else {
      // Unblock staff
      fetch('/api/admin/staff/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          active: true
        })
      })
        .then(() => {
          setLoading(false);
          revalidate();
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setLoading(false);
        });
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
      deleteBtnLoading={loading}
    />
  );
};

export default StaffBanView;
