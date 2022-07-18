import { blackA } from "@radix-ui/colors";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import React, { useRef } from "react";
import { useEffect, useState } from "react";

import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { styled } from "../../stitches.config";
import { CopyableInputProps } from "../../util/component-props";
import Button from "../common/Button";
import Center from "../common/Center";
import { useTheme } from "../contexts/ThemeContextProvider";
import IconMorph from "../IconMorph";

const Input = styled("input", {
    all: "unset",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "$1",
    paddingLeft: "$2",
    paddingTop: "$2",
    paddingBottom: "$2",
    fontSize: "$md",
    color: "$hiC",
    backgroundColor: "$attActive",
    boxShadow: `0 0 0 1px ${blackA.blackA5}`,
    "&:focus": { boxShadow: `0 0 0 2px black` },
});
const RightDiv = styled(Center, {
    width: "auto",
    justifySelf: "flex-end",
    flexGrow: "unset",
    position: "relative",
});
const StyledIconButton = styled("button", {
    backgroundColor: "transparent",
    "&:hover": {
        backgroundColor: "$hover",
        boxShadow: "none",
    },
    "&:active": {
        backgroundColor: "$active",
    },
    "&:disabled": {
        backgroundColor: "$select",
    },
    borderWidth: "0",
    position: "absolute",
    bottom: "0px",
    right: "0px",
    width: "auto",
    margin: "$1",
    padding: "$3",
    paddingLeft: "6px",
    paddingRight: "6px",
    marginTop: "auto",
    boxShadow: "none",
    fontSize: "$md",
    color: "$hiC",
    height: "$4",
    borderRadius: "$2",
    borderColor: "$a7",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
});

const CopyableInput = (props: CopyableInputProps) => {
    const { tag, type, children, ref, ...spread } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [copyValue, copy] = useCopyToClipboard();
    const [disabled, setDisabled] = useState(false);
    const [copied, setCopied] = useState(false);
    const [Icon, setIcon] = useState(() => CopyIcon);

    const theme = useTheme();

    useEffect(() => {
        if (copied === true) {
            setIcon(CheckIcon);
            setTimeout(() => {
                setCopied(false);
                setDisabled(false);
                setIcon(CopyIcon);
            }, 3000);
        }
    }, [copied]);

    const onCopyClick = () => {
        if (inputRef.current) {
            copy(inputRef.current.value)
                .then((v) => setCopied(true))
                .catch((r) => setDisabled(false));
            setDisabled(true);
        }
    };

    return (
        <>
            <Input type="text" ref={inputRef} {...spread} />
            <RightDiv>
                <StyledIconButton
                    aria-label={`Copy${tag ? ` ${tag}` : ""}`}
                    onClick={onCopyClick}
                    disabled={disabled}
                >
                    <IconMorph
                        icon={Icon}
                        color={copied ? theme.colors.successA.value : undefined}
                    />
                </StyledIconButton>
            </RightDiv>
        </>
    );
};

export default CopyableInput;
