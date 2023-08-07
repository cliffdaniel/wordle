import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModalDetails } from '../../context/ModalDetailsContext';
import { setInstructionsShown } from '../../redux/instructionsSlice';
import GameDetails from '../game/presentation/Detail/GameDetails';
import Modal from '../../components/Modal';

const Instructions: React.FC = () => {
  const { showDetailsModal, setShowDetailsModal } = useModalDetails();
  const dispatch = useDispatch();
  const instructionsShown = useSelector((state: any) => state.instructions);

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    if (!instructionsShown.shown) {
      dispatch(setInstructionsShown());
    }
  };

  if (!instructionsShown.shown || showDetailsModal) {
    return (
      <Modal isOpen={true}>
        <GameDetails onClose={handleCloseModal} />
      </Modal>
    );
  }

  return null;
};

export default Instructions;
