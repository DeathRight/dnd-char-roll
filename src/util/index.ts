import { genUntilPass, nameFem, nameMas, nameSur } from './nameGen';

export function properNoun(s: string) {
  const first = s.slice(0, 1);
  return `${first.toUpperCase()}${s.slice(1, s.length + 1)}`;
}
export function properNounAll(s: string) {
  const split = s.split(" ");
  const names: string[] = [];
  split.forEach((v, i) => {
    names[i] = properNoun(v);
  });
  return names.toString().replaceAll(",", " ");
}

export enum Sex {
  Male,
  Female,
}

export const genName = (type: Sex) => {
  const i = Math.random() * 17;
  const cb = () =>
    type === Sex.Female ? genUntilPass(nameFem, i) : genUntilPass(nameMas, i);
  return {
    first: () => cb(),
    last: () => genUntilPass(nameSur, i),
  };
};

export * from "./nameGen";
export * from "./swears";
