import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useModalDetails } from '../hooks/useModalDetails';
import { useModalStatistics } from '../hooks/useModalStatistics';

import { APP_TITLE } from '../constants/titles';
import ThemeSwitch from './ThemeSwitch';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const { setShowDetailsModal } = useModalDetails();
  const { setShowStatisticsModal } = useModalStatistics();

  const handleQuestionIconClick = () => {
    setShowDetailsModal(true);
  };

  const handleStatisticsIconClick = () => {
    setShowStatisticsModal(true);
  };

  return (
    <header className={`flex items-center p-4 w-[638px] rounded-lg ${theme === 'light' ? 'bg-header-light' : 'bg-header-dark'}`}>
      <div className="flex items-center flex-1">
        <button onClick={handleQuestionIconClick}>
          <img
            src={`/icon-question-${theme === 'light' ? 'dark' : 'light'}.png`}
            alt="Question Icon"
            className="w-6 h-6 mr-2"
          />
        </button>
      </div>
      <div className="flex items-center justify-center flex-1">
        <h1 className={`text-4xl tracking-wider ${theme === 'light' ? 'text-header-light' : 'text-header-dark'}`}>{APP_TITLE}</h1>
      </div>
      <div className="flex items-center justify-end flex-1">
        <button onClick={handleStatisticsIconClick}>
          <img
            src={`/icon-chart-${theme === 'light' ? 'dark' : 'light'}.png`}
            alt="Analytics Icon"
            className="w-8 h-8 mr-2"
          />
        </button>
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
