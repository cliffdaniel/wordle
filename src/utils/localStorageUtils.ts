const initializeLocalStorageValues = () => {
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

export default initializeLocalStorageValues;