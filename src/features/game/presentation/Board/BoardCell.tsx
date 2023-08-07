import React from 'react';
import { useTheme } from '../../../../hooks/useTheme';

interface BoardCellProps {
  row: number;
  col: number;
  letter: { letter: string; status: string; };
}

const BoardCell: React.FC<BoardCellProps> = ({ row, col, letter }) => {
  const { theme } = useTheme();

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
