import { ReloadIcon, UpdateIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import useUpdateEffect from '../../hooks/useUpdateEffect';
import { genName, Sex } from '../../util';
import { NameGenInputProps } from '../../util/component-props';
import Center from '../common/Center';
import Flex from '../common/Flex';
import IconButton from '../IconButton';
import NameInput from './NameInput';

const NameGenInput = (props: NameGenInputProps) => {
    const {
        sex = Sex.Female,
        onFirstChange,
        onLastChange,
        regen: _regen,
        firstValue,
        lastValue,
        shown = true,
    } = props;

    const [regen, setRegen] = useState(_regen ?? 0);
    const [gName, setGName] = useState(() => genName(sex));

    const doRegen = (r?: number) => setRegen(r ?? Math.random() + regen);

    useUpdateEffect(() => {
        setGName(genName(sex));
        doRegen();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sex]);

    useUpdateEffect(() => {
        doRegen(_regen);
    }, [_regen]);

    return shown ? (
        <Center style={{ flexGrow: "unset", flexShrink: "unset" }}>
            <NameInput
                gen={gName.first}
                htmlFor="firstName"
                text="First Name"
                regen={regen}
                onChange={(v) => onFirstChange?.(v)}
                value={firstValue}
            />
            <NameInput
                gen={gName.last}
                htmlFor="lastName"
                text="Last Name"
                regen={regen}
                onChange={(v) => onLastChange?.(v)}
                value={lastValue}
            />
            <Flex>
                <IconButton
                    icon={UpdateIcon}
                    aria-label="Regenerate both names"
                    onClick={() => doRegen()}
                    width="100%"
                    tooltip="Regenerate both names"
                />
                <IconButton
                    icon={ReloadIcon}
                    aria-label="Regenerate seed"
                    onClick={() => setGName(genName(sex))}
                    width="100%"
                    tooltip="Regenerate seed"
                />
            </Flex>
        </Center>
    ) : (
        <>
            <NameInput
                gen={gName.first}
                htmlFor="firstName"
                text="First Name"
                regen={regen}
                onChange={(v) => onFirstChange?.(v)}
                value={firstValue}
                shown={false}
            />
            <NameInput
                gen={gName.last}
                htmlFor="lastName"
                text="Last Name"
                regen={regen}
                onChange={(v) => onLastChange?.(v)}
                value={lastValue}
                shown={false}
            />
        </>
    );
};

export default NameGenInput;
