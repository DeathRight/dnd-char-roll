import { Slot } from '@radix-ui/react-slot';
import { Toggle } from '@radix-ui/react-toggle';
import { useState } from 'react';

import { styled } from '../../stitches.config';
import { ToggleButtonProps } from '../../util/component-props';

const ToggleButton = (props: ToggleButtonProps) => {
  const {
    asChild,
    className,
    children,
    color,
    bgColor,
    fontSize,
    size = "$4",
    //
    defaultPressed = false,
    onPressed,
    contentOn,
    contentOff,
    ariaLabel,
  } = props;
  let { as, width, height } = props;
  width ??= size;
  height ??= size;
  as ??= Toggle;
  const comp = asChild ? Slot : as;

  const ToggleStyle = styled(comp, {
    backgroundColor: bgColor ?? "$attActive",
    color: color ?? "$attA",
    fontSize: fontSize ?? "$lg",
    width,
    height,
    borderRadius: "$round",
    boxShadow: "$1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "$info",
    cursor: "pointer",
    "&:focus": {
      boxShadow: "$2",
    },
    "&:hover": {
      backgroundColor: "$attHover",
    },
  });

  const [isPressed, setIsPressed] = useState(defaultPressed);
  return (
    <ToggleStyle
      className={className}
      pressed={isPressed}
      onPressedChange={(p: boolean) => {
        setIsPressed(p);
        onPressed?.(p);
      }}
      aria-label={ariaLabel}
    >
      {isPressed ? contentOn : contentOff}
      {children}
    </ToggleStyle>
  );
};

export default ToggleButton;
