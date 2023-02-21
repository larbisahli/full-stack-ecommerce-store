import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useTime } from '@hooks/useTime';
import { NoteNotify, notify } from '@lib/notify';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const SliderDeleteView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const { id } = useModalState();
  const { closeModal } = useModalAction();
  const [loading, setLoading] = useState(false);
  const { revalidate } = useTime();

  useErrorLogger(error);

  async function handleDelete() {
    setLoading(true);
    fetch('/api/admin/banner/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.banner?.id) {
          notify(t('common:successfully-deleted'), 'success');
          NoteNotify('Your changes will be live in 10 minutes.');
          revalidate();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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

export default SliderDeleteView;
