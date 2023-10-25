import { unique, sort } from 'radash';
import BigNumber from 'bignumber.js';
import { PointsRows } from './Clanquest/Clanquest';

type Result = { x: number, y: number | null, c1: number, c2: number | null, c3: number };
type Calculator = (c1: number, c2: number, c3: number) => Array<Result>;

export const intOrEmpty = (value: string) => value === '' ? value : parseInt(value);

export const calculate: Calculator = (c1, c2, c3) => {
  if (c1 === 0) { return [] }
  if (c2 === 0) { return [] }

  const bigC1 = new BigNumber(c1);
  const bigC2 = new BigNumber(c2);
  const bigC3 = new BigNumber(c3);
  const xMax = Math.floor(c3 / c1);
  const results = [];

  for (let x = 3; x <= xMax; x++) {
    let y = (bigC3.div(bigC2)).minus((bigC1.div(bigC2)).times(new BigNumber(x))).toNumber();
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

export const calculateSingular = (c1: number, c3: number) => {
  if (c1 === 0) { return null }
  const result = (new BigNumber(c3)).div(new BigNumber(c1)).toNumber();
  return Number.isInteger(result) ? result : null;
};

export const getAllMultipliers = (multipliers: Array<number>, bonus: number) => {
  const bonusMultipliers = multipliers.map(mult => mult + bonus);
  const sorted =  sort([...multipliers, ...bonusMultipliers], mult => mult);
  return unique(sorted);
};

export const calculateAll = (multipliers: Array<number>, gained: number, target: number) => {
  const singularResults = [];
  const targetAdjusted = target - gained;
  for(let multIndex = 0; multIndex < multipliers.length; multIndex++) {
    const mult = multipliers[multIndex];
    const singular = calculateSingular(mult, targetAdjusted);
    if (singular !== null) { singularResults.push({ x: singular, y: null, c1: mult, c2: null, c3: targetAdjusted } as Result) }
  }

  const doubleResults = [];
  for (let first = 0; first < multipliers.length - 1; first++) {
    const c1 = multipliers[first];
    for (let second = first + 1; second < multipliers.length; second++) {
      const c2 = multipliers[second];
      doubleResults.push(...calculate(c1, c2, targetAdjusted));
    }
  }
  const sortedSingular = singularResults.sort((first, second) => (
     first.x - second.x
  ));
  const sortedDouble = doubleResults.sort((first, second) => (
    (first.x + (first.y || 0)) - (second.x + (second.y || 0))
  ));
  return unique([...sortedSingular, ...sortedDouble], result => `${result.x}-${result.y}-${result.c1}-${result.c2}-${result.c3}`);
};
export type CalcResults = ReturnType<typeof calculateAll>;

export const calcQuestResults = (questPoints: number | '', pointRows: PointsRows) => {
  const pointsSum = pointRows.reduce(
    (sum, { points, people }) => (
      sum + ((points || 0) * (people || 0))
    ),
    0
  );
  return {
    pointsSum,
    pointsDiff: ((questPoints || 0) - pointsSum)
  }
}
