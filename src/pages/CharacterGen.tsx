import { Portal } from "@radix-ui/react-portal";
import { useCallback, useEffect, useState } from "react";

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
    CharacterGenPageSettings,
} from "../util/component-props";

/* ----------------------------- Sub Components ----------------------------- */
const CharacterAccordionItem = (
    props: CharacterContextProviderProps & {
        index: number;
        onChange: (i: number, char: Character) => void;
        id: string;
    }
) => {
    const { minAge, maxAge, statRoll, index, onChange, id, value } = props;

    const [char, setChar] = useState(value);

    const CharComp = (
        <CharacterContextProvider
            minAge={minAge}
            maxAge={maxAge}
            statRoll={statRoll}
            value={char}
        >
            <CharacterGenForm
                shown={char !== undefined}
                minAge={minAge}
                maxAge={maxAge}
                onChange={(c) => {
                    setChar(c);
                    onChange(index, c);
                }}
            />
        </CharacterContextProvider>
    );

    // If char hasn't loaded, portal out the component so it can load
    // and hide it until it does so.
    return (
        <>
            {char === undefined && <Portal>{CharComp}</Portal>}
            <AccordionListItem
                title={
                    char ? `${char.firstName} ${char.lastName}` : "(loading...)"
                }
                key={id}
            >
                {char && <>{CharComp}</>}
            </AccordionListItem>
        </>
    );
};

const Settings = (props: CharacterGenPageSettings) => {
    const {
        minAge: _minAge,
        maxAge: _maxAge,
        statRoll: _statRoll,
        onChange,
    } = props;

    const [amount, setAmount] = useState(1);
    const [statRoll, setStatRoll] = useState(_statRoll);
    const [minAge, setMinAge] = useState(_minAge);
    const [maxAge, setMaxAge] = useState(_maxAge);

    const onSubmit = () => {
        onChange({ amount, minAge, maxAge, statRoll });
    };

    return (
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
            <Button onClick={() => onSubmit()}>Submit</Button>
        </Card>
    );
};

/* ----------------------------- Main Component ----------------------------- */
const CharacterGenPage = () => {
    const [amount, setAmount] = useState(1);
    const [statRoll, setStatRoll] = useState("4d6b3");
    const [minAge, setMinAge] = useState(1);
    const [maxAge, setMaxAge] = useState(60);

    const [chars, setChars] = useState([] as Array<Character | undefined>);

    const createGenForms = useCallback(
        (charList: typeof chars) => {
            let forms: JSX.Element[] = [];
            console.log(chars);
            for (let ind = 0; ind < amount; ind++) {
                console.log(ind);
                forms.push(
                    <CharacterAccordionItem
                        minAge={minAge}
                        maxAge={maxAge}
                        statRoll={statRoll}
                        id={`char${ind}`}
                        index={ind}
                        value={charList[ind]}
                        onChange={(i, char) => {
                            const cA = chars;
                            if (cA[i]) {
                                cA.splice(i, 1, char);
                            } else {
                                cA.push(char);
                            }
                            setChars(cA);
                            console.log("Test");
                        }}
                    />
                );
            }

            return forms;
        },
        [amount, chars, maxAge, minAge, statRoll]
    );

    const [genForms, setGenForms] = useState(createGenForms(chars));

    useEffect(() => {
        const cA = chars;

        // If we have more chars stored than viewable amount, remove extras
        if (cA.length > amount - 1) {
            cA.splice(amount - 1);
            setChars(cA);
        }
        // Rerender character gen forms
        setGenForms(createGenForms(cA));
    }, [amount, chars, createGenForms]);

    return (
        <>
            <Settings
                minAge={minAge}
                maxAge={maxAge}
                statRoll={statRoll}
                onChange={(state) => {
                    if (state.amount !== amount) setAmount(state.amount);
                    if (state.minAge !== minAge) setMinAge(state.minAge);
                    if (state.maxAge !== maxAge) setMaxAge(state.maxAge);
                    if (state.statRoll !== statRoll)
                        setStatRoll(state.statRoll);
                }}
            />
            <Card
                css={{
                    backgroundColor: "transparent",
                    margin: "0",
                    padding: "0",
                }}
            >
                <Accordion type="multiple">{genForms}</Accordion>
            </Card>
        </>
    );
};

export default CharacterGenPage;
