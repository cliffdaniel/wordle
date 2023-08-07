import React from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { useLetters } from '../../../../hooks/useLetters';

const Keyboard: React.FC = () => {
  const { theme } = useTheme();
  const { addLetter } = useLetters();

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Delete']
  ];

  const onKeyPress = (key: string) => {
    addLetter(key);
  };

  const backgroundKey = theme === 'light' ? 'bg-key-light' : 'bg-key-dark';
  const colorKey = theme === 'light' ? 'text-key-light' : 'text-key-dark';

  return (
    <div className={`flex flex-col gap-2 ${theme === 'light' ? 'bg-keyboard-light' : 'bg-keyboard-dark'} py-[30px] px-[20px] rounded-lg`}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`flex gap-2 ${rowIndex === 0 ? 'ml-[40px]' : (rowIndex === 1 ? 'ml-[60px]' : '')}`}>
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={`h-[51px] ${key === 'Enter' || key === 'Delete' ? 'w-[71px]' : 'w-[44px]'} text-center rounded ${backgroundKey} ${colorKey}`}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
