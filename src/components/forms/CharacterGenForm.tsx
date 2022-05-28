import { UpdateIcon } from '@radix-ui/react-icons';
import { useMemo, useState } from 'react';

import { styled } from '../../stitches.config';
import { Sex } from '../../util';
import Center from '../common/Center';
import Divider from '../common/Divider';
import Flex from '../common/Flex';
import RadioGroup, { RadioItem } from '../common/RadioGroup';
import IconButton from '../IconButton';
import CopyableTextArea from '../inputs/CopyableTextArea';
import NameGenInput from '../inputs/NameGenInput';

const StyledIconButton = styled(IconButton, {
    width: "100%",
});

const CharacterGenForm = () => {
    const [sex, setSex] = useState(Math.round(Math.random()) as Sex);

    const [regen, setRegen] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const json = useMemo(
        () =>
            JSON.stringify(
                {
                    sex: sex,
                    firstName: firstName,
                    lastName: lastName,
                },
                null,
                " "
            ),
        [sex, firstName, lastName]
    );

    return (
        <Center as={"form"} onSubmit={(e: any) => e.preventDefault()}>
            <Divider label="Sex" />
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
                    }}
                />
            </Flex>
        </Center>
    );
};

export default CharacterGenForm;
