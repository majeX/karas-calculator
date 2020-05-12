export const NON_CALCULATABLE = [4, 5, 7, 8, 11, 14, 17];
const c2 = 3, c3 = 6, c4 = 10, c5 = 15;

export const combinationsForSum = (sum: number) => {
  const combinations = [];
  for (let c2i = 0; c2i <= (sum / c2); c2i++) {
    for (let c3i = 0; c3i <= (sum / c3); c3i++) {
      for (let c4i = 0; c4i <= (sum / c4); c4i++) {
        for (let c5i = 0; c5i <= (sum / c5); c5i++) {
          const res = c2i * c2 + c3i * c3 + c4i * c4 + c5i * c5;
          if (res === sum) {
            combinations.push({ c2i, c3i, c4i, c5i });
          }
        }
      }
    }
  }
  return combinations;
};

type Combinations = ReturnType<typeof combinationsForSum>;
export const allCombinationsUntil = (maxSum: number) => {
  const all: { [key: number]: Combinations } = {};
  for (let sum = 3; sum <= maxSum; sum++) {
    if (all[sum] === undefined) {
      all[sum] = [];
    }
    all[sum] = combinationsForSum(sum);
  }
  return all;
};
