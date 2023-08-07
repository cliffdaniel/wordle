import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeWord, setGameOver, takeWord, addWord, currentWord } from '../redux/wordsSlice';
import { setIntervalId, clearIntervalId } from '../redux/intervalSlice';
import { useModalStatistics } from '../hooks/useModalStatistics';
import getRandomFiveLetterWord from '../utils/getRandomFiveLetterWord';
import removeAccents from '../utils/stringUtils';
import initializeLocalStorageValues from '../utils/localStorageUtils';
import { GAME_INTERVAL } from '../constants/constants';
import { WordsState, IntervalState } from '../interfaces'
import { LettersContext, LettersContextType } from '../hooks/useLetters';

export const LettersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { setShowStatisticsModal } = useModalStatistics();
  const intervalId = useSelector((state: { interval: IntervalState }) => state.interval.intervalId);

  const { initialLettersState, initialColRef, initialRowRef } = initializeLocalStorageValues();
  const [letters, setLetters] = useState<{ letter: string; status: string; }[][]>(initialLettersState);

  const colRef = useRef(initialColRef);
  const rowRef = useRef(initialRowRef);

  const wordTaken = useSelector((state: { words: WordsState }) => state.words.taken);
  const existingWords = useSelector((state: { words: WordsState }) => state.words.words);
  const currentWordSelected = useSelector((state: { words: WordsState }) => state.words.current);
  const currentWordSelectedUpper = removeAccents(currentWordSelected.toUpperCase());
  const gameOver = useSelector((state: { words: WordsState }) => state.words.gameOver);

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
    if (!gameOver && !wordTaken) {
      let randomWord = await getRandomFiveLetterWord();

      while (existingWords[randomWord]) {
        randomWord = await getRandomFiveLetterWord();
      }

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

  const contextValue: LettersContextType = {
    letters,
    addLetter: addLetterHandler,
    setInitializeGame: initializeGame
  }

  return (
    <LettersContext.Provider value={contextValue}>
      {children}
    </LettersContext.Provider>
  );
};
