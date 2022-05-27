import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { styled } from '../stitches.config';
import { ToggleThemeButtonProps } from '../util/component-props';
import ToggleButton from './common/ToggleButton';

const ToggleTheme = ({ defaultPressed, onPressed }: ToggleThemeButtonProps) => {
  const ToggleThemeStyle = styled(ToggleButton, {
    backgroundColor: "$attActive",
    color: "$attA",
    size: "$6",
    fontSize: "$lg",
    borderRadius: "$round",
    boxShadow: "$1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "$1",
    borderColor: "$info",
    "&:focus": {
      boxShadow: "$2",
    },
    "&:hover": {
      backgroundColor: "$attHover",
    },
  });
  return (
    <ToggleThemeStyle
      defaultPressed={defaultPressed}
      onPressed={onPressed}
      contentOn={<MoonIcon />}
      contentOff={<SunIcon />}
      ariaLabel="Toggle Dark Theme"
    />
  );
};

export default ToggleTheme;
