import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { notify } from '@lib/index';
import { StaffType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const StaffDeleteView = () => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  // const [deleteAttributeValue, { loading }] = useMutation(DELETE_STAFF, {
  //   refetchQueries: [
  //     STAFFS,
  //     'Staffs' // Query name
  //   ]
  // });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    // deleteAttributeValue({
    //   variables: { id },
    //   onCompleted: ({ deleteStaff }: { deleteStaff: StaffType }) => {
    //     const { firstName, lastName } = deleteStaff;
    //     notify(
    //       `${t('common:sidebar-nav-item-staff')} '${firstName} ${lastName}' ${t(
    //         'common:successfully-deleted'
    //       )}`,
    //       'success'
    //     );
    //   }
    // }).catch((err) => {
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

export default StaffDeleteView;
