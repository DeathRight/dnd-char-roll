import { UpdateIcon } from '@radix-ui/react-icons';
import { useMemo, useState } from 'react';
import Roll from 'roll';

import { styled } from '../../stitches.config';
import { properNounAll, Sex } from '../../util';
import backgrounds from '../../util/backgrounds';
import Center from '../common/Center';
import Divider from '../common/Divider';
import Flex from '../common/Flex';
import RadioGroup, { RadioItem } from '../common/RadioGroup';
import SelectDemo, { SelectList } from '../common/SelectList';
import { useTheme } from '../contexts/ThemeContextProvider';
import IconButton from '../IconButton';
import CopyableTextArea from '../inputs/CopyableTextArea';
import NameGenInput from '../inputs/NameGenInput';
import NumberInput from '../inputs/NumberInput';

const roll = new Roll();

const StyledIconButton = styled(IconButton, {
    width: "100%",
});

const StyledTable = styled("table", {
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: "0",
    textAlign: "center",
    fontSize: "$md",
});
const StyledTBody = styled("tbody", {
    "& tr:nth-child(even)": {
        backgroundColor: "$appBg",
    },
});

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const randomInt = (a = 1, b = 0) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const StatNames = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Wisdom",
    "Intelligence",
    "Charisma",
];

const CharacterGenForm = () => {
    const theme = useTheme();

    const [sex, setSex] = useState(Math.round(Math.random()) as Sex);
    const [minAge, setMinAge] = useState(1);
    const [maxAge, setMaxAge] = useState(60);
    const [age, setAge] = useState(randomInt(minAge, maxAge));

    const [background, setBackground] = useState(
        backgrounds[randomInt(0, backgrounds.length - 1)]
    );

    const [statRoll, setStatRoll] = useState("4d6b3");
    const rollStats = () => {
        const a = [];
        for (let i = 0; i < StatNames.length; i++) {
            a.push(roll.roll(statRoll));
        }

        return a;
    };
    const [stats, setStats] = useState(() => rollStats());

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
                    background: background,
                    ...(() => {
                        let o: { [k: string]: number } = {};
                        stats.forEach((v, i) => (o[StatNames[i]] = v.result));
                        return o;
                    })(),
                },
                null,
                " "
            ),
        [sex, age, firstName, lastName, stats, background]
    );

    const StatsTable = useMemo(
        () => (
            <StyledTable>
                <StyledTBody>
                    {stats.map((v, i) => {
                        const rolled = v.calculations[1] as unknown as number[];
                        // Typing is wrong, console.log reveals calculations = [number, number[]]
                        return (
                            <tr>
                                <td>{StatNames[i]}</td>
                                <td>{`${rolled.join("+")}`}</td>
                                <td
                                    style={{ fontWeight: "bold" }}
                                >{`${v.result}`}</td>
                            </tr>
                        );
                    })}
                </StyledTBody>
            </StyledTable>
        ),
        [stats]
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
            <Divider label="Background" />
            <Flex>
                <SelectList
                    aria-label="Background"
                    list={backgrounds}
                    value={background.toLowerCase()}
                    onValueChange={(v) => setBackground(properNounAll(v))}
                />
            </Flex>
            <Divider label="Stats" />
            <Flex style={{ width: "100%" }}>{StatsTable}</Flex>
            <Divider />
            <StyledIconButton
                icon={UpdateIcon}
                aria-label={"Regenerate Character"}
                tooltip={"Regenerate Character"}
                onClick={(e) => {
                    setRegen(Math.random() + regen);
                    setSex(Math.round(Math.random()));
                    setAge(randomInt(minAge, maxAge));
                    setStats(rollStats());
                    setBackground(
                        backgrounds[randomInt(0, backgrounds.length - 1)]
                    );
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
