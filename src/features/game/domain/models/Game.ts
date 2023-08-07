export interface Game {
  rows: BoardRow[];
}

export interface BoardRow {
  letters: string[];
  statuses: CellStatus[];
}

export type CellStatus = 'correct' | 'incorrect' | 'partial' | 'empty';