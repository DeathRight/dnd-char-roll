import { blackA } from "@radix-ui/colors";
import * as LabelPrim from "@radix-ui/react-label";
import React, { useEffect, useId, useState } from "react";
import { Key } from "ts-key-enum";

import { styled } from "../../stitches.config";
import { NumberInputProps } from "../../util/component-props";
import Flex from "../common/Flex";
import Popover from "../common/Popover";
import Slider from "../common/Slider";

const Input = styled("input", {
    all: "unset",
    width: "$8",
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

const Label = styled(LabelPrim.Root, {
    fontSize: "$md",
    fontWeight: "bold",
    color: "$loC",
    userSelect: "none",
    marginRight: "$4",
});

type ValueType = string | readonly string[] | number;

const toNum = (n: ValueType) =>
    typeof n === "number" ? n : typeof n === "string" ? parseInt(n) : Number(n);
const constrain = (n: number, min?: number, max?: number) => {
    min = min ?? 0;

    let v = n;
    v = v < min ? min : v;
    v = max && v > max ? max : v;

    return v;
};
const compute = (
    n: ValueType,
    compareN: ValueType,
    min?: number,
    max?: number
) => {
    n = toNum(n);
    compareN = toNum(compareN);
    min = min ?? 0;

    if (isNaN(n)) {
        return min;
    }
    if (isNaN(compareN) || n === compareN) {
        return n;
    }

    return constrain(n, min, max);
};

const NumberInput = (props: NumberInputProps) => {
    const {
        defaultValue = 0,
        value,
        onChange,
        onBlur,
        htmlFor,
        text,
        min = 0,
        max = 100,
        children,
        ref,
        ...spread
    } = props;
    // Local state
    const [num, setNum] = useState(toNum(defaultValue));
    // Global state
    const [gNum, setGNum] = useState(toNum(defaultValue));
    // Whether focused or not
    const [isFocused, setIsFocused] = useState(false);

    const uid = useId();
    const hF = htmlFor ?? uid;

    useEffect(() => {
        let v = value ?? num;
        v = compute(v, num, min, max);

        if (v !== num) {
            setNum(v);
        }
    }, [defaultValue, value, num, min, max]);

    const onInputChange = (v: ValueType, global?: boolean) => {
        const newV = compute(v, num, min, max);
        if (newV !== num) {
            setNum(newV);
            onChange?.(newV);
            if (global) setGNum(newV);
        }
    };

    const onFocusChanged = (f: boolean) => {
        setGNum(num);
        setIsFocused(f);
        if (!f) onBlur?.(num);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        const key = e.key;
        const numKey = toNum(key);

        if (!isNaN(numKey)) {
            if (isFocused) {
                onInputChange(`${num}${numKey}`);
            } else {
                onInputChange(numKey);
            }
        } else if (key === Key.Backspace) {
            const numStr = num.toString();
            // Remove last character
            const slice = numStr.slice(0, numStr.length - 1);
            onInputChange(slice);
        }

        if (!isFocused) {
            onFocusChanged(true);
        }
    };

    return (
        <Flex>
            <div onBlur={() => onFocusChanged(false)}>
                {text && <Label htmlFor={hF}>{text}</Label>}
                <Popover.Root
                    onOpenChange={(o) => {
                        if (!o) {
                            onFocusChanged(false);
                            onBlur?.(num);
                        }
                    }}
                >
                    <Popover.Trigger asChild>
                        <Input
                            id={hF}
                            value={num}
                            min={min}
                            max={max}
                            onKeyDown={(e) => onKeyDown(e)}
                            {...spread}
                        />
                    </Popover.Trigger>
                    <Popover.Content hideWhenDetached>
                        <Slider
                            max={max}
                            min={min}
                            value={[num]}
                            onValueChange={(v) => onInputChange(v[0])}
                            onKeyDown={(e) => onKeyDown(e)}
                        />
                    </Popover.Content>
                </Popover.Root>
            </div>
        </Flex>
    );
};

export default NumberInput;
