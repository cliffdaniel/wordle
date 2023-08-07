import React from 'react';
import { useTheme } from '../../../../hooks/useTheme';
import {
  HOW_TO_PLAY,
  INSTRUCTION_PARAGRAPH_1,
  INSTRUCTION_PARAGRAPH_2,
  INSTRUCTION_PARAGRAPH_3,
  EXAMPLES,
  GUESS_CORRECTLY_TEXT,
  GUESS_INCORRECTLY_TEXT,
  LETTER_NOT_IN_WORD,
  REPEATED_LETTERS_TEXT,
  NEW_WORD_EVERY_5_MINUTES_TEXT,
  LETS_PLAY
} from '../../../../constants/titles'

interface GameDetailsProps {
  onClose: () => void;
}

const GameDetails: React.FC<GameDetailsProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const backgroundColor = theme === 'light' ? 'bg-[#FFFFFF]' : 'bg-[#262B3C]';
  const textColor = theme === 'light' ? 'text-black' : 'text-white';

  const renderLetter = (letters: string[], boldLetter: string, background: string) => (
    <div className='flex gap-[11px] ml-[10px]'>
      {letters.map(letter => (
        <div
          key={letter}
          className={`p-2 text-center ${letter === boldLetter ? background : `${backgroundColor} border border-black`} cursor-not-allowed w-[76px] h-[75px] flex-shrink-0 rounded-lg`}
        >
          <span className={`font-bold ${textColor} text-[35px] leading-[60px]`}>
            {letter}
          </span>
        </div>
      ))}
    </div>
  );

  const generateBoldText = (text: string, boldLetter: string) => {
    const splitText = text.split(boldLetter);
    return (
      <p className={`text-[19px] ${textColor}`}>
        {splitText[0]}
        <span className='font-bold'>{boldLetter}</span>
        {splitText[1]}
      </p>
    );
  };

  return (
    <div className='w-[546px] pl-[26px] py-[24px]'>
      <h1 className={`mb-[32px] text-3xl font-bold text-center ${textColor}`}>
        {HOW_TO_PLAY}
      </h1>
      <div className={`${textColor}`}>
        <p className='text-[19px] mb-[13px]'>{INSTRUCTION_PARAGRAPH_1}</p>
        <p className='text-[19px] mb-[13px]'>{INSTRUCTION_PARAGRAPH_2}</p>
        <p className='text-[19px] mb-[13px] leading-[22px]'>{INSTRUCTION_PARAGRAPH_3}</p>
        <p className='text-[19px] mb-[13px] font-bold'>{EXAMPLES}</p>
      </div>
      <div className='flex gap-[11px] mb-[13px] ml-[10px]'>
        {renderLetter(['G', 'A', 'T', 'O', 'S'], 'G', 'bg-[#6AAA64]')}
      </div>
      <div className='mb-[13px]'>{generateBoldText(GUESS_CORRECTLY_TEXT, 'G')}</div>
      <div className='flex gap-[11px] mb-[13px] ml-[10px]'>
        {renderLetter(['V', 'O', 'C', 'A', 'L'], 'C', 'bg-[#CEB02C]')}
      </div>
      <div className='mb-[13px]'>{generateBoldText(GUESS_INCORRECTLY_TEXT, 'C')}</div>

      <div className='flex gap-[11px] mb-[13px] ml-[10px]'>
        {renderLetter(['C', 'A', 'N', 'T', 'O'], 'O', 'bg-[#939B9F]')}
      </div>
      <div className='mb-[13px]'>{generateBoldText(LETTER_NOT_IN_WORD, 'O')}</div>
      <div className={`${textColor}`}>
        <p className='text-[19px] mb-[13px] leading-[22px]'>{REPEATED_LETTERS_TEXT}</p>
      </div>
      <div className={`${textColor}`}>
        <p className='text-[19px] mb-[25px] text-center'>{NEW_WORD_EVERY_5_MINUTES_TEXT}</p>
      </div>
      <div className='flex justify-center'>
        <button className="w-[256px] h-[48px] text-white text-center text-[28px] font-bold rounded-md bg-[#6AAA64]" onClick={onClose}>
          {LETS_PLAY}
        </button>
      </div>
    </div>
  );
};

export default GameDetails;
