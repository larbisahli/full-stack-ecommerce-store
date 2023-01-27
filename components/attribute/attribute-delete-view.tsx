import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { useTime } from '@hooks/useTime';
import { notify } from '@lib/notify';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const AttributeDeleteView = () => {
  const { t } = useTranslation();

  const { id } = useModalState();
  const { closeModal } = useModalAction();
  const [loading, setLoading] = useState(false);

  const { revalidate } = useTime();

  async function handleDelete() {
    setLoading(true);
    fetch('/api/admin/attribute/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.attribute?.id) {
          notify(t('common:successfully-deleted'), 'success');
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

export default AttributeDeleteView;
