import { createContext, Dispatch, SetStateAction } from "react";
import Roll from "roll";

import { genName, properNoun, Sex } from "../util";
import backgrounds from "../util/backgrounds";
import { Character } from "../util/component-props";

export namespace NameReducer {
    type Actions = "first" | "last" | "full" | "set";
    export type State = {
        firstName: string;
        lastName: string;
        gen: ReturnType<typeof genName>;
    };
    export type Action = { type: Actions; payload?: Sex | State };
    export type Dispatch = (action: Action) => void;

    export const reducer = (state: State, action: Action): State => {
        let { gen } = state;
        switch (action.type) {
            case "full": {
                if (action.payload && typeof action.payload === "number")
                    gen = genName(action.payload);
                return {
                    firstName: properNoun(gen.first()),
                    lastName: properNoun(gen.last()),
                    gen: gen,
                };
            }
            case "first": {
                return { ...state, firstName: properNoun(gen.first()) };
            }
            case "last": {
                return { ...state, lastName: properNoun(gen.last()) };
            }
            case "set": {
                if (action.payload && typeof action.payload === "object")
                    return action.payload;
                else {
                    console.warn(
                        "Attempted to dispatch 'set' on name reducer without payload being an object!"
                    );
                    return state;
                }
            }
        }
    };
}

/**
 * Typing equivalent for `const [S, SS] = T` as an object
 *
 * **Example**:
 *
 * `Constize<[0, 1], "first", "second">`
 *
 * results in:
 *
 * `{first: number, second: number}`
 */
type Constize<T extends [any, any], S extends string, SS extends string> = {
    [N in S]: NonNullable<T[0]>;
} & { [M in SS]: NonNullable<T[1]> };
type Stateful<T> = [T, Dispatch<SetStateAction<T>>];
/* ------------------------------------ * ----------------------------------- */
type SexState = Constize<Stateful<Sex>, "sex", "setSex">;
type AgeState = Constize<Stateful<number>, "age", "setAge">;
type BgState = Constize<
    Stateful<typeof backgrounds[number]>,
    "background",
    "setBackground"
>;
type StatsState = Constize<
    Stateful<ReturnType<Roll["roll"]>[]>,
    "stats",
    "setStats"
>;

export type State = SexState &
    AgeState &
    BgState &
    StatsState & {
        name: NameReducer.State;
        dispatchName: NameReducer.Dispatch;
    } & { char: Character };

export const CharacterContext = createContext<State | undefined>(undefined);
export const CharacterProvider = CharacterContext.Provider;
export default CharacterContext;
