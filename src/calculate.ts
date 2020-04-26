import lodash, { uniqWith, isEqual } from 'lodash';

type Result = { x: number, y: number, c1: number, c2: number, c3: number };
type Calculator = (c1: number, c2: number, c3: number) => Array<Result>;

export const intOrEmpty = (value: string) => value === '' ? value : parseInt(value);

export const calculate: Calculator = (c1, c2, c3) => {
  const xMax = Math.floor(c3 / c1);
  const results = [];

  for (let x = 3; x <= xMax; x++) {
    let y = c3 / c2 - (c1 / c2) * x;
    if (Number.isInteger(y) && y > 2) {
      results.push({
        x,
        y,
        c1,
        c2,
        c3
      });
    }
  }
  return results;
};

export const getAllMultipliers = (multipliers: Array<number>, bonus: number) => {
  const bonusMultipliers = multipliers.map(mult => mult + bonus);
  return lodash([...multipliers, ...bonusMultipliers])
    .sortBy()
    .uniq()
    .value()
};

export const calculateAll = (multipliers: Array<number>, target: number) => {
  const allResults = [];
  for (let first = 0; first < multipliers.length - 1; first++) {
    for (let second = first; second < multipliers.length; second++) {
      const c1 = multipliers[first];
      const c2 = multipliers[second];
      console.log('c1', c1, 'c2', c2);
      allResults.push(...calculate(c1, c2, target));
    }
  }
  return uniqWith(allResults, isEqual);
};
export type CalcResults = ReturnType<typeof calculateAll>;
