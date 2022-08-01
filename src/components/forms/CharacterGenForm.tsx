import { UpdateIcon } from "@radix-ui/react-icons";
import { useEffect, useId, useMemo } from "react";

import { styled } from "../../stitches.config";
import { Sex } from "../../util";
import backgrounds from "../../util/backgrounds";
import { CharacterGenFormProps, StatNames } from "../../util/component-props";
import Center from "../common/Center";
import Divider from "../common/Divider";
import Flex from "../common/Flex";
import RadioGroup, { RadioItem } from "../common/RadioGroup";
import { SelectList } from "../common/SelectList";
import { useCharacter } from "../contexts/CharacterContextProvider";
import { useTheme } from "../contexts/ThemeContextProvider";
import IconButton from "../IconButton";
import CopyableTextArea from "../inputs/CopyableTextArea";
import NameGenInput from "../inputs/NameGenInput";
import NumberInput from "../inputs/NumberInput";

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
        shown = true,
        onChange,
        ...ariaProps
    } = props;

    const theme = useTheme();
    const {
        sex,
        setSex,
        age,
        setAge,
        background,
        setBackground,
        stats,
        rerollStats,
        char,
    } = useCharacter();

    const uId = useId();

    const json = useMemo(() => {
        const { stats: _stats, ...jChar } = char; // We don't need stat calcs in viewable character
        return JSON.stringify(jChar, null, " ");
    }, [char]);

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
                        if (typeof v === "object") {
                            // Stats were rolled instead of chosen from a range
                            // so we have to display calcs
                            const rolled = v
                                .calculations[1] as unknown as number[];
                            // ? Typing is wrong, console.log reveals calculations = [number, number[]]
                            return (
                                <tr key={`${uId}${i}-tr`}>
                                    <td>{StatNames[i]}</td>
                                    <td>{`${rolled.join("+")}`}</td>
                                    <td
                                        style={{ fontWeight: "bold" }}
                                    >{`${v.result}`}</td>
                                </tr>
                            );
                        } else {
                            // Stats were chosen from a range, no calcs to display
                            return (
                                <tr key={`${uId}${i}-tr`}>
                                    <td>{StatNames[i]}</td>
                                    <td
                                        style={{ fontWeight: "bold" }}
                                    >{`${v}`}</td>
                                </tr>
                            );
                        }
                    })}
                </StyledTBody>
            </StyledTable>
        ),
        [stats, uId]
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
            <NameGenInput />
            <Divider label="Background" />
            <Flex>
                <SelectList
                    key={`${uId}-bgL`}
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

                    rerollStats();

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
            <NameGenInput shown={false} />
        </>
    );
};

export default CharacterGenForm;
