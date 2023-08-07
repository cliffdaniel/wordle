import React, { createContext, useContext, useState } from 'react';

interface ModalDetailsContextType {
  showDetailsModal: boolean;
  setShowDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  instructionsShown: boolean;
  setInstructionsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDetailsContext = createContext<ModalDetailsContextType | undefined>(undefined);

export const useModalDetails = () => {
  const context = useContext(ModalDetailsContext);
  if (!context) {
    throw new Error('useModalDetails must be used within a ModalDetailsProvider');
  }
  return context;
};

export const ModalDetailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [instructionsShown, setInstructionsShown] = useState(false);

  return (
    <ModalDetailsContext.Provider value={{ showDetailsModal, setShowDetailsModal, instructionsShown, setInstructionsShown }}>
      {children}
    </ModalDetailsContext.Provider>
  );
};
