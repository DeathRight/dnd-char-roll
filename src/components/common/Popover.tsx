import { Cross2Icon } from '@radix-ui/react-icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { keyframes, styled } from '../../stitches.config';

const slideUpAndFade = keyframes({
    "0%": { opacity: 0, transform: "translateY(2px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
    "0%": { opacity: 0, transform: "translateX(-2px)" },
    "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
    "0%": { opacity: 0, transform: "translateY(-2px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
    "0%": { opacity: 0, transform: "translateX(2px)" },
    "100%": { opacity: 1, transform: "translateX(0)" },
});
const StyledContent = styled(PopoverPrimitive.Content, {
    borderRadius: 4,
    padding: "$2 $3",
    fontSize: 15,
    lineHeight: 1,
    color: "$infoHiC",
    backgroundColor: "$info",
    boxShadow:
        "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    "@media (prefers-reduced-motion: no-preference)": {
        animationDuration: "400ms",
        animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        animationFillMode: "forwards",
        willChange: "transform, opacity",
        '&[data-state="delayed-open"]': {
            '&[data-side="top"]': { animationName: slideDownAndFade },
            '&[data-side="right"]': { animationName: slideLeftAndFade },
            '&[data-side="bottom"]': { animationName: slideUpAndFade },
            '&[data-side="left"]': { animationName: slideRightAndFade },
        },
    },
});

const StyledArrow = styled(PopoverPrimitive.Arrow, {
    fill: "$info",
});

const StyledClose = styled(PopoverPrimitive.Close, {
    all: "unset",
    fontFamily: "inherit",
    borderRadius: "100%",
    height: 25,
    width: 25,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "$a11",
    position: "absolute",
    top: 5,
    right: 5,

    "&:hover": { backgroundColor: "$a4" },
    "&:focus": { boxShadow: `0 0 0 2px ${"$a7"}` },
});

const Flex = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "$2",
    paddingTop: "$5",
});

// Exports
const Content = (props: PopoverPrimitive.PopoverContentProps) => {
    const { children, sideOffset = 5, ...spread } = props;
    return (
        <StyledContent sideOffset={sideOffset} {...spread}>
            <Flex>{children}</Flex>
            <StyledArrow />
            <StyledClose aria-label="Close">
                <Cross2Icon />
            </StyledClose>
        </StyledContent>
    );
};

const exp = {
    Root: PopoverPrimitive.Root,
    Trigger: PopoverPrimitive.Trigger,
    Content: Content,
};

export default exp;
