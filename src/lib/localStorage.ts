const KEYS = [
  'multipliers',
  'targetPoints',
  'adBonus',
  'questPoints',
  'pointsRows',
] as const;

type SetValueAll = {
  [key in typeof KEYS[number]]: any;
};
type SetValue = Partial<SetValueAll>;
export const setLS = (valueObject: SetValue) => {
  Object.entries(valueObject).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
}

export const getAllLS = () => (
  KEYS.reduce<SetValue>(
    (memo, key) => {
      const item = localStorage.getItem(key);
      if (item === null) { return memo }
      return {
        ...memo,
        [key]: JSON.parse(item)
      }
    },
    {}
  )
);
