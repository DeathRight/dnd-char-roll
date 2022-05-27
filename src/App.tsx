import './App.css';

import Card from './components/common/Card';
import Center from './components/common/Center';
import { useDarkModeState, useTheme } from './components/contexts/ThemeContextProvider';
import CharacterGenForm from './components/forms/CharacterGenForm';
import ToggleTheme from './components/ToggleThemeButton';
import { styled } from './stitches.config';
import globalStyles from './styles/globalStyles';

const AppWrapper = styled("div", {
  backgroundColor: "$appBg",
  color: "$hiC",
  lineHeight: "$1",
  fontSize: "$sm",
  margin: "0",
  padding: "0",
  width: "100vw",
  height: "100vh",
  display: "flex",
});

const ButtonHeader = styled("div", {
  top: "0",
  right: "0",
  position: "fixed",
  display: "flex",
  flexDirection: "row-reverse",
  flex: "0 0 auto",
});

function App() {
  globalStyles();
  const theme = useTheme();
  const [darkMode, setDarkMode] = useDarkModeState();

  return (
    <AppWrapper className={theme}>
      <ButtonHeader>
        <ToggleTheme
          defaultPressed={darkMode}
          onPressed={(p) => setDarkMode(p)}
        />
      </ButtonHeader>
      <Center>
        <Card>
          <CharacterGenForm />
        </Card>
      </Center>
    </AppWrapper>
  );
}

export default App;
