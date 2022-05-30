import * as RadioGroupP from '@radix-ui/react-radio-group';
import React, { useId } from 'react';

import { styled } from '../../stitches.config';
import { RadioGroupItemProps } from '../../util/component-props';
import Flex from './Flex';

const StyledRadio = styled(RadioGroupP.Item, {
    all: "unset",
    size: "$4",
    backgroundColor: "$attHiC",
    borderRadius: "$pill",
    boxShadow: "$1",
    "&:hover": {
        backgroundColor: "$attHover",
    },
    /*"&:focus": {
        boxShadow: "$2",
    },*/
});

const StyledIndicator = styled(RadioGroupP.Indicator, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    size: "100%",
    position: "relative",
    "&::after": {
        content: '""',
        display: "block",
        size: "$2",
        borderRadius: "$round",
        backgroundColor: "$attSelect",
    },
});

const Label = styled("label", {
    fontSize: "$md",
    color: "$hiC",
    userSelect: "none",
    paddingLeft: "$2",
});

const FlexH = styled(Flex, {
    justifyContent: "center",
    flexDirection: "row",
});
const FlexV = styled(Flex, {
    justifyContent: "center",
    flexDirection: "column",
});

const ItemFlex = styled("div", {
    display: "flex",
    padding: "$1 $1",
    alignItems: "center",
});

/* --------------------------------- Exports -------------------------------- */
export const RadioGroupPrimitive = {
    Root: RadioGroupP.Root,
    Item: StyledRadio,
    Indicator: StyledIndicator,
};

const RadioGroup = (props: RadioGroupP.RadioGroupProps) => {
    const { children, ...spread } = props;
    const FlexDiv = props.orientation === "vertical" ? FlexV : FlexH;

    return (
        <RadioGroupP.Root {...spread}>
            <FlexDiv>{children}</FlexDiv>
        </RadioGroupP.Root>
    );
};

export const RadioItem = (props: RadioGroupItemProps) => {
    const { children, label, id, indicatorProps, ...spread } = props;

    const genId = useId(); // Generate universal ID to use if not provided
    let uId = id ?? genId;

    return (
        <ItemFlex>
            <StyledRadio id={uId} {...spread}>
                {/* Check if there are children, if so, render, if not, render Indicator ourselves */}
                {!React.Children.count(children) ? (
                    <StyledIndicator {...indicatorProps} />
                ) : (
                    children
                )}
            </StyledRadio>
            {label && <Label htmlFor={uId}>{label}</Label>}
        </ItemFlex>
    );
};

export default RadioGroup;
