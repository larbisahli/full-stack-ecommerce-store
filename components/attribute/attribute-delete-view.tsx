import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { ATTRIBUTES, DELETE_ATTRIBUTE } from '@graphql/attribute';
import { useErrorLogger } from '@hooks/useErrorLogger';

const AttributeDeleteView = () => {
  // const [deleteAttributeValue, { loading, error }] = useMutation(
  //   DELETE_ATTRIBUTE,
  //   {
  //     refetchQueries: [
  //       ATTRIBUTES,
  //       'Attributes' // Query name
  //     ]
  //   }
  // );

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  // useErrorLogger(error);

  async function handleDelete() {
    // deleteAttributeValue({ variables: { id } });
    closeModal();
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={true}
    />
  );
};

export default AttributeDeleteView;
