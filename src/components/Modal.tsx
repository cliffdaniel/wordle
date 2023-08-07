import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface ModalProps {
  isOpen?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const backgroundColor = theme === 'light' ? 'bg-[#F3F3F3]' : 'bg-[#262B3C]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-70"></div>
      <div className={`relative ${backgroundColor} rounded-lg p-4 z-10 flex flex-col justify-between items-center`}>
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
