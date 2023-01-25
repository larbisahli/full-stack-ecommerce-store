import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_TAG, TAGS } from '@graphql/tag';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useState } from 'react';

const TagDeleteView = () => {
  const [error, setError] = useState(null);
  // const [deleteAttributeValue, { loading }] = useMutation(DELETE_TAG, {
  //   refetchQueries: [
  //     TAGS,
  //     'TagsForAdmin' // Query name
  //   ]
  // });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  function handleDelete() {
    // deleteAttributeValue({ variables: { id } }).catch((err) => {
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

export default TagDeleteView;
