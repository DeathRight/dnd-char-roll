import { Portal } from "@radix-ui/react-portal";
import { useCallback, useEffect, useState } from "react";

import { Accordion, AccordionListItem } from "../components/common/Accordion";
import Card from "../components/common/Card";
import CharacterContextProvider from "../components/contexts/CharacterContextProvider";
import GenSettingsContextProvider, {
    useGenSettings,
} from "../components/contexts/SettingsContextProvider";
import CharacterGenForm from "../components/forms/CharacterGenForm";
import CharacterGenSettings from "../components/forms/CharacterGenSettings";
import {
    Character,
    CharacterContextProviderProps,
} from "../util/component-props";

/* ----------------------------- Sub Components ----------------------------- */
const CharacterAccordionItem = (
    props: CharacterContextProviderProps & {
        index: number;
        onChange: (i: number, char: Character) => void;
        id: string;
    }
) => {
    const { minAge, maxAge, statRoll, statRange, index, onChange, id, value } =
        props;

    const [char, setChar] = useState(value);

    const CharComp = (
        <CharacterContextProvider
            minAge={minAge}
            maxAge={maxAge}
            statRoll={statRoll}
            statRange={statRange}
            value={char}
            key={`charCtx${id}`}
        >
            <CharacterGenForm
                shown={char !== undefined}
                minAge={minAge}
                maxAge={maxAge}
                onChange={(c) => {
                    setChar(c);
                    onChange(index, c);
                }}
                key={`charGen${id}`}
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
                value={id}
            >
                {char && <>{CharComp}</>}
            </AccordionListItem>
        </>
    );
};

/* ----------------------------- Main Component ----------------------------- */
const CharacterGenPage = () => {
    const {
        amount,
        minAge,
        maxAge,
        statRoll,
        advStatSettings,
        statsRange,
        characters,
        setCharacters,
    } = useGenSettings();

    const createGenForms = useCallback(
        (charList: typeof characters) => {
            let forms: JSX.Element[] = [];
            for (let ind = 0; ind < amount; ind++) {
                forms.push(
                    <CharacterAccordionItem
                        minAge={minAge}
                        maxAge={maxAge}
                        statRoll={statRoll}
                        statRange={statsRange}
                        id={`char${ind}`}
                        key={`charAccord${ind}`}
                        index={ind}
                        value={charList[ind]}
                        onChange={(i, char) => {
                            const cA = characters;
                            if (cA[i]) {
                                cA.splice(i, 1, char);
                            } else {
                                cA.push(char);
                            }
                            setCharacters(cA);
                        }}
                    />
                );
            }

            return forms;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            amount,
            characters,
            maxAge,
            minAge,
            setCharacters,
            statRoll,
            statsRange,
            advStatSettings,
        ]
    );

    const [genForms, setGenForms] = useState(createGenForms(characters));

    useEffect(() => {
        const cA = characters;

        // If we have more characters stored than viewable amount, remove extras
        if (cA.length > amount - 1) {
            cA.splice(amount - 1);
            setCharacters(cA);
        }
        // Rerender character gen forms
        setGenForms(createGenForms(cA));
    }, [
        amount,
        characters,
        createGenForms,
        setCharacters,
        statRoll,
        statsRange,
    ]);

    return (
        <>
            <CharacterGenSettings />
            <Card
                css={{
                    backgroundColor: "transparent",
                    padding: "0",
                }}
            >
                <Accordion type="multiple">{genForms}</Accordion>
            </Card>
        </>
    );
};

const CharacterGenPageWrapper = () => (
    <GenSettingsContextProvider>
        <CharacterGenPage />
    </GenSettingsContextProvider>
);

export default CharacterGenPageWrapper;
