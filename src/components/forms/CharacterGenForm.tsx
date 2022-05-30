import { UpdateIcon } from '@radix-ui/react-icons';
import { useMemo, useState } from 'react';

import { styled } from '../../stitches.config';
import { Sex } from '../../util';
import Center from '../common/Center';
import Divider from '../common/Divider';
import Flex from '../common/Flex';
import RadioGroup, { RadioItem } from '../common/RadioGroup';
import { useTheme } from '../contexts/ThemeContextProvider';
import IconButton from '../IconButton';
import CopyableTextArea from '../inputs/CopyableTextArea';
import NameGenInput from '../inputs/NameGenInput';
import NumberInput from '../inputs/NumberInput';

const StyledIconButton = styled(IconButton, {
    width: "100%",
});

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const randomInt = (a = 1, b = 0) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const CharacterGenForm = () => {
    const theme = useTheme();

    const [sex, setSex] = useState(Math.round(Math.random()) as Sex);
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(60);
    const [age, setAge] = useState(randomInt(minAge, maxAge));

    const [regen, setRegen] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const json = useMemo(
        () =>
            JSON.stringify(
                {
                    sex: sex,
                    age: age,
                    firstName: firstName,
                    lastName: lastName,
                },
                null,
                " "
            ),
        [sex, age, firstName, lastName]
    );

    return (
        <Center as={"form"} onSubmit={(e: any) => e.preventDefault()}>
            <Divider label="Biology" />
            <Flex>
                <RadioGroup
                    orientation="horizontal"
                    defaultValue={Sex[sex]}
                    value={Sex[sex]}
                    aria-label="Select Sex"
                    onValueChange={(v: keyof typeof Sex) => setSex(Sex[v])}
                >
                    <RadioItem value="Male" label="Male" aria-label="Male" />
                    <RadioItem
                        value="Female"
                        label="Female"
                        aria-label="Female"
                    />
                </RadioGroup>
            </Flex>
            <Flex>
                <NumberInput
                    text="Age"
                    min={minAge}
                    max={maxAge}
                    value={age}
                    onChange={(v) => setAge(v)}
                />
            </Flex>
            <Divider label="Name Generator" />
            <NameGenInput
                sex={sex}
                onFirstChange={(n) => setFirstName(n)}
                onLastChange={(n) => setLastName(n)}
                regen={regen}
            />
            <Divider />
            <StyledIconButton
                icon={UpdateIcon}
                aria-label={"Regenerate Character"}
                tooltip={"Regenerate Character"}
                onClick={(e) => {
                    setRegen(Math.random() + regen);
                    setSex(Math.round(Math.random()));
                    setAge(randomInt(minAge, maxAge));
                }}
            />
            <Flex style={{ width: "100%" }}>
                <CopyableTextArea
                    readOnly
                    value={json}
                    style={{
                        maxHeight: "300px",
                        minWidth: "95%",
                        margin: "auto",
                        color: theme.colors.loC.value,
                    }}
                />
            </Flex>
        </Center>
    );
};

export default CharacterGenForm;
