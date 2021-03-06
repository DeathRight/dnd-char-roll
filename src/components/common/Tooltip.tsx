import * as TooltipP from '@radix-ui/react-tooltip';

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

const StyledContent = styled(TooltipP.Content, {
    borderRadius: 4,
    padding: "10px 15px",
    fontSize: "$md",
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

const StyledArrow = styled(TooltipP.Arrow, {
    fill: "$info",
});

/* --------------------------------- Exports -------------------------------- */
const exp = {
    Provider: TooltipP.Provider,
    Root: TooltipP.Root,
    Trigger: TooltipP.Trigger,
    Content: StyledContent,
    Arrow: StyledArrow,
};
export default exp;
