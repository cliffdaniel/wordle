const getRandomFiveLetterWord = async () => {
  const response = await fetch('/words.txt');
  const text = await response.text();
  const words = text.split('\n');
  const fiveLetterWords = words.filter(word => word.length === 5);
  const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
  return fiveLetterWords[randomIndex];
};

export default getRandomFiveLetterWord;
