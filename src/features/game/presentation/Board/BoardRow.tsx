import React from 'react';
import BoardCell from './BoardCell';
import { useLetters } from '../../../../context/LettersContext';

interface BoardRowProps {
  row: number;
}

const BoardRow: React.FC<BoardRowProps> = ({ row }) => {
  const { letters } = useLetters();

  return (
    <div className="flex gap-[11px] mb-[11px]">
      {[0, 1, 2, 3, 4].map(col => (
        <BoardCell
          key={col}
          row={row}
          col={col}
          letter={letters[row][col]}
        />
      ))}
    </div>
  );
};

export default BoardRow;
