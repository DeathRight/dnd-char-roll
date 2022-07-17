import { useMemo, useReducer, useState } from "react";
import Roll from "roll";
import {
    CharacterProvider,
    NameReducer,
    State,
} from "../../contexts/character-context";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { genName, properNoun, Sex } from "../../util";
import backgrounds from "../../util/backgrounds";
import {
    Character,
    CharacterContextProviderProps,
    StatNames,
} from "../../util/component-props";

const roll = new Roll();

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const randomInt = (a = 1, b = 0) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const CharacterContextProvider = (
    props: CharacterContextProviderProps
) => {
    const {
        minAge = 1,
        maxAge = 60,
        statRoll = "4d6b3",
        value,
        children,
    } = props;

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

    /* ---------------------------------- Names --------------------------------- */
    const [gName] = useState(() => genName(sex));
    const [name, dispatchName] = useReducer(NameReducer.reducer, {
        firstName: value?.firstName ?? properNoun(gName.first()),
        lastName: value?.lastName ?? properNoun(gName.last()),
        gen: gName,
    });

    /* -------------------------------- Character ------------------------------- */
    const char = useMemo(
        () =>
            ({
                sex: sex,
                age: age,
                firstName: name.firstName,
                lastName: name.lastName,
                background: background,
                stats: stats,
                ...(() => {
                    let o: { [k: string]: number } = {};
                    stats.forEach((v, i) => (o[StatNames[i]] = v.result));
                    return o;
                })(),
            } as Character),
        [sex, age, name, stats, background]
    );
    //const json = useMemo(() => JSON.stringify(char, null, " "), [char]);

    /* --------------------------------- Render --------------------------------- */
    const state: State = useMemo(
        () => ({
            sex,
            setSex,
            age,
            setAge,
            background,
            setBackground,
            stats,
            setStats,
            name,
            dispatchName,
            char,
        }),
        [age, background, char, name, sex, stats]
    );

    useUpdateEffect(() => {
        if (value && value !== char) {
            setSex(value.sex);
            setAge(value.age);
            setBackground(value.background);
            setStats(value.stats);
            dispatchName({
                type: "set",
                payload: {
                    firstName: value.firstName,
                    lastName: value.lastName,
                    gen: genName(value.sex),
                },
            });
        }
    }, [value]);

    return <CharacterProvider value={state}>{children}</CharacterProvider>;
};
