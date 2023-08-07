import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGameOver, takeWord } from '../../../../redux/wordsSlice';
import { useTheme } from '../../../../context/ThemeContext';
import { useLetters } from '../../../../context/LettersContext';
import Countdown from 'react-countdown';
import {
  STATISTICS_TITLE,
  TOTAL_PLAYS_TEXT,
  TOTAL_VICTORIES_TEXT,
  NEXT_WORD_TITLE,
  ACCEPT_BUTTON_TEXT,
  WORD_WAS_MESSAGE
} from '../../../../constants/titles';
import { GAME_INTERVAL } from '../../../../constants/constants';

interface GameResultProps {
  onClose: () => void;
}

const calculateTimeRemaining = (intervalStart: number): number => {
  const currentTime = Date.now();
  const elapsedMilliseconds = currentTime - intervalStart;
  const remainingMilliseconds = GAME_INTERVAL - elapsedMilliseconds;
  return Math.ceil(remainingMilliseconds / 1000);
};

const GameResult: React.FC<GameResultProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const { setInitializeGame } = useLetters();
  const textColor = theme === 'light' ? 'text-black' : 'text-white';

  const dispatch = useDispatch();
  const intervalStartFromLocalStorage = localStorage.getItem('intervalStart');
  const intervalStart = intervalStartFromLocalStorage ? JSON.parse(intervalStartFromLocalStorage) : Date.now();

  const words = useSelector((state: any) => state.words.words);
  const currentWord = useSelector((state: any) => state.words.current);
  const countGames = Object.entries(words).length
  const countCompletedWords = Object.values(words).filter(status => status === 'complete').length;
  const currentWordStatus = words[currentWord] || 'incomplete';

  const gameOver = useSelector((state: any) => state.words.gameOver);
  const remainingTimeInSeconds = calculateTimeRemaining(intervalStart);

  useEffect(() => {
    if (!gameOver) {
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - intervalStart;
        const timeLeft = GAME_INTERVAL - elapsedTime;

        if (timeLeft <= 0) {
          dispatch(setGameOver(false));
          dispatch(takeWord(false));
          clearInterval(intervalId);
          setInitializeGame();
        } else {
          const newIntervalStart = currentTime - (GAME_INTERVAL - timeLeft);
          localStorage.setItem('intervalStart', JSON.stringify(newIntervalStart));
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [dispatch, gameOver, intervalStart]);

  return (
    <div className={`w-[546px] text-center py-[50px] px-[70px] ${textColor}`}>
      <h1 className='mb-[30px] text-3xl font-bold'>{STATISTICS_TITLE}</h1>

      <div className='flex justify-between mb-[55px]'>
        <div className='flex flex-col'>
          <p className='text-[35px] mb-[10px] font-bold'>{countGames}</p>
          <p className='text-[21px]'>{TOTAL_PLAYS_TEXT}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-[35px] mb-[10px] font-bold'>{countCompletedWords}</p>
          <p className='text-[21px]'>{TOTAL_VICTORIES_TEXT}</p>
        </div>
      </div>

      {gameOver && (
        <>
          {currentWordStatus === 'incomplete' && <h2 className='mb-4 text-2xl'>{WORD_WAS_MESSAGE} <span className='font-bold'>{currentWord}</span></h2>}
        </>
      )}

      <h2 className='mb-4 text-2xl'>{NEXT_WORD_TITLE}</h2>
      <div className='mb-[30px] text-2xl font-bold'>
        <Countdown date={Date.now() + remainingTimeInSeconds * 1000} />
      </div>

      <button className='w-[256px] h-[44px] text-white text-center text-2xl font-bold rounded-md bg-[#6AAA64]' onClick={onClose}>
        {ACCEPT_BUTTON_TEXT}
      </button>
    </div>
  );
};

export default GameResult;
