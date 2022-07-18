import { blackA, mauve, violet } from "@radix-ui/colors";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { keyframes, styled } from "@stitches/react";
import React, { useId } from "react";

const slideDown = keyframes({
    from: { height: 0 },
    to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: 0 },
});

const StyledAccordion = styled(AccordionPrimitive.Root, {
    borderRadius: 6,
    //width: 300,
    backgroundColor: "$active",
    boxShadow: `0 2px 10px ${blackA.blackA4}`,
});

const StyledItem = styled(AccordionPrimitive.Item, {
    overflow: "hidden",
    marginTop: 1,

    "&:first-child": {
        marginTop: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },

    "&:last-child": {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },

    "&:focus-within": {
        position: "relative",
        zIndex: 1,
        boxShadow: "0 0 0 1px",
    },
});

const StyledHeader = styled(AccordionPrimitive.Header, {
    all: "unset",
    display: "flex",
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
    all: "unset",
    fontFamily: "inherit",
    backgroundColor: "transparent",
    padding: "0 20px",
    height: 45,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 15,
    lineHeight: 1,
    color: "$a",
    boxShadow: `0 1px 0 $select`,
    cursor: "pointer",
    //'&[data-state="closed"]': { backgroundColor: "$active" },
    '&[data-state="open"]': { backgroundColor: "$attActive", color: "$attA" },
    "&:hover": { backgroundColor: "$hover" },
    "$:active": { backgroundColor: "$select" },
});

const StyledContent = styled(AccordionPrimitive.Content, {
    overflow: "hidden",
    fontSize: 15,
    color: "$attHiC",
    backgroundColor: "$cardBg",

    '&[data-state="open"]': {
        animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
    },
    '&[data-state="closed"]': {
        animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
    },
});

const StyledContentText = styled("div", {
    padding: "15px 20px",
});

const StyledChevron = styled(ChevronDownIcon, {
    //color: "$attA",
    transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
    "[data-state=open] &": { transform: "rotate(180deg)" },
});

// TODO: change colors to theme colors

// Exports
export const Accordion = StyledAccordion;
export const AccordionItem = StyledItem;
export const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    AccordionPrimitive.AccordionTriggerProps
>(({ children, ...props }, forwardedRef) => (
    <StyledHeader>
        <StyledTrigger {...props} ref={forwardedRef}>
            {children}
            <StyledChevron aria-hidden />
        </StyledTrigger>
    </StyledHeader>
));
export const AccordionContent = React.forwardRef<
    HTMLDivElement,
    AccordionPrimitive.AccordionContentProps
>(({ children, ...props }, forwardedRef) => (
    <StyledContent {...props} ref={forwardedRef}>
        <StyledContentText>{children}</StyledContentText>
    </StyledContent>
));

/* ---------------------- Streamlined AccordionListItem --------------------- */
export interface AccordionListItemProps
    extends Omit<AccordionPrimitive.AccordionItemProps, "value"> {
    /**
     * Text to use in the `Trigger` component
     */
    title: string;
    /**
     * Unique value for the item. Will generate using `useId` by default.
     */
    value?: string;
}
export const AccordionListItem = (props: AccordionListItemProps) => {
    const { title, value, children, ...spread } = props;
    const uId = useId();
    const key = value ?? uId;
    // Use generated unique ID as value (key) if a value is not provided

    return (
        <AccordionItem value={key} {...spread}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
    );
};

// Your app...
/*export const AccordionDemo = () => (
    <Accordion type="single" defaultValue="item-1" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
            <AccordionTrigger>Is it unstyled?</AccordionTrigger>
            <AccordionContent>
                Yes. It's unstyled by default, giving you freedom over the look
                and feel.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
            <AccordionTrigger>Can it be animated?</AccordionTrigger>
            <AccordionContent>
                Yes! You can animate the Accordion with CSS or JavaScript.
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);

export default AccordionDemo;*/
