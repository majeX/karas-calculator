
import { performance } from 'perf_hooks';

// --- Copied and modified from calculate.ts ---
import { unique, sort } from 'radash';

export const calculate = (c1, c2, c3) => {
  if (c1 === 0 || c2 === 0) { return []; }

  const results = [];
  const xMax = Math.floor(c3 / c1);

  for (let x = 3; x <= xMax; x++) {
    const remainder = c3 - (x * c1);
    if (remainder > 0 && remainder % c2 === 0) {
      const y = remainder / c2;
      if (y > 2) {
        results.push({ x, y, c1, c2, c3 });
      }
    }
  }
  return results;
};

export const calculateSingular = (c1, c3) => {
  if (c1 === 0) { return null; }

  if (c3 % c1 === 0) {
    const result = c3 / c1;
    return result > 0 ? result : null;
  }

  return null;
};

export const getAllMultipliers = (multipliers, bonus) => {
  const bonusMultipliers = multipliers.map(mult => mult + bonus);
  const sorted =  sort([...multipliers, ...bonusMultipliers], mult => mult);
  return unique(sorted);
};

export const calculateAll = (multipliers, gained, target) => {
  const singularResults = [];
  const targetAdjusted = target - gained;
  for(let multIndex = 0; multIndex < multipliers.length; multIndex++) {
    const mult = multipliers[multIndex];
    const singular = calculateSingular(mult, targetAdjusted);
    if (singular !== null) { singularResults.push({ x: singular, y: null, c1: mult, c2: null, c3: targetAdjusted }) }
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
// --- End copied code ---

// A more demanding test case
const multipliers = [103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];
const bonus = 13;
const target = 1475000; // A 7-digit number
const gained = 0;
const iterations = 100;

console.log('Running STRESS TEST for the improved calculateAll...');

const allMultipliers = getAllMultipliers(multipliers, bonus);

const startTime = performance.now();
for (let i = 0; i < iterations; i++) {
  calculateAll(allMultipliers, gained, target);
}
const endTime = performance.now();

const totalTime = endTime - startTime;
const averageTime = totalTime / iterations;

console.log(`STRESS TEST took an average of ${averageTime.toFixed(4)}ms over ${iterations} iterations.`);
