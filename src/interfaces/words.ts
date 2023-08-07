export interface WordsState {
  words: { [word: string]: 'complete' | 'incomplete' };
  taken: boolean;
  current: string;
  gameOver: boolean;
}