import React from 'react';
import { useTheme } from '../hooks/useTheme';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'light' ? 'bg-layout-light' : 'bg-layout-dark'} min-h-screen pt-[40px] flex flex-col gap-[60px] items-center`}>
      {children}
    </div>
  );
};

export default Layout;
