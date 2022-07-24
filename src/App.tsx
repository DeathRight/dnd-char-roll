import "./App.css";

import Center from "./components/common/Center";
import {
    useDarkModeState,
    useTheme,
} from "./components/contexts/ThemeContextProvider";
import ToggleTheme from "./components/ToggleThemeButton";
import CharacterGenPage from "./pages/CharacterGen";
import { styled } from "./stitches.config";
import globalStyles from "./styles/globalStyles";

const AppWrapper = styled("div", {
    backgroundColor: "$appBg",
    color: "$hiC",
    lineHeight: "$1",
    fontSize: "$sm",
    margin: "0",
    padding: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
});

const Header = styled("div", {
    top: "0",
    position: "sticky",
    display: "flex",
    flex: "0 0 auto",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "$appBg",
    boxShadow: "$1",
    border: "none",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: "$p6",
    zIndex: "$4",
});

function App() {
    globalStyles();
    const theme = useTheme();
    const [darkMode, setDarkMode] = useDarkModeState();

    return (
        <AppWrapper className={theme}>
            <Header>
                <h2 style={{ marginLeft: "4px" }}>D&D Character Generator</h2>
                <ToggleTheme
                    defaultPressed={darkMode}
                    onPressed={(p) => setDarkMode(p)}
                />
            </Header>
            <Center>
                <CharacterGenPage />
            </Center>
        </AppWrapper>
    );
}

export default App;
