import { UpdateIcon } from '@radix-ui/react-icons';
import * as LabelPrim from '@radix-ui/react-label';
import React from 'react';
import { useEffect, useState } from 'react';

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
    const { gen, regen, htmlFor, text, onChange } = props;
    const [name, setName] = useState("");

    useEffect(() => {
        const n = properNoun(gen());
        setName(n);
        onChange?.(n);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [regen]);

    const onInputChange = (v: string) => {
        if (v !== name) {
            onChange?.(v);
            setName(v);
        }
    };

    return (
        <Flex>
            <div>
                <Label htmlFor={htmlFor}>{text}</Label>
                <CopyableInput
                    id={htmlFor}
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
    );
};

export default NameInput;
