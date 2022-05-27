/* eslint-disable no-return-assign */
/* ------------------ Scale Step Automation and Consistency ----------------- */
export interface PrimaryScaleSteps {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string;
  p7: string;
  p8: string;
  p9: string;
  p10: string;
  p11: string;
  p12: string;
}

export interface AccentScaleSteps {
  a1: string;
  a2: string;
  a3: string;
  a4: string;
  a5: string;
  a6: string;
  a7: string;
  a8: string;
  a9: string;
  a10: string;
  a11: string;
  a12: string;
}

/**
 * Simply a representation of Stitches' color scale steps with the original scale name prefix replaced with `p` (primary) or `a` (accent)
 */
export type ScaleSteps = PrimaryScaleSteps | AccentScaleSteps;

/**
 * Replaces an original Stitches scale step prefix (e.g.: mauve1 to `prefix`1). Used for token consistency across themes
 * @param from Stitches color scale object
 * @param prefix (Default: '') Prefix to replace scale steps original prefix
 * @returns
 */
export const replacePrefixFromSteps = (
  from: Record<string, any>,
  prefix = ""
): ScaleSteps => {
  let to = {};
  Object.entries(from).forEach(
    ([k, v]) =>
      (to = {
        ...to,
        [`${prefix}${k.replace(/\D/g, "")}`]: v,
      })
  );
  return to as ScaleSteps;
};
