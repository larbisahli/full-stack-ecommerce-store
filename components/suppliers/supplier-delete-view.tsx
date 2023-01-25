import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useState } from 'react';

const SupplierDeleteView = () => {
  const [error, setError] = useState(null);
  // const [deleteSupplierValue, { loading }] = useMutation(DELETE_SUPPLIER, {
  //   refetchQueries: [
  //     SUPPLIERS,
  //     'Suppliers' // Query name
  //   ]
  // });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    // deleteSupplierValue({ variables: { id } }).catch((err) => {
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

export default SupplierDeleteView;
