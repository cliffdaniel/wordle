import React, { createContext, useContext, useState } from 'react';

interface ModalStatisticsContextType {
  showStatisticsModal: boolean;
  setShowStatisticsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalStatisticsContext = createContext<ModalStatisticsContextType | undefined>(undefined);

export const useModalStatistics = () => {
  const context = useContext(ModalStatisticsContext);
  if (!context) {
    throw new Error('useModalStatistics must be used within a ModalStatisticsProvider');
  }
  return context;
};

export const ModalStatisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);

  return (
    <ModalStatisticsContext.Provider value={{ showStatisticsModal, setShowStatisticsModal }}>
      {children}
    </ModalStatisticsContext.Provider>
  );
};
