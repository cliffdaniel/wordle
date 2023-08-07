import React from 'react';
import { useModalStatistics } from '../../hooks/useModalStatistics';
import GameResult from '../game/presentation/Result/GameResult';
import Modal from '../../components/Modal';

const Statistics: React.FC = () => {
  const { showStatisticsModal, setShowStatisticsModal } = useModalStatistics();

  const handleCloseModal = () => {
    setShowStatisticsModal(false);
  };

  return (
    <div>
      {showStatisticsModal && (
        <Modal isOpen={showStatisticsModal}>
          <GameResult onClose={handleCloseModal}/>
        </Modal>
      )}
    </div>
  );
};

export default Statistics;
