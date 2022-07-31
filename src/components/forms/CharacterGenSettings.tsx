import { useState, useEffect } from "react";
import { properNoun } from "../../util";
import { StatNames, DnDListItem } from "../../util/component-props";
import Button from "../common/Button";
import Card from "../common/Card";
import CheckboxInput from "../common/Checkbox";
import Divider from "../common/Divider";
import { useGenSettings } from "../contexts/SettingsContextProvider";
import HeaderDnDList from "../HeaderDnDList";
import NumberInput from "../inputs/NumberInput";
import SaveCharsToCSV from "../inputs/SaveCharsToCSV";
import TextInput from "../inputs/TextInput";

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
                <Divider label={"Stats"} />
                <TextInput
                    label={"Roll Command"}
                    value={statRoll}
                    onChange={(e) => setStatRoll(e.currentTarget.value)}
                />
                <CheckboxInput
                    label={"Enable Advanced Settings"}
                    checked={advStatSettings}
                    onCheckedChange={(c) =>
                        setAdvStatSettings(c === true ? true : false)
                    }
                />
                {advStatSettings && <>hey ;^)</>}
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
