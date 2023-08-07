import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWord, currentWord, takeWord } from '../redux/wordsSlice';
import useRandomFiveLetterWord from '../hooks/useRandomFiveLetterWord';

const useGameInitialization = () => {
  const dispatch = useDispatch();
  const randomWord = useRandomFiveLetterWord();

  useEffect(() => {
    if (!randomWord) {
      return;
    }

    dispatch(addWord(randomWord));
    dispatch(currentWord(randomWord));
    dispatch(takeWord(true));
  }, [dispatch, randomWord]);
};

export default useGameInitialization;
