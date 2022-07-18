import { Portal } from "@radix-ui/react-portal";
import { useCallback, useMemo, useState } from "react";

import { Accordion, AccordionListItem } from "../components/common/Accordion";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Divider from "../components/common/Divider";
import CharacterContextProvider from "../components/contexts/CharacterContextProvider";
import CharacterGenForm from "../components/forms/CharacterGenForm";
import NumberInput from "../components/inputs/NumberInput";
import {
    Character,
    CharacterContextProviderProps,
} from "../util/component-props";

const CharacterAccordionItem = (
    props: Omit<CharacterContextProviderProps, "value"> & {
        index: number;
        onChange: (i: number, char: Character) => void;
    }
) => {
    const { minAge, maxAge, statRoll, index, onChange } = props;
    const [char, setChar] = useState<Character | undefined>(undefined);

    return (
        <>
            {char === undefined && (
                <Portal>
                    <CharacterContextProvider
                        minAge={minAge}
                        maxAge={maxAge}
                        statRoll={statRoll}
                        value={char}
                    >
                        <CharacterGenForm
                            shown={false}
                            minAge={minAge}
                            maxAge={maxAge}
                            onChange={(c) => {
                                setChar(c);
                                onChange(index, c);
                            }}
                        />
                    </CharacterContextProvider>
                </Portal>
            )}
            <AccordionListItem
                title={
                    char ? `${char.firstName} ${char.lastName}` : "(loading...)"
                }
            >
                <CharacterContextProvider
                    minAge={minAge}
                    maxAge={maxAge}
                    statRoll={statRoll}
                    value={char}
                >
                    <CharacterGenForm
                        minAge={minAge}
                        maxAge={maxAge}
                        onChange={(c) => {
                            setChar(c);
                            onChange(index, c);
                        }}
                    />
                </CharacterContextProvider>
            </AccordionListItem>
        </>
    );
};

const CharacterGenPage = () => {
    const [amount, setAmount] = useState(1);
    const [statRoll, setStatRoll] = useState("4d6b3");
    const [minAge, setMinAge] = useState(1);
    const [maxAge, setMaxAge] = useState(60);

    const [regen, setRegen] = useState(Math.random());

    const [chars, setChars] = useState([] as Character[]);

    const charGenForms = useMemo(
        () =>
            ([] as number[]).fill(0, 0, amount - 1).map((_, ind) => (
                <>
                    <CharacterAccordionItem
                        minAge={minAge}
                        maxAge={maxAge}
                        statRoll={statRoll}
                        index={ind}
                        onChange={(i, char) => {
                            const cA = chars;
                            if (cA[i]) {
                                cA.splice(i, 1, char);
                            } else {
                                cA.push(char);
                            }
                            setChars(cA);
                        }}
                    />
                </>
            )),
        [regen]
    );

    return (
        <>
            <Card>
                <h2>Settings</h2>
                <Divider />
                <NumberInput
                    defaultValue={1}
                    min={1}
                    max={100}
                    text={"Amount"}
                    onChange={(v) => setAmount(v)}
                />
                <Divider label={"Character"} />
                <NumberInput
                    defaultValue={1}
                    min={1}
                    max={60}
                    text={"Min Age"}
                    onChange={(v) => setMinAge(v)}
                />
                <NumberInput
                    defaultValue={60}
                    min={1}
                    max={100}
                    text={"Max Age"}
                    onChange={(v) => setMaxAge(v)}
                />
                <Button onClick={() => setRegen(regen + 1)}>Submit</Button>
            </Card>
            <Card>
                <Accordion type="multiple">
                    <CharacterAccordionItem
                        minAge={minAge}
                        maxAge={maxAge}
                        statRoll={statRoll}
                        index={0}
                        onChange={(i, char) => {
                            const cA = chars;
                            if (cA[i]) {
                                cA.splice(i, 1, char);
                            } else {
                                cA.push(char);
                            }
                            setChars(cA);
                        }}
                    />
                </Accordion>
            </Card>
        </>
    );
};

export default CharacterGenPage;
