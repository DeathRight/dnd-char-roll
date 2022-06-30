import * as RadioGroupP from '@radix-ui/react-radio-group';
import React, { AriaAttributes } from 'react';
import Roll from 'roll';

import { Sex } from '.';
import backgrounds from './backgrounds';

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
export interface DialogProps extends PrimitiveProps {
    show: boolean;
    onHide: () => void;
}
export const DialogPropsSpecific: PropsSpecific = {
    ...PrimitivePropsSpecific,
    show: true,
    onHide: true,
};
/* ------------------------------- RadioGroup ------------------------------- */
export interface RadioGroupItemProps extends RadioGroupP.RadioGroupItemProps {
    label?: string;
    indicatorProps?: Omit<RadioGroupP.RadioGroupIndicatorProps, "children">;
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

export interface CopyableTextAreaProps
    extends React.HTMLProps<HTMLTextAreaElement> {
    tag?: string;
}

export interface NumberInputProps
    extends Omit<React.HTMLProps<HTMLInputElement>, "onChange"> {
    htmlFor?: string;
    text?: string;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
}

export interface NameInputProps {
    gen: () => string;
    regen?: number;
    onChange?: (value: string) => void;
    htmlFor?: string;
    value?: string;
    shown?: boolean;
    text: string;
}

export interface NameGenInputProps {
    sex?: Sex;
    onFirstChange?: (name: string) => void;
    onLastChange?: (name: string) => void;
    regen?: number;
    firstValue?: string;
    lastValue?: string;
    shown?: boolean;
}
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
    stats: ReturnType<Roll["roll"]>[];
};
export interface CharacterGenFormProps extends AriaAttributes {
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
     * Whether form is shown
     * default: true
     */
    shown?: boolean;
    /**
     * `Character` object value. To be used along with `onChange`
     */
    value?: Character;
    /**
     * Called on initial generation, then every regeneration
     */
    onChange?: (char: Character) => void;
}

/* ------------------------------------ * ----------------------------------- */

export interface TooltipProps extends AppProps {
    text: string;
}
