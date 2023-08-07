import { createContext, useContext } from 'react';

interface ModalDetailsContextType {
  showDetailsModal: boolean;
  setShowDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  instructionsShown: boolean;
  setInstructionsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalDetailsContext = createContext<ModalDetailsContextType | undefined>(undefined);

export const useModalDetails = () => {
  const context = useContext(ModalDetailsContext);
  if (!context) {
    throw new Error('useModalDetails must be used within a ModalDetailsProvider');
  }
  return context;
};

export type { ModalDetailsContextType };
