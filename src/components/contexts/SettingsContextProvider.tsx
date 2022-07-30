import { useContext, useMemo, useState } from "react";
import SettingsContext, {
    SettingsProvider,
    State,
} from "../../contexts/settings-context";
import {
    SettingsContextProviderProps,
    StatNames,
} from "../../util/component-props";

// Store stats array to save on compute time
// ? `forEach` used instead of `for ... i < 6` for modular consistency
const baseStatsArray = Array.from(StatNames);

export const SettingsContextProvider = (
    props: SettingsContextProviderProps
) => {
    const {
        minAge: _minAge = 1,
        maxAge: _maxAge = 60,
        statRoll: _statRoll = "4d6b3",
        value = [] as NonNullable<SettingsContextProviderProps["value"]>,
        children,
        // Provider specific
        amount: _amount = 1,
        advStatSettings: _advStatSettings = false,
        parentAStats: _parentAStats,
        parentBStats: _parentBStats,
    } = props;

    const [amount, setAmount] = useState(_amount);
    const [minAge, setMinAge] = useState(_minAge);
    const [maxAge, setMaxAge] = useState(_maxAge);
    const [characters, setCharacters] = useState(value);
    /* -------------------------- Stats Settings State -------------------------- */
    const [statRoll, setStatRoll] = useState(_statRoll);
    // v-- whether advanced stat settings are active
    const [advStatSettings, setAdvStatSettings] = useState(_advStatSettings);
    const [parentAStats, setParentAStats] = useState(_parentAStats);
    const [parentBStats, setParentBStats] = useState(_parentBStats);
    const statsRange = useMemo(() => {
        if (advStatSettings && parentAStats && parentBStats) {
            // Only compute if advanced settings are available
            const A = parentAStats!;
            const B = parentBStats!;

            let range = { min: [] as number[], max: [] as number[] };
            baseStatsArray.forEach((v, i) => {
                const compare = [A[i], B[i]];
                const min = Math.min(...compare);
                const max = Math.max(...compare);
                range.min[i] = min;
                range.max[i] = max;
            });

            // ? Force type because we are certain
            return range as State["statsRange"];
        } else return undefined;
    }, [advStatSettings, parentAStats, parentBStats]);

    /* --------------------------------- Render --------------------------------- */
    const state: State = useMemo(
        () => ({
            amount,
            setAmount,
            minAge,
            setMinAge,
            maxAge,
            setMaxAge,
            characters,
            setCharacters,
            statRoll,
            setStatRoll,
            advStatSettings,
            setAdvStatSettings,
            parentAStats,
            setParentAStats,
            parentBStats,
            setParentBStats,
            statsRange,
        }),
        [
            advStatSettings,
            amount,
            characters,
            maxAge,
            minAge,
            parentAStats,
            parentBStats,
            statRoll,
            statsRange,
        ]
    );

    return <SettingsProvider value={state}>{children}</SettingsProvider>;
};

export default SettingsContextProvider;

export const useGenSettings = () => {
    const context = useContext(SettingsContext);
    if (!context)
        throw new Error(
            "useGenSettings must be used within a SettingsProvider!"
        );

    return context;
};
