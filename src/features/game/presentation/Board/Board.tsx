import React from 'react';
import { BoardProps } from '../interfaces/BoardProps';
import BoardRow from './BoardRow';

const Board: React.FC = () => {
  return (
    <div>
      {[0, 1, 2, 3, 4].map(index => (
        <BoardRow
          key={index}
          row={index}
        />
      ))}
    </div>
  );
};

export default Board;
