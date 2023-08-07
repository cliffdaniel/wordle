import { Game } from '../../domain/models/Game';

export interface BoardProps {
  game?: Game;
  onLetterClick: (letter: string, index: number) => void;
  onGameEnd: (victory: boolean, selectedWord: string) => void;
}