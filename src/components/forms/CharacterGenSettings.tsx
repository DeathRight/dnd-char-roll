import { useState, useEffect } from "react";
import Roll from "roll";
import { properNoun } from "../../util";
import { StatNames, DnDListItem } from "../../util/component-props";
import { Accordion, AccordionListItem } from "../common/Accordion";
import Button from "../common/Button";
import Card from "../common/Card";
import Center from "../common/Center";
import CheckboxInput from "../common/Checkbox";
import Divider from "../common/Divider";
import Flex from "../common/Flex";
import { useGenSettings } from "../contexts/SettingsContextProvider";
import HeaderDnDList from "../HeaderDnDList";
import NumberInput from "../inputs/NumberInput";
import SaveCharsToCSV from "../inputs/SaveCharsToCSV";
import TextInput from "../inputs/TextInput";

const roll = new Roll();

const CharacterGenSettings = () => {
    //const { onChange } = props;
    const ctx = useGenSettings();

    const [amount, setAmount] = useState(ctx.amount);
    const [minAge, setMinAge] = useState(ctx.minAge);
    const [maxAge, setMaxAge] = useState(ctx.maxAge);
    /* ------------------------------ Stat Settings ----------------------------- */
    const [statRoll, setStatRoll] = useState(ctx.statRoll);
    const [advStatSettings, setAdvStatSettings] = useState(ctx.advStatSettings);
    const [parentAStats, setParentAStats] = useState(ctx.parentAStats);
    const [parentBStats, setParentBStats] = useState(ctx.parentBStats);
    /* ------------------------------- CSV Headers ------------------------------ */
    const headersFlatInit = [
        "sex",
        "age",
        "firstName",
        "lastName",
        "background",
        ...StatNames,
    ];
    const [headers, setHeaders] = useState<DnDListItem[]>(
        headersFlatInit.map((v) => ({ key: v, label: properNoun(v) }))
    );
    /* ---------------------------------- Chars --------------------------------- */
    const [characters, setCharacters] = useState(ctx.characters);
    useEffect(() => {
        if (ctx.characters !== characters)
            setCharacters(Array.from(ctx.characters));
    }, [ctx.characters, characters]);
    /* --------------------------------- Render --------------------------------- */
    const [rollValue, setRollValue] = useState(statRoll);
    const onSubmit = () => {
        //onChange({ amount, minAge, maxAge, statRoll });
        ctx.setAmount(amount);
        ctx.setMinAge(minAge);
        ctx.setMaxAge(maxAge);
        ctx.setStatRoll(statRoll);
        ctx.setAdvStatSettings(advStatSettings);
        ctx.setParentAStats(parentAStats);
        ctx.setParentBStats(parentBStats);
    };

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
                <Accordion style={{ width: "100%" }} type="multiple">
                    <AccordionListItem title="Biology">
                        <Center>
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
                        </Center>
                    </AccordionListItem>
                    <AccordionListItem title="Stats">
                        <Center>
                            <TextInput
                                label={"Roll Command"}
                                value={rollValue}
                                onChange={(e) =>
                                    setRollValue(e.currentTarget.value)
                                }
                                onBlur={(e) => {
                                    const v = e.currentTarget.value;
                                    if (roll.validate(v)) {
                                        setStatRoll(v);
                                        setRollValue(v);
                                    } else {
                                        alert(
                                            `"${v}" is not a valid roll command!`
                                        );
                                        setRollValue(statRoll);
                                    }
                                }}
                            />
                            <CheckboxInput
                                label={"Enable Advanced Settings"}
                                checked={advStatSettings}
                                onCheckedChange={(c) =>
                                    setAdvStatSettings(
                                        c === true ? true : false
                                    )
                                }
                            />
                            {advStatSettings && <>hey ;^)</>}
                        </Center>
                    </AccordionListItem>
                </Accordion>
                <Button onClick={() => onSubmit()}>Submit</Button>
            </Card>
            <Card style={{ maxWidth: "90%" }}>
                <h2>CSV</h2>
                <Divider label={"Headers Order"} />
                <HeaderDnDList list={headers} onChange={(l) => setHeaders(l)} />
                <Divider label={"Export"} />
                <SaveCharsToCSV headers={headers} />
            </Card>
        </>
    );
};

export default CharacterGenSettings;
