import * as RadioGroupP from "@radix-ui/react-radio-group";
import * as CheckboxP from "@radix-ui/react-checkbox";
import * as DialogP from "@radix-ui/react-dialog";
import React, { AriaAttributes } from "react";
import Roll from "roll";

import { Sex } from ".";
import { parentStatsArray, statsRangeObj } from "../contexts/settings-context";
import backgrounds from "./backgrounds";

export type StyledPrimitive =
    | keyof JSX.IntrinsicElements
    | React.ComponentType<any>;

/**
 * List of props specific to the component. Used to omit non-generic props for use in property spreading to children
 */
export type PropsSpecific = { [key: string]: boolean };
/* -------------------------------- Primitive ------------------------------- */
export interface AppProps {
    children?: React.ReactNode | React.ReactNode[];
}
export interface PrimitiveProps extends AriaAttributes {
    children?: React.ReactNode | React.ReactNode[];
    className?: string;
    asChild?: boolean;
    as?: StyledPrimitive;
    width?: string;
    height?: string;
    size?: string;
    bgColor?: string;
    fontSize?: string;
    color?: string;
}
export const PrimitivePropsSpecific: PropsSpecific = {
    children: true,
    className: true,
    as: true,
};
/* ------------------------------------ * ----------------------------------- */
export interface SpinnerProps extends Omit<PrimitiveProps, "children"> {
    color?: string;
    size?: string;
}

export interface ToggleButtonProps extends PrimitiveProps {
    defaultPressed?: boolean;
    onPressed?: (pressed: boolean) => void;
    contentOn?: JSX.Element;
    contentOff?: JSX.Element;
    ariaLabel?: string;
}

export interface ToggleThemeButtonProps {
    defaultPressed?: boolean;
    onPressed?: (pressed: boolean) => void;
}
/* ------------------------------- IconButton ------------------------------- */
export interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
    leftIcon?: StyledPrimitive;
    rightIcon?: StyledPrimitive;
    icon?: StyledPrimitive;
    text?: string;
    tooltip?: string;
}
export const IconButtonPropsSpecific: PropsSpecific = {
    leftIcon: true,
    rightIcon: true,
    icon: true,
    text: true,
};
/* --------------------------------- Dialog --------------------------------- */
export interface DialogMenuProps extends DialogP.DialogProps {
    title?: string;
    description?: string;
}
/* ------------------------------- RadioGroup ------------------------------- */
export interface RadioGroupItemProps extends RadioGroupP.RadioGroupItemProps {
    label?: string;
    indicatorProps?: Omit<RadioGroupP.RadioGroupIndicatorProps, "children">;
}
/* -------------------------------- Checkbox -------------------------------- */
export interface CheckboxProps extends CheckboxP.CheckboxProps {
    label?: string;
    indicatorProps?: Omit<CheckboxP.CheckboxIndicatorProps, "children">;
}
/* --------------------------------- Inputs --------------------------------- */
export interface SignInFormProps {
    status: "loading" | "error" | "success";
}

export interface CopyableInputProps extends React.HTMLProps<HTMLInputElement> {
    /**
     * Descriptor to be used in the Copy Button's aria-label
     */
    tag?: string;
}

export interface TextInputProps extends CopyableInputProps {
    label?: string;
}

export interface CopyableTextAreaProps
    extends React.HTMLProps<HTMLTextAreaElement> {
    tag?: string;
}

export interface NumberInputProps
    extends Omit<React.HTMLProps<HTMLInputElement>, "onChange" | "onBlur"> {
    htmlFor?: string;
    text?: string;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
    onBlur?: (value: number) => void;
}

export interface NameInputProps {
    onChange?: (value: string) => void;
    onClick?: () => void;
    htmlFor?: string;
    value?: string;
    shown?: boolean;
    text: string;
}

export interface NameGenInputProps {
    shown?: boolean;
}

export interface SaveToCSVProps {
    headers: DnDListItem[];
}
/* ------------------------ CharacterContextProvider ------------------------ */
export interface CharacterContextProviderProps extends AppProps {
    /**
     * default: 1
     */
    minAge?: number;
    /**
     * default: 60
     */
    maxAge?: number;
    /**
     * default: '4d6b3'. (Roll 4 d6 and drop lowest)
     */
    statRoll?: string;
    /**
     * default: undefined
     */
    statRange?: statsRangeObj;
    /**
     * `Character` object value. To be used along with `onChange` in form
     */
    value?: Character;
}
/* ------------------------- SettingsContextProvider ------------------------ */
export interface SettingsContextProviderProps
    extends AppProps,
        Omit<CharacterContextProviderProps, "value"> {
    /**
     * default: 1
     */
    amount?: number;
    /**
     * default: false
     */
    advStatSettings?: boolean;
    /**
     * default: undefined
     */
    parentAStats?: parentStatsArray;
    /**
     * default: undefined
     */
    parentBStats?: parentStatsArray;
    /**
     * `Characters` array of `Character` objects, used only in case of importing (not yet supported. is there a reason to?)
     */
    value?: (Character | undefined)[];
}
/* ------------------------------------ * ----------------------------------- */
/* ---------------------------------- Forms --------------------------------- */
export const StatNames = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Wisdom",
    "Intelligence",
    "Charisma",
] as const;
export type Character = {
    [k in typeof StatNames[number]]: number;
} & {
    sex: Sex;
    age: number;
    firstName: string;
    lastName: string;
    background: typeof backgrounds[number];
    stats: ReturnType<Roll["roll"]>[] | number[];
};
export interface CharacterGenFormProps
    extends AriaAttributes,
        Omit<CharacterContextProviderProps, "value" | "statRoll"> {
    /**
     * Called on initial generation, then every regeneration
     */
    onChange?: (char: Character) => void;
    /**
     * Whether form is shown
     * default: true
     */
    shown?: boolean;
}

export interface CharacterGenPageSettings {
    onChange: (state: {
        amount: number;
        minAge: number;
        maxAge: number;
        statRoll: string;
    }) => void;
}

/* ------------------------------------ * ----------------------------------- */

export interface TooltipProps extends AppProps {
    text: string;
}

export type DnDListItem = { key: string; label: string };
export interface HeaderDnDListProps {
    /**
     * The initial list. This should not change.
     */
    list: DnDListItem[];
    onChange?: (list: DnDListItem[]) => void;
}
