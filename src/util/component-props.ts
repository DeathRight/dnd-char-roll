import * as RadioGroupP from '@radix-ui/react-radio-group';
import React, { AriaAttributes } from 'react';

import { Sex } from '.';

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

export interface NameInputProps {
  gen: () => string;
  regen?: number;
  onChange?: (value: string) => void;
  htmlFor: string;
  text: string;
}

export interface NameGenInputProps {
  sex?: Sex;
  onFirstChange?: (name: string) => void;
  onLastChange?: (name: string) => void;
  regen?: number;
}
/* ------------------------------------ * ----------------------------------- */

export interface TooltipProps extends AppProps {
  text: string;
}
