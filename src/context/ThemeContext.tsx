import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { ThemeState } from '../interfaces/theme';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSelector((state: { theme: ThemeState }) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
