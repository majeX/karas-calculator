import { getAllMultipliers, calculateAll } from './calculate-new';

describe('getAllMultipliers', () => {
  it('should return a unique, sorted array of multipliers and bonus multipliers', () => {
    expect(getAllMultipliers([10, 20], 5)).toEqual([10, 15, 20, 25]);
  });

  it('should handle an empty array of multipliers', () => {
    expect(getAllMultipliers([], 5)).toEqual([]);
  });

  it('should handle a bonus of 0', () => {
    expect(getAllMultipliers([10, 20], 0)).toEqual([10, 20]);
  });
});

describe('calculateAll', () => {
  it('should return a single result for a simple case', () => {
    const result = calculateAll([10], 0, 100);
    expect(result).toEqual([{
      multiplier1Count: 10,
      multiplier2Count: null,
      multiplier1Value: 10,
      multiplier2Value: null,
      pointsToGain: 100,
    }]);
  });

  it('should return a result for a two-multiplier case', () => {
    const result = calculateAll([10, 20], 0, 100);
    expect(result).toContainEqual({
      multiplier1Count: 4,
      multiplier2Count: 3,
      multiplier1Value: 10,
      multiplier2Value: 20,
      pointsToGain: 100,
    });
  });

  it('should return both single and double results', () => {
    const result = calculateAll([10, 20, 50], 0, 100);
    expect(result).toContainEqual({
      multiplier1Count: 10,
      multiplier2Count: null,
      multiplier1Value: 10,
      multiplier2Value: null,
      pointsToGain: 100,
    });
    expect(result).toContainEqual({
      multiplier1Count: 5,
      multiplier2Count: null,
      multiplier1Value: 20,
      multiplier2Value: null,
      pointsToGain: 100,
    });
    expect(result).toContainEqual({
      multiplier1Count: 2,
      multiplier2Count: null,
      multiplier1Value: 50,
      multiplier2Value: null,
      pointsToGain: 100,
    });
    expect(result).toContainEqual({
      multiplier1Count: 4,
      multiplier2Count: 3,
      multiplier1Value: 10,
      multiplier2Value: 20,
      pointsToGain: 100,
    });
  });

  it('should return an empty array when no solution is possible', () => {
    const result = calculateAll([7, 14], 0, 101);
    expect(result).toEqual([]);
  });

  it('should handle a large number of multipliers and a large target', () => {
    const multipliers = [11, 23, 37, 41, 53, 67, 71, 83, 97, 101];
    const bonus = 7;
    const allMultipliers = getAllMultipliers(multipliers, bonus);
    const target = 7100;
    const result = calculateAll(allMultipliers, 0, target);
    expect(result).toContainEqual({
      multiplier1Count: 100,
      multiplier2Count: 200,
      multiplier1Value: 11,
      multiplier2Value: 30,
      pointsToGain: target,
    });
  });

  it('should not have floating point errors and find the correct integer solution', () => {
    const multipliers = [144];
    const bonus = 5;
    const allMultipliers = getAllMultipliers(multipliers, bonus);
    const target = 9605;
    const result = calculateAll(allMultipliers, 0, target);
    expect(result).toContainEqual({
      multiplier1Count: 16,
      multiplier2Count: 49,
      multiplier1Value: 144,
      multiplier2Value: 149,
      pointsToGain: 9605,
    });
  });
});