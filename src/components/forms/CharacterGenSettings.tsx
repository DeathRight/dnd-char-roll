import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import {
    CheckCircledIcon,
    PersonIcon,
    UpdateIcon,
} from "@radix-ui/react-icons";
import { useState, useEffect, useMemo } from "react";
import Roll from "roll";
import { styled } from "../../stitches.config";
import { properNoun } from "../../util";
import { StatNames, DnDListItem } from "../../util/component-props";
import { Accordion, AccordionListItem } from "../common/Accordion";
import Button from "../common/Button";
import Card from "../common/Card";
import Center from "../common/Center";
import CheckboxInput from "../common/Checkbox";
import Divider from "../common/Divider";
import { useGenSettings } from "../contexts/SettingsContextProvider";
import { useTheme } from "../contexts/ThemeContextProvider";
import Dialog from "../Dialog";
import HeaderDnDList from "../HeaderDnDList";
import IconButton from "../IconButton";
import NumberInput from "../inputs/NumberInput";
import SaveCharsToCSV from "../inputs/SaveCharsToCSV";
import TextInput from "../inputs/TextInput";
import ParentStatsForm from "./ParentStatsForm";

const roll = new Roll();

const CharacterGenSettings = () => {
    //const { onChange } = props;
    const ctx = useGenSettings();
    const theme = useTheme();

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

    const dlgDesc =
        "Stats inputted here will be used along with the other parents' stats as a range to generate each character's stats from, instead of the normal roll command.\n\nNote: Parents' stats only active if 'Advanced Settings' is checked.";
    const SaveChangesBtn = styled(IconButton, {
        backgroundColor: "$success",
        color: "$successLoC",
        borderColor: "transparent",
        "&:hover": { backgroundColor: "$successHover" },
        "&:active": { backgroundColor: "$successSelect" },
        "&:focus": { boxShadow: `0 0 0 2px ${theme.colors.successSelect}` },
    });

    const Dialogs = useMemo(
        () => (
            <>
                <Dialog
                    title="Edit 1st Parent"
                    description={dlgDesc}
                    key={"pEdA"}
                >
                    <DialogTrigger asChild>
                        <IconButton
                            disabled={!advStatSettings}
                            leftIcon={PersonIcon}
                            text={"Edit 1st Parent"}
                            key={"pEdA-btn"}
                        />
                    </DialogTrigger>
                    <ParentStatsForm
                        stats={parentAStats}
                        onChange={(v) => setParentAStats(v)}
                        key={"pSFA"}
                    />
                    <DialogClose asChild>
                        <SaveChangesBtn
                            leftIcon={CheckCircledIcon}
                            text={"Save Changes"}
                            key={"pEdA-save"}
                        />
                    </DialogClose>
                </Dialog>
                <Dialog
                    title="Edit 2nd Parent"
                    description={dlgDesc}
                    key={"pEdB"}
                >
                    <DialogTrigger asChild>
                        <IconButton
                            disabled={!advStatSettings}
                            leftIcon={PersonIcon}
                            text={"Edit 2nd Parent"}
                            key={"pEdB-btn"}
                        />
                    </DialogTrigger>
                    <ParentStatsForm
                        stats={parentBStats}
                        onChange={(v) => setParentBStats(v)}
                        key={"pSFB"}
                    />
                    <DialogClose asChild>
                        <SaveChangesBtn
                            leftIcon={CheckCircledIcon}
                            text={"Save Changes"}
                            key={"pEdB-save"}
                        />
                    </DialogClose>
                </Dialog>
            </>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [advStatSettings, parentAStats, parentBStats]
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
                <Accordion
                    style={{ width: "100%" }}
                    type="multiple"
                    key={"accStngs"}
                >
                    <AccordionListItem title="Biology" key={"accBio"}>
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
                    <AccordionListItem title="Stats" key={"accStats"}>
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
                                onCheckedChange={(c) => {
                                    const checked = c === true ? true : false;
                                    if (checked) {
                                        if (!parentAStats)
                                            setParentAStats([0, 0, 0, 0, 0, 0]);
                                        if (!parentBStats)
                                            setParentBStats([0, 0, 0, 0, 0, 0]);
                                    }
                                    setAdvStatSettings(checked);
                                }}
                            />
                            {Dialogs}
                        </Center>
                    </AccordionListItem>
                </Accordion>
                <Button onClick={() => onSubmit()}>Submit</Button>
                <IconButton
                    icon={UpdateIcon}
                    aria-label={"Regenerate All Characters"}
                    tooltip={"Regenerate All Characters"}
                    onClick={(e) => {
                        ctx.setCharacters([]);
                        ctx.setId(Math.floor(Math.random() * 100).toString());
                    }}
                />
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
