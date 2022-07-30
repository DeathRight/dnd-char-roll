import { createContext, Dispatch, SetStateAction } from "react";
import { Character } from "../util/component-props";
import { Constize, Stateful } from "../util/typing";

type AmountState = Constize<Stateful<number>, "amount", "setAmount">;

type MinAgeState = Constize<Stateful<number>, "minAge", "setMinAge">;
type MaxAgeState = Constize<Stateful<number>, "maxAge", "setMaxAge">;
//--
type StatRollState = Constize<Stateful<string>, "statRoll", "setStatRoll">;
type AdvStatSettingsState = Constize<
    Stateful<boolean>,
    "advStatSettings",
    "setAdvStatSettings"
>;

export type parentStatsArray = [number, number, number, number, number, number];

type ParentAStatsState = {
    parentAStats: parentStatsArray | undefined;
    setParentAStats: Dispatch<SetStateAction<parentStatsArray | undefined>>;
};
type ParentBStatsState = {
    parentBStats: parentStatsArray | undefined;
    setParentBStats: Dispatch<SetStateAction<parentStatsArray | undefined>>;
};
//--
type CharactersState = Constize<
    Stateful<(Character | undefined)[]>,
    "characters",
    "setCharacters"
>;

/* --------------------------------- Exports -------------------------------- */
export type State = CharactersState &
    AmountState &
    MinAgeState &
    MaxAgeState &
    //
    StatRollState &
    AdvStatSettingsState &
    ParentAStatsState &
    ParentBStatsState & {
        statsRange:
            | { min: parentStatsArray; max: parentStatsArray }
            | undefined;
    };

export const SettingsContext = createContext<State | undefined>(undefined);
export const SettingsProvider = SettingsContext.Provider;
export default SettingsContext;
