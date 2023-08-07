import { useTheme } from '../hooks/useTheme';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__input"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span className="switch__slider switch__slider--round"></span>
    </label>
  );
};

export default ThemeSwitch;
