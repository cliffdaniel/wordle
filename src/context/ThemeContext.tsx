import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { ThemeState } from '../interfaces/theme';
import { ThemeContext, ThemeContextProps } from '../hooks/useTheme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSelector((state: { theme: ThemeState }) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  const contextValue: ThemeContextProps = {
    theme,
    toggleTheme: toggleThemeHandler
  }


  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};