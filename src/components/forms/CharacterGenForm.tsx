import { UpdateIcon } from '@radix-ui/react-icons';
import { useEffect, useMemo, useState } from 'react';
import Roll from 'roll';

import useUpdateEffect from '../../hooks/useUpdateEffect';
import { styled } from '../../stitches.config';
import { genName, properNoun, Sex } from '../../util';
import backgrounds from '../../util/backgrounds';
import { Character, CharacterGenFormProps, StatNames } from '../../util/component-props';
import Center from '../common/Center';
import Divider from '../common/Divider';
import Flex from '../common/Flex';
import RadioGroup, { RadioItem } from '../common/RadioGroup';
import { SelectList } from '../common/SelectList';
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

const CharacterGenForm = (props: CharacterGenFormProps) => {
    const {
        minAge = 1,
        maxAge = 60,
        statRoll = "4d6b3",
        shown = true,
        value,
        onChange,
        ...ariaProps
    } = props;
    const theme = useTheme();

    /* --------------------------------- Biology -------------------------------- */
    const [sex, setSex] = useState(
        value?.sex ?? (Math.round(Math.random()) as Sex)
    );
    const [age, setAge] = useState(value?.age ?? randomInt(minAge, maxAge));

    /* ------------------------------- Background ------------------------------- */
    const [background, setBackground] = useState(
        value?.background ?? backgrounds[randomInt(0, backgrounds.length - 1)]
    );

    /* ---------------------------------- Stats --------------------------------- */
    const rollStats = () => {
        const a = [];
        for (let i = 0; i < StatNames.length; i++) {
            a.push(roll.roll(statRoll));
        }

        return a;
    };
    const [stats, setStats] = useState(() => value?.stats ?? rollStats());

    /* ---------------------------------- Name ---------------------------------- */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [gName, setGName] = useState(() => genName(sex));
    const [firstName, setFirstName] = useState(
        value?.firstName ?? properNoun(gName.first())
    );
    const [lastName, setLastName] = useState(
        value?.lastName ?? properNoun(gName.last())
    );

    /* ---------------------------------- JSON ---------------------------------- */
    const char = useMemo(
        () =>
            ({
                sex: sex,
                age: age,
                firstName: firstName,
                lastName: lastName,
                background: background,
                stats: stats,
                ...(() => {
                    let o: { [k: string]: number } = {};
                    stats.forEach((v, i) => (o[StatNames[i]] = v.result));
                    return o;
                })(),
            } as Character),
        [sex, age, firstName, lastName, stats, background]
    );
    const json = useMemo(() => JSON.stringify(char, null, " "), [char]);

    /* -------------------------------- useEffect ------------------------------- */
    useUpdateEffect(() => {
        if (value && value !== char) {
            setSex(value.sex);
            setAge(value.age);
            setFirstName(value.firstName);
            setLastName(value.lastName);
            setBackground(value.background);
            setStats(value.stats);
        }
    }, [value]);

    useEffect(() => {
        if (onChange) {
            onChange(char);
        }
    }, [char, onChange]);

    /* ------------------------------- Stats Comp ------------------------------- */
    const StatsTable = useMemo(
        () => (
            <StyledTable>
                <StyledTBody>
                    {stats.map((v, i) => {
                        const rolled = v.calculations[1] as unknown as number[];
                        // ? Typing is wrong, console.log reveals calculations = [number, number[]]
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

    /* --------------------------------- Render --------------------------------- */
    return shown ? (
        <Center
            as={"form"}
            onSubmit={(e: any) => e.preventDefault()}
            {...ariaProps}
        >
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
                onFirstChange={(n) => {
                    if (n !== firstName) setFirstName(n);
                }}
                firstValue={firstName}
                onLastChange={(n) => {
                    if (n !== lastName) setLastName(n);
                }}
                lastValue={lastName}
            />
            <Divider label="Background" />
            <Flex>
                <SelectList
                    aria-label="Background"
                    list={backgrounds as unknown as string[]}
                    value={background.toLowerCase()}
                    onValueChange={(v) => setBackground(v as typeof background)}
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
                    const nSex = Math.round(Math.random());
                    setSex(nSex);
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
    ) : (
        <>
            <NameGenInput
                sex={sex}
                onFirstChange={(n) => setFirstName(n)}
                firstValue={firstName}
                onLastChange={(n) => setLastName(n)}
                lastValue={lastName}
                shown={false}
            />
        </>
    );
};

export default CharacterGenForm;
