import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useTime } from '@hooks/useTime';
import { notify } from '@lib/index';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const StaffDeleteView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { revalidate } = useTime();
  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    fetch('/api/admin/staff/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(() => {
        notify(`${t('common:successfully-deleted')}`, 'success');
        setLoading(false);
        revalidate();
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
    closeModal();
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default StaffDeleteView;
