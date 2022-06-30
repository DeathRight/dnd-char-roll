import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import React, { Fragment, useId, useMemo } from 'react';

import { styled } from '../../stitches.config';

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
    all: "unset",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    padding: "0 15px",
    fontSize: "$md",
    lineHeight: 1,
    height: 35,
    gap: 5,
    backgroundColor: "$p3",
    color: "$a11",
    boxShadow: `0 2px 10px $blackA7`,
    "&:hover": { backgroundColor: "$p3" },
    "&:focus": { boxShadow: `0 0 0 2px $blackA12` },
});

const StyledContent = styled(SelectPrimitive.Content, {
    overflow: "hidden",
    backgroundColor: "$p3",
    borderRadius: 6,
    boxShadow:
        "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

const StyledViewport = styled(SelectPrimitive.Viewport, {
    padding: 5,
});

const StyledItem = styled(SelectPrimitive.Item, {
    all: "unset",
    fontSize: "$md",
    lineHeight: 1,
    color: "$a11",
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    height: 25,
    padding: "0 35px 0 25px",
    position: "relative",
    userSelect: "none",

    "&[data-disabled]": {
        color: "$p8",
        pointerEvents: "none",
    },

    "&:focus": {
        backgroundColor: "$a9",
        color: "$a1",
    },
});

const StyledLabel = styled(SelectPrimitive.Label, {
    padding: "0 25px",
    fontSize: "$sm",
    lineHeight: "25px",
    color: "$p11",
});

const StyledSeparator = styled(SelectPrimitive.Separator, {
    height: 1,
    backgroundColor: "$a6",
    margin: 5,
});

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
    position: "absolute",
    left: 0,
    width: 25,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
});

const scrollButtonStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    backgroundColor: "$p3",
    color: "$a11",
    cursor: "default",
};

const StyledScrollUpButton = styled(
    SelectPrimitive.ScrollUpButton,
    scrollButtonStyles
);

const StyledScrollDownButton = styled(
    SelectPrimitive.ScrollDownButton,
    scrollButtonStyles
);

/* --------------------------------- Exports -------------------------------- */
export const Select = SelectPrimitive.Root;
export const SelectTrigger = StyledTrigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectIcon = SelectPrimitive.Icon;
export const SelectContent = StyledContent;
export const SelectViewport = StyledViewport;
export const SelectGroup = SelectPrimitive.Group;
export const SelectItem = StyledItem;
export const SelectItemText = SelectPrimitive.ItemText;
export const SelectItemIndicator = StyledItemIndicator;
export const SelectLabel = StyledLabel;
export const SelectSeparator = StyledSeparator;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;

/* -------------------------------- Component ------------------------------- */
const Box = styled("div", {});

type CategoryList = [string, string[]];
function isListCategoryList(
    list: string[] | CategoryList[]
): list is CategoryList[] {
    return Array.isArray(list[0]);
}
export interface SelectListProps
    extends SelectPrimitive.SelectProps,
        Pick<SelectPrimitive.SelectTriggerProps, "aria-label"> {
    /**
     * Either string[] with item names, or CategoryList [string, string[]][]
     * where '0' is the category name, and '1' is list of items in that category
     */
    list?: string[] | CategoryList[];
}

export const SelectList = (
    props: { list?: string[] } & SelectPrimitive.SelectProps &
        Pick<SelectPrimitive.SelectTriggerProps, "aria-label">
) => {
    const { children, "aria-label": ariaLabel, list = [""], ...spread } = props;
    const baseKey = useId();

    const List = useMemo(() => {
        if (isListCategoryList(list)) {
            const l = list as CategoryList[];
            return (
                <>
                    {l.map((c, i) => {
                        const cKey = `${baseKey}:${i.toString()}`;

                        const cName = c[0];
                        const cList = c[1];

                        const isLast = i === l.length - 1;

                        const CategoryItems = cList.map((item) => {
                            const l = item.toLowerCase();
                            const key = `${cKey}:${l}`;

                            return (
                                <Fragment>
                                    <SelectItem key={key} value={l}>
                                        <SelectItemText>{item}</SelectItemText>
                                        <SelectItemIndicator>
                                            <CheckIcon />
                                        </SelectItemIndicator>
                                    </SelectItem>
                                </Fragment>
                            );
                        });

                        return (
                            <Fragment>
                                <SelectGroup>
                                    <SelectLabel>{cName}</SelectLabel>
                                    {CategoryItems}
                                </SelectGroup>
                                {!isLast ? <SelectSeparator /> : undefined}
                            </Fragment>
                        );
                    })}
                    ;
                </>
            );
        } else {
            const l = list as string[];
            return (
                <>
                    {l.map((item) => {
                        const l = item.toLowerCase();
                        const key = `${baseKey}:${l}`;

                        return (
                            <Fragment>
                                <SelectItem key={key} value={l}>
                                    <SelectItemText>{item}</SelectItemText>
                                    <SelectItemIndicator>
                                        <CheckIcon />
                                    </SelectItemIndicator>
                                </SelectItem>
                            </Fragment>
                        );
                    })}
                </>
            );
        }
    }, [baseKey, list]);

    return (
        <Box>
            <Select {...spread}>
                <SelectTrigger aria-label={ariaLabel}>
                    <SelectValue />
                    <SelectIcon>
                        <ChevronDownIcon />
                    </SelectIcon>
                </SelectTrigger>
                <SelectContent>
                    <SelectScrollUpButton>
                        <ChevronUpIcon />
                    </SelectScrollUpButton>
                    <SelectViewport>{List}</SelectViewport>
                    <SelectScrollDownButton>
                        <ChevronDownIcon />
                    </SelectScrollDownButton>
                </SelectContent>
            </Select>
        </Box>
    );
};

export default SelectList;
