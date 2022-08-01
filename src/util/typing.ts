import { Dispatch, SetStateAction } from "react";

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
export type Constize<
    T extends [any, any],
    S extends string,
    SS extends string
> = {
    [N in S]: NonNullable<T[0]>;
} & { [M in SS]: NonNullable<T[1]> };

/**
 * Shorthand typing for useState returns
 */
export type Stateful<T> = [T, Dispatch<SetStateAction<T>>];
