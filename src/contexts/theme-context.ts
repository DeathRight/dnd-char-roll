import { createContext } from 'react';

import { lightTheme } from '../stitches.config';

export const ThemeContext = createContext({
  curTheme: lightTheme,
  darkMode: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDarkMode: (value: boolean | ((val: boolean) => boolean)) => {},
});
export const ThemeProvider = ThemeContext.Provider;
export default ThemeContext;
