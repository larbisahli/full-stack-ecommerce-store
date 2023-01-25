import ConfirmationCard from '@components/common/confirmation-card';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { DELETE_HERO_SLIDE, HERO_CAROUSEL_LIST } from '@graphql/hero-carousel';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { useState } from 'react';

const SliderDeleteView = () => {
  const [error, setError] = useState(null);
  // const [deleteSlide, { loading }] = useMutation(DELETE_HERO_SLIDE, {
  //   refetchQueries: [
  //     HERO_CAROUSEL_LIST,
  //     'HeroCarouselList' // Query name
  //   ]
  // });

  const { id } = useModalState();
  const { closeModal } = useModalAction();

  useErrorLogger(error);

  async function handleDelete() {
    // deleteSlide({ variables: { id } }).catch((err) => {
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

export default SliderDeleteView;
