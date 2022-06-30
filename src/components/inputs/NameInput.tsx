import { UpdateIcon } from '@radix-ui/react-icons';
import * as LabelPrim from '@radix-ui/react-label';
import React, { useId } from 'react';
import { useEffect, useState } from 'react';

import useIsFirstRender from '../../hooks/useIsFirstRender';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { styled } from '../../stitches.config';
import { properNoun } from '../../util';
import { NameInputProps } from '../../util/component-props';
import Flex from '../common/Flex';
import IconButton from '../IconButton';
import CopyableInput from './CopyableInput';

const Label = styled(LabelPrim.Root, {
    fontSize: "$md",
    fontWeight: "bold",
    color: "$loC",
    userSelect: "none",
    marginRight: "$4",
});

const NameInput = (props: NameInputProps) => {
    const { gen, regen, htmlFor, text, onChange, value, shown = true } = props;
    const [name, setName] = useState(value ?? "");

    const isFirst = useIsFirstRender();

    const uid = useId();
    const hF = htmlFor ?? uid;

    useEffect(() => {
        if (isFirst) {
            if (!value) {
                const n = properNoun(gen());
                if (value === undefined) setName(n);
                onChange?.(n);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFirst]);

    useUpdateEffect(() => {
        if (isFirst && value) {
            return;
        } else if (!isFirst) {
            const n = properNoun(gen());
            if (value === undefined) setName(n);
            onChange?.(n);
            console.log("WHY IS THIS HAPPENING");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [regen]);

    useUpdateEffect(() => {
        if (value) {
            setName(value);
        }
    }, [value]);

    const onInputChange = (v: string) => {
        if (v !== name) {
            onChange?.(v);
            if (value === undefined) setName(v);
        }
    };

    return shown ? (
        <Flex>
            <div>
                <Label htmlFor={hF}>{text}</Label>
                <CopyableInput
                    id={hF}
                    value={name}
                    onChange={(e) => onInputChange(e.currentTarget.value)}
                    tag={text}
                />
            </div>
            <IconButton
                icon={UpdateIcon}
                aria-label={`Regenerate ${text}`}
                onClick={() => onInputChange(properNoun(gen()))}
                tooltip={`Regenerate ${text}`}
            />
        </Flex>
    ) : (
        <></>
    );
};

export default NameInput;
