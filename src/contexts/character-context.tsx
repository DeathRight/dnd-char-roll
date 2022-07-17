import { createContext, useState } from 'react';
import Roll from 'roll';

import { genName, properNoun, Sex } from '../util';
import backgrounds from '../util/backgrounds';
import { Character } from '../util/component-props';

export namespace NameReducer {
    type Actions = "first" | "last" | "full";
    export type Action = { type: Actions; payload?: Sex };
    export type Dispatch = (action: Action) => void;
    export type State = {
        firstName: string;
        lastName: string;
        gen: ReturnType<typeof genName>;
    };

    export const reducer = (state: State, action: Action): State => {
        let { gen } = state;
        switch (action.type) {
            case "full": {
                if (action.payload) gen = genName(action.payload);
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
type Constize<T extends [any, any], S extends string, SS extends string> = { [N in S]: NonNullable<T[0]> } & { [M in SS]: NonNullable<T[1]> };
type Stateful<T> = ReturnType<typeof useState<T>>;
/* ------------------------------------ * ----------------------------------- */
type SexState = Constize<Stateful<Sex>, "sex", "setSex">;
type AgeState = Constize<Stateful<number>, "age", "setAge">;
type BgState = Constize<Stateful<typeof backgrounds[number]>, "background", "setBackground">
type StatsState = Constize<Stateful<ReturnType<Roll["roll"]>[]>, "stats", "setStats">

type State = SexState & AgeState & BgState & StatsState & {name: NameReducer.State, dispatch: NameReducer.Dispatch} & {char: Character}

export const CharacterContext = createContext<State | undefined>(undefined);
export const CharacterProvider = CharacterContext.Provider;
export default CharacterContext;
