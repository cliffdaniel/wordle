import React, { useState } from 'react';
import { ModalStatisticsContext, ModalStatisticsContextType } from '../hooks/useModalStatistics';

export const ModalStatisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);

  const contextValue: ModalStatisticsContextType = {
    showStatisticsModal,
    setShowStatisticsModal,
  }

  return (
    <ModalStatisticsContext.Provider value={contextValue}>
      {children}
    </ModalStatisticsContext.Provider>
  );
};
