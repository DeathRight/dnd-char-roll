import { styled } from '../stitches.config';
import { IconButtonProps, IconButtonPropsSpecific } from '../util/component-props';
import Button from './common/Button';
import Tooltip from './common/Tooltip';

const IconButton = (props: IconButtonProps) => {
  const { text, leftIcon, rightIcon, icon, tooltip } = props;

  // Remove specific props so we can spread to base button component
  // No actual performance hit, since it should never have to do more than a handful of iterations
  const buttonProps = Object.fromEntries(
    Object.entries(props).filter(([k]) => !IconButtonPropsSpecific[k])
  );

  const LeftIcon =
    leftIcon && styled(leftIcon, { marginRight: "$1", order: "0" });
  const Icon = icon && styled(icon, { order: "1" });
  const Child = text && styled(() => <span>{text}</span>, { order: "1" });
  const RightIcon =
    rightIcon && styled(rightIcon, { marginLeft: "$1", order: "2" });

  const btn = (
    <Button role="button" {...buttonProps}>
      {LeftIcon && <LeftIcon />}
      {Child && <Child />} {Icon && <Icon />}
      {RightIcon && <RightIcon />}
    </Button>
  );

  return (
    <>
      {!tooltip ? (
        btn
      ) : (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>{btn}</Tooltip.Trigger>
            <Tooltip.Content>
              {tooltip}
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </>
  );
};

export default IconButton;
