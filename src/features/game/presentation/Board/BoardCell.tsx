import React from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { useSelector } from 'react-redux';

interface BoardCellProps {
  row: number;
  col: number;
  letter: { letter: string; status: string; };
}

type CellStatus = 'success' | 'warning' | 'not-found' | '';

const BoardCell: React.FC<BoardCellProps> = ({ row, col, letter }) => {
  const { theme } = useTheme();
  const words = useSelector((state: any) => state.words.words);

  let backgroundColor;
  if (letter.status === 'success') {
    backgroundColor = 'bg-[#6AAA64]';
  } else if (letter.status === 'warning') {
    backgroundColor = 'bg-[#CEB02C]';
  } else if (letter.status === 'not-found') {
    backgroundColor = 'bg-[#939B9F]';
  } else {
    backgroundColor = theme === 'light' ? 'bg-cell-light' : 'bg-cell-dark';
  }

  const textColor = theme === 'light' ? 'text-black' : 'text-white';

  return (
    <div key={row + col} className={`p-2 text-center ${backgroundColor} cursor-pointer w-[76px] h-[75px] flex-shrink-0 rounded-lg`}>
      <span className={`font-bold ${textColor} text-[35px] leading-[60px]`}>{letter.letter}</span>
    </div>
  );
};

export default BoardCell;
