import { useContext, useMemo, useReducer, useState } from "react";
import Roll from "roll";
import CharacterContext, {
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
        statRange,
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
    const rollStats = useMemo(
        () => (input: string) => {
            const a: (ReturnType<typeof roll.roll> | number)[] = [];
            StatNames.forEach((_, i) => {
                // If statRange exists then we are using adv stat settings,
                // get random int from the range. else, roll.
                const val = statRange
                    ? randomInt(statRange.min[i], statRange.max[i])
                    : roll.roll(input);
                a.push(val);
            });

            return a;
        },
        [statRange]
    );

    // ? Passed to state instead of setStats directly for components to reroll stats
    const rerollStats = useMemo(
        () => () => setStats(rollStats(statRoll)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [statRoll]
    );
    const [stats, setStats] = useState<ReturnType<typeof rollStats> | number[]>(
        () => value?.stats ?? rollStats(statRoll)
    );

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
                // Create object filled with [(stat name)] = number
                // then unpack it, so `char["Dexterity"]: number`
                ...(() => {
                    let o: { [k: string]: number } = {};
                    stats.forEach((v, i) => {
                        // If is RollOutput (adv settings turned off)
                        if (typeof v === "object") o[StatNames[i]] = v.result;
                        // adv settings turned on (rand# from parent stats range)
                        else o[StatNames[i]] = v;
                    });
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
            rerollStats,
            name,
            dispatchName,
            char,
        }),
        [age, background, char, name, rerollStats, sex, stats]
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
export default CharacterContextProvider;

/* ------------------------------ Custom Hooks ------------------------------ */
const HookError = (name: string) =>
    new Error(`${name} must be used within a CharacterProvider!`);

export const useCharName = () => {
    const context = useContext(CharacterContext);
    if (!context) throw HookError("useCharName");

    const { name, dispatchName } = context;
    const genMethods = (pl?: Sex | string) => ({
        full: () => dispatchName({ type: "full", payload: pl }),
        first: () => dispatchName({ type: "first", payload: pl }),
        last: () => dispatchName({ type: "last", payload: pl }),
        seed: (sex: Sex) =>
            dispatchName({
                type: "set",
                payload: {
                    firstName: name.firstName,
                    lastName: name.lastName,
                    gen: genName(sex),
                },
            }),
    });

    return [name, genMethods] as const;
};

export const useCharacter = () => {
    const context = useContext(CharacterContext);
    if (!context) throw HookError("useCharacter");

    return context;
};
