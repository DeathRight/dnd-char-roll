import { keyframes, styled } from '../stitches.config';
import { SpinnerProps } from '../util/component-props';

const Spinner = ({ color, size, ...props }: SpinnerProps) => {
  size ??= "$8";
  color ??= "$attA transparent $infoA transparent";
  const rotate = keyframes({
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  });

  const SpinnerC = styled("div", {
    display: "inline-block",
    size: "fit-content",
    outline: "none",
    "&:after": {
      content: " ",
      display: "block",
      size,
      margin: "$2",
      borderRadius: "$round",
      borderStyle: "solid",
      borderWidth: "$3",
      borderColor: color,
      animation: `${rotate} 1.2s linear infinite`,
      outline: "none",
    },
  });

  return <SpinnerC {...props} />;
};

export default Spinner;
