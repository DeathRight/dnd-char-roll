import React, { useMemo } from "react";
import { violet, blackA, mauve, green } from "@radix-ui/colors";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { keyframes, styled } from "../stitches.config";
import Flex from "./common/Flex";
import { DialogMenuProps } from "../util/component-props";
import { useTheme } from "./contexts/ThemeContextProvider";

const overlayShow = keyframes({
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
});

const contentShow = keyframes({
    "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
    "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
    backgroundColor: blackA.blackA9,
    position: "fixed",
    inset: 0,
    "@media (prefers-reduced-motion: no-preference)": {
        animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
});

const StyledContent = styled(DialogPrimitive.Content, {
    backgroundColor: "$cardBg",
    borderRadius: "$2",
    boxShadow:
        "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "450px",
    maxHeight: "85vh",
    padding: 25,
    "@media (prefers-reduced-motion: no-preference)": {
        animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    "&:focus": { outline: "none" },
});

function Content(props: DialogPrimitive.DialogContentProps) {
    const { children, ...spread } = props;
    return (
        <DialogPrimitive.Portal>
            <StyledOverlay />
            <StyledContent {...spread}>{children}</StyledContent>
        </DialogPrimitive.Portal>
    );
}

const StyledTitle = styled(DialogPrimitive.Title, {
    margin: 0,
    fontWeight: 500,
    color: "$hiC",
    fontSize: "$lg",
});

const StyledDescription = styled(DialogPrimitive.Description, {
    margin: "10px 0 20px",
    color: "$loC",
    fontSize: "$md",
});

// Exports
export const DialogRoot = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

// Grab types to find and reorient components from children
const dialogTriggerType = (<DialogTrigger />).type;
const dialogCloseType = (<DialogClose />).type;

const Dialog = (props: DialogMenuProps) => {
    const { children, title, description, ...spread } = props;
    const theme = useTheme();
    /* ------------------------------ Close Button ------------------------------ */
    const IconButton = styled("button", {
        all: "unset",
        fontFamily: "inherit",
        borderRadius: "100%",
        height: 25,
        width: 25,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "$attLoC",
        position: "absolute",
        top: 10,
        right: 10,

        "&:hover": { backgroundColor: "$attHover" },
        "&:focus": { boxShadow: `0 0 0 2px ${theme.colors.a7}` },
    });
    /* --------------------------- Children Separation -------------------------- */
    const [trigger, close, content] = useMemo(() => {
        let trigger: React.ReactNode;
        let close: React.ReactNode;

        let content: React.ReactNode = React.Children.toArray(children).filter(
            (child, i) => {
                if (React.isValidElement(child)) {
                    if (child.type === dialogTriggerType) {
                        trigger = child;
                        return false;
                    } else if (child.type === dialogCloseType) {
                        close = child;
                        return false;
                    }
                }
                return true;
            }
        );
        return [trigger, close, content];
    }, [children]);
    /* --------------------------------- Render --------------------------------- */
    return (
        <DialogRoot {...spread}>
            {trigger}
            <DialogContent>
                {title && <DialogTitle>{title}</DialogTitle>}
                {description && (
                    <DialogDescription>{description}</DialogDescription>
                )}
                {content}
                <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
                    {close}
                </Flex>
                <DialogClose asChild>
                    <IconButton aria-label="Close">
                        <Cross2Icon />
                    </IconButton>
                </DialogClose>
            </DialogContent>
        </DialogRoot>
    );
};

export default Dialog;
