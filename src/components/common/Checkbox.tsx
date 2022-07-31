import { blackA } from "@radix-ui/colors";
import { CheckIcon } from "@radix-ui/react-icons";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { styled } from "../../stitches.config";
import * as LabelPrim from "@radix-ui/react-label";
import Flex from "./Flex";
import { CheckboxProps } from "../../util/component-props";
import { useId } from "react";

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
    all: "unset",
    backgroundColor: "$attHiC",
    width: "$4",
    height: "$4",
    borderRadius: "$1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    "&:hover": { backgroundColor: "$attHover" },
    "&:focus": { boxShadow: `0 0 0 2px black` },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
    color: "$attSelect",
    fontSize: "$md",
    textAlign: "center",
    size: "100%",
});

// Exports
export const Checkbox = StyledCheckbox;
export const CheckboxIndicator = StyledIndicator;

// Your app...
const Label = styled(LabelPrim.Root, {
    fontSize: "$md",
    color: "$hiC",
    userSelect: "none",
    marginLeft: "$2",
});

export const CheckboxInput = (props: CheckboxProps) => {
    const { label, indicatorProps, ...spread } = props;
    const uId = useId();
    return (
        <Flex css={{ alignItems: "center" }}>
            <Checkbox {...spread} id={uId}>
                <CheckboxIndicator {...indicatorProps}>
                    <CheckIcon height={"auto"} width={"auto"} />
                </CheckboxIndicator>
            </Checkbox>
            {label && <Label htmlFor={uId}>{label}</Label>}
        </Flex>
    );
};

export default CheckboxInput;
