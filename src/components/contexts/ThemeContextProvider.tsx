import { FunctionComponent, useContext } from 'react';

import ThemeContext, { ThemeProvider } from '../../contexts/theme-context';
import useDarkMode from '../../hooks/useDarkMode';
import { darkTheme, lightTheme } from '../../stitches.config';
import { AppProps } from '../../util/component-props';

export const ThemeContextProvider: FunctionComponent<AppProps> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <ThemeProvider
      value={{
        curTheme: darkMode ? darkTheme : lightTheme,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export const useTheme = () => {
  const { curTheme } = useContext(ThemeContext);
  if (!curTheme) {
    throw new Error("Cannot call useTheme outside of ThemeContextProvider!");
  }

  return curTheme;
};

export const useDarkModeState = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  if (!setDarkMode) {
    throw new Error(
      "Cannot call useDarkModeState outside of ThemeContextProvider!"
    );
  }

  return [darkMode, setDarkMode] as const;
};

export default ThemeContextProvider;
