import { styled } from "../../stitches.config";
import * as LabelPrim from "@radix-ui/react-label";
import { TextInputProps } from "../../util/component-props";
import { useId } from "react";
import Flex from "../common/Flex";
import CopyableInput from "./CopyableInput";

const Label = styled(LabelPrim.Root, {
    fontSize: "$md",
    fontWeight: "bold",
    color: "$loC",
    userSelect: "none",
    marginRight: "$4",
});

const TextInput = (props: TextInputProps) => {
    const { tag, label, ...spread } = props;

    const uId = useId();

    return (
        <Flex>
            <div>
                {label && <Label htmlFor={uId}>{label}</Label>}
                <CopyableInput id={uId} tag={tag ?? label} {...spread} />
            </div>
        </Flex>
    );
};

export default TextInput;
