import { createContext, useContext } from 'react';

interface ModalStatisticsContextType {
  showStatisticsModal: boolean;
  setShowStatisticsModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ModalStatisticsContext = createContext<ModalStatisticsContextType | undefined>(undefined);

export const useModalStatistics = () => {
  const context = useContext(ModalStatisticsContext);
  if (!context) {
    throw new Error('useModalStatistics must be used within a ModalStatisticsProvider');
  }
  return context;
};

export type { ModalStatisticsContextType };
