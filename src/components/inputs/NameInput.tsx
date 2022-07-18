import { UpdateIcon } from "@radix-ui/react-icons";
import * as LabelPrim from "@radix-ui/react-label";
import React, { useId } from "react";
import { styled } from "../../stitches.config";
import { NameInputProps } from "../../util/component-props";
import Flex from "../common/Flex";
import IconButton from "../IconButton";
import CopyableInput from "./CopyableInput";

const Label = styled(LabelPrim.Root, {
    fontSize: "$md",
    fontWeight: "bold",
    color: "$loC",
    userSelect: "none",
    marginRight: "$4",
});

const NameInput = (props: NameInputProps) => {
    const { htmlFor, text, onChange, onClick, value, shown = true } = props;

    const uid = useId();
    const hF = htmlFor ?? uid;

    return shown ? (
        <Flex>
            <div>
                <Label htmlFor={hF}>{text}</Label>
                <CopyableInput
                    id={hF}
                    value={value}
                    onChange={(e) => onChange?.(e.currentTarget.value)}
                    tag={text}
                />
            </div>
            <IconButton
                icon={UpdateIcon}
                aria-label={`Regenerate ${text}`}
                onClick={() => onClick?.()}
                tooltip={`Regenerate ${text}`}
            />
        </Flex>
    ) : (
        <></>
    );
};

export default NameInput;
