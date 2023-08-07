import React, { useState } from 'react';
import { ModalDetailsContext, ModalDetailsContextType } from '../hooks/useModalDetails';

export const ModalDetailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [instructionsShown, setInstructionsShown] = useState(false);

  const contextValue: ModalDetailsContextType = {
    showDetailsModal,
    setShowDetailsModal,
    instructionsShown,
    setInstructionsShown,
  };

  return (
    <ModalDetailsContext.Provider value={contextValue}>
      {children}
    </ModalDetailsContext.Provider>
  );
};
