import { createContext, useContext } from 'react';

interface LettersContextType {
  letters: { letter: string; status: string; }[][];
  addLetter: (letter: string) => void;
  setInitializeGame: () => void;
}
export const LettersContext = createContext<LettersContextType | undefined>(undefined);

export const useLetters = () => {
  const context = useContext(LettersContext);
  if (!context) {
    throw new Error('useLetters must be used within a LettersProvider');
  }
  return context;
};

export type { LettersContextType };
