import { globalCss } from '../stitches.config';

const globalStyles = globalCss({
  html: {
    margin: 0,
    padding: 0,
  },
  body: {
    overflow: "hidden",
    backgroundColor: "$appBg",
    color: "$hiC",
    lineHeight: "$1",
    fontSize: "$sm",
    margin: "0",
    padding: "0",
    height: "100vh",
    width: "100vw",
    fontFamily: `'Quicksand', sans-serif`,
  },
  "a:link": {
    color: "$link",
  },
  "a:hover": {
    color: "$linkHover",
  },
  "a:active": {
    color: "$linkSelect",
  },
  "a:visited": {
    color: "$p9",
  },
});

export default globalStyles;
