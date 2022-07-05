import { ReloadIcon, UpdateIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import useUpdateEffect from '../../hooks/useUpdateEffect';
import { genName, properNoun, Sex } from '../../util';
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
        firstValue,
        lastValue,
        shown = true,
    } = props;

    const [_sex, setSex] = useState(sex);
    const [gName, setGName] = useState(() => genName(sex));
    const [first, setFirst] = useState(firstValue ?? "");
    const [last, setLast] = useState(lastValue ?? "");

    const doRegen = () => {
        const nFirst = properNoun(gName.first());
        const nLast = properNoun(gName.last());
        onFirstChange?.(nFirst);
        onLastChange?.(nLast);
        if (!firstValue) setFirst(nFirst);
        if (!lastValue) setLast(nLast);
    };

    useUpdateEffect(() => {
        if (sex !== _sex) {
            setSex(sex);
            setGName(genName(sex));
        }

        if (firstValue && first !== firstValue) setFirst(firstValue);
        if (lastValue && last !== lastValue) setLast(lastValue);
    }, [sex, firstValue, lastValue]);

    useUpdateEffect(() => {
        doRegen();
    }, [_sex]);

    return shown ? (
        <Center style={{ flexGrow: "unset", flexShrink: "unset" }}>
            <NameInput
                gen={gName.first}
                htmlFor="firstName"
                text="First Name"
                onChange={(v) => onFirstChange?.(v)}
                value={first}
            />
            <NameInput
                gen={gName.last}
                htmlFor="lastName"
                text="Last Name"
                onChange={(v) => onLastChange?.(v)}
                value={last}
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
                onChange={(v) => onFirstChange?.(v)}
                value={first}
                shown={false}
            />
            <NameInput
                gen={gName.last}
                htmlFor="lastName"
                text="Last Name"
                onChange={(v) => onLastChange?.(v)}
                value={last}
                shown={false}
            />
        </>
    );
};

export default NameGenInput;
