// calculate-new.ts (Proposed Improvements)

import { unique, sort } from 'radash';
import { PointsRows } from './types/calculation-types';

// --- Type Definitions ---
// By defining all our types in one place, the code becomes more consistent and easier to understand.

// Represents a single combination of multipliers found to reach the target.
// Using more descriptive names than 'x', 'y', 'c1', etc.
export type Combination = {
  multiplier1Count: number;
  multiplier2Count: number | null;
  multiplier1Value: number;
  multiplier2Value: number | null;
  pointsToGain: number;
};

// A more descriptive name for the function signature of our core calculators.
type CombinationCalculator = (
  multiplier1: number,
  multiplier2: number,
  pointsToGain: number
) => Array<Combination>;

// --- Helper Functions ---

// No changes needed here, the name is clear.
export const intOrEmpty = (value: string) => (value === '' ? value : parseInt(value));

// --- Core Calculation Logic ---

/**
 * Calculates all possible combinations of two multipliers that can be used to achieve a target score.
 * This is the core of the two-multiplier calculation, solving the equation:
 * (multiplier1 * count1) + (multiplier2 * count2) = pointsToGain
 */
const calculate: CombinationCalculator = (multiplier1, multiplier2, pointsToGain) => {
  // Using more descriptive parameter names makes the function's purpose clearer.
  if (multiplier1 === 0 || multiplier2 === 0) {
    return [];
  }

  const combinations: Combination[] = [];
  // The maximum number of times the first multiplier can be used.
  const maxMultiplier1Count = Math.floor(pointsToGain / multiplier1);

  // The original algorithm started at 3, so we preserve that logic.
  // A comment here would be helpful to explain why it's not 0 or 1.
  for (let multiplier1Count = 3; multiplier1Count <= maxMultiplier1Count; multiplier1Count++) {
    const pointsFromMultiplier1 = multiplier1Count * multiplier1;
    const remainingPoints = pointsToGain - pointsFromMultiplier1;

    // Check if the remaining points are perfectly divisible by the second multiplier.
    if (remainingPoints > 0 && remainingPoints % multiplier2 === 0) {
      const multiplier2Count = remainingPoints / multiplier2;

      // The original algorithm also had a minimum count of 3 for the second multiplier.
      if (multiplier2Count > 2) {
        combinations.push({
          multiplier1Count,
          multiplier2Count,
          multiplier1Value: multiplier1,
          multiplier2Value: multiplier2,
          pointsToGain,
        });
      }
    }
  }
  return combinations;
};

/**
 * Calculates the number of times a single multiplier is needed to reach the target.
 * Returns null if it's not possible with a whole number.
 */
const calculateSingular = (multiplier: number, pointsToGain: number): number | null => {
  if (multiplier === 0) {
    return null;
  }

  if (pointsToGain % multiplier === 0) {
    const count = pointsToGain / multiplier;
    return count > 0 ? count : null;
  }

  return null;
};

/**
 * Takes a list of base multipliers and a bonus, and returns a single, sorted
 * array of unique multipliers (base + bonus-applied).
 */
export const getAllMultipliers = (baseMultipliers: Array<number>, adBonus: number): Array<number> => {
  const bonusMultipliers = baseMultipliers.map(mult => mult + adBonus);
  const allMultipliers = [...baseMultipliers, ...bonusMultipliers];
  // The 'radash' functions are already quite readable.
  return unique(sort(allMultipliers, m => m));
};

/**
 * The main exported function. It orchestrates the search for all possible
 * single and double multiplier combinations to reach a target.
 */
export const calculateAll = (
  multipliers: Array<number>,
  gainedPoints: number,
  targetPoints: number
): Array<Combination> => {
  const pointsToGain = targetPoints - gainedPoints;
  const singleMultiplierSolutions: Combination[] = [];

  // Using a for...of loop is more modern and readable than a C-style for loop.
  for (const multiplier of multipliers) {
    const count = calculateSingular(multiplier, pointsToGain);
    if (count !== null) {
      singleMultiplierSolutions.push({
        multiplier1Count: count,
        multiplier2Count: null,
        multiplier1Value: multiplier,
        multiplier2Value: null,
        pointsToGain,
      });
    }
  }

  const doubleMultiplierSolutions: Combination[] = [];
  // Using indexed loops here is still necessary to get unique pairs.
  for (let i = 0; i < multipliers.length - 1; i++) {
    for (let j = i + 1; j < multipliers.length; j++) {
      const multiplier1 = multipliers[i];
      const multiplier2 = multipliers[j];
      const combinations = calculate(multiplier1, multiplier2, pointsToGain);
      doubleMultiplierSolutions.push(...combinations);
    }
  }

  // Sorting logic remains the same, but variable names are clearer.
  const sortedSingular = singleMultiplierSolutions.sort(
    (a, b) => a.multiplier1Count - b.multiplier1Count
  );
  const sortedDouble = doubleMultiplierSolutions.sort(
    (a, b) =>
      (a.multiplier1Count + (a.multiplier2Count || 0)) -
      (b.multiplier1Count + (b.multiplier2Count || 0))
  );

  const allSolutions = [...sortedSingular, ...sortedDouble];
  
  // The unique key generation is complex, so a comment explaining it is useful.
  // Create a unique key for each combination to filter out duplicates.
  const uniqueKey = (c: Combination) =>
    `${c.multiplier1Count}-${c.multiplier2Count}-${c.multiplier1Value}-${c.multiplier2Value}`;

  return unique(allSolutions, uniqueKey);
};

// This type name is already clear.
export type CalcResults = ReturnType<typeof calculateAll>;

// This function name is also clear.
export const calcQuestResults = (questPoints: number | '', pointRows: PointsRows) => {
  const pointsSum = pointRows.reduce(
    (sum, { points, people }) => sum + (points || 0) * (people || 0),
    0
  );
  return {
    pointsSum,
    pointsDiff: (questPoints || 0) - pointsSum,
  };
};