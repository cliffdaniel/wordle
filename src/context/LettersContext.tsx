import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeWord, setGameOver, takeWord, addWord, currentWord } from '../redux/wordsSlice';
import { setIntervalId, clearIntervalId } from '../redux/intervalSlice';
import { useModalStatistics } from './ModalStatisticsContext';
import getRandomFiveLetterWord from '../hooks/useRandomFiveLetterWord';
import { GAME_INTERVAL } from '../constants/constants';

interface LettersContextType {
  letters: { letter: string; status: string; }[][];
  addLetter: (letter: string) => void;
  setInitializeGame: () => void;
}

const LettersContext = createContext<LettersContextType | undefined>(undefined);

export const useLetters = () => {
  const context = useContext(LettersContext);
  if (!context) {
    throw new Error('useLetters must be used within a LettersProvider');
  }
  return context;
};

function removeAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([aeio])\1+/g, '$1');
}

function initializeLocalStorageValues() {
  const storedColRef = localStorage.getItem('colRef');
  const storedRowRef = localStorage.getItem('rowRef');
  const storedLetters = localStorage.getItem('lettersState');
  const initialLetters = Array.from({ length: 5 }, () => Array(5).fill(''));
  const initialLettersState = storedLetters ? JSON.parse(storedLetters) : initialLetters;
  const initialColRef = storedColRef ? parseInt(storedColRef) : 0;
  const initialRowRef = storedRowRef ? parseInt(storedRowRef) : 0;

  return {
    initialLettersState,
    initialColRef,
    initialRowRef,
  };
}

export const LettersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { setShowStatisticsModal } = useModalStatistics();
  const intervalId = useSelector((state: any) => state.interval?.intervalId);

  const { initialLettersState, initialColRef, initialRowRef } = initializeLocalStorageValues();
  const [letters, setLetters] = useState<{ letter: string; status: string; }[][]>(initialLettersState);

  const colRef = useRef(initialColRef);
  const rowRef = useRef(initialRowRef);

  const currentWordSelected = useSelector((state: any) => state.words.current);
  const currentWordSelectedUpper = removeAccents(currentWordSelected.toUpperCase());
  const gameOver = useSelector((state: any) => state.words.gameOver);

  const addLetterHandler = (letter: string) => {
    if (gameOver) {
      return;
    }

    if (rowRef.current < 5 && colRef.current < 5 && (letter !== 'Enter' && letter !== 'Delete')) {
      const newLetters = [...letters];
      newLetters[rowRef.current][colRef.current] = { letter, status: '' };
      setLetters(newLetters);

      colRef.current++;
    }

    if (colRef.current >= 5 && letter === 'Enter') {
      updateCellStatus();
      rowRef.current++;
      if (rowRef.current != 5) {
        colRef.current = 0
      }

      localStorage.setItem('lettersState', JSON.stringify(letters));
      localStorage.setItem('colRef', colRef.current.toString());
      localStorage.setItem('rowRef', rowRef.current.toString());
    }

    if (letter === 'Delete') {
      colRef.current--;

      if (colRef.current < 0) {
        return;
      }

      const newLetters = [...letters];
      newLetters[rowRef.current][colRef.current] = { letter: '', status: '' };
      setLetters(newLetters);
    }

    if (colRef.current >= 5 && rowRef.current >= 5 && letter === 'Enter') {
      dispatch(setGameOver(true));
      setShowStatisticsModal(true);
      dispatch(takeWord(false));
    }
  };

  const updateCellStatus = () => {
    const newLetters = [...letters];
    for (let col = 0; col < 5; col++) {
      const letter = letters[rowRef.current][col].letter;

      if (letter === currentWordSelectedUpper[col]) {
        newLetters[rowRef.current][col].status = 'success';
      } else if (currentWordSelectedUpper.includes(letter)) {
        newLetters[rowRef.current][col].status = 'warning';
      } else {
        newLetters[rowRef.current][col].status = 'not-found';
      }
    }

    if (newLetters[rowRef.current].every((cell, col) => cell.letter === currentWordSelectedUpper[col])) {
      dispatch(completeWord(currentWordSelected));
      dispatch(setGameOver(true));
      setShowStatisticsModal(true);
      dispatch(takeWord(false));
    }

    setLetters(newLetters);
  };

  const setInitialLetters = () => {
    const { initialLettersState } = initializeLocalStorageValues();
    colRef.current = 0
    rowRef.current = 0
    setLetters(initialLettersState)
  }

  const initializeGame = async () => {
    if (!gameOver) {
      const randomWord = await getRandomFiveLetterWord();
      dispatch(addWord(randomWord));
      dispatch(currentWord(randomWord));
      dispatch(takeWord(true));
      dispatch(setIntervalId(true));

      localStorage.removeItem('lettersState');
      localStorage.removeItem('colRef');
      localStorage.removeItem('rowRef');

      setShowStatisticsModal(false);
      setInitialLetters();
    }
  };

  useEffect(() => {
    if (gameOver && !intervalId) {
      const newIntervalId = setInterval(() => {
        dispatch(takeWord(false));
        dispatch(setGameOver(false));
        initializeGame();
      }, GAME_INTERVAL);

      dispatch(setIntervalId(newIntervalId));
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        dispatch(clearIntervalId());
      }
    };
  }, [dispatch, intervalId, gameOver]);

  useEffect(() => {
    initializeGame();
  }, [gameOver]);

  return (
    <LettersContext.Provider value={{ letters, addLetter: addLetterHandler, setInitializeGame: initializeGame }}>
      {children}
    </LettersContext.Provider>
  );
};
