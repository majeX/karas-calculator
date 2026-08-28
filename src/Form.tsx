import React, { useEffect, useState } from 'react';
import { omit } from 'radash';

import MultiplierInput from './MultiplierInput';
import { Multipliers } from './App';
import { intOrEmpty } from './calculate-new';
import './Form.css';

type Props = {
  gainedPoints: number | '',
  onGainedPointsChange(value: number | ''): void,

  multipliers: Multipliers,
  onMultipliersChange(value: Multipliers): void,

  grailActive: boolean,
  onGrailActiveChange(value: boolean): void,

  targetPoints: number | '',
  onTargetPointsChange(value: number | ''): void,

  adBonus: number | '',
  onAdBonusChange(value: number | ''): void,
};

const Form: React.FC<Props> = ({
  gainedPoints,
  onGainedPointsChange,

  targetPoints,
  onTargetPointsChange,

  multipliers,
  onMultipliersChange,

  grailActive,
  onGrailActiveChange,

  adBonus,
  onAdBonusChange,
}) => {
  const [numOfMultipliers, setNumOfMultipliers] = useState(0);
  // Only the field the player just added should take focus. Focusing every
  // field on mount popped the keyboard open on page load and again on each
  // re-render of the list.
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  useEffect(() => {
    const numOfMultipliers = Object.values(multipliers).length;
    setNumOfMultipliers(numOfMultipliers ? numOfMultipliers - 1 : 0);
  }, [multipliers]);

  const isGrailListEmpty = grailActive
    && Object.values(multipliers).filter(multiplier => multiplier !== '').length === 0;

  return (
    <div className="b-Form">
      <div className="b-Form__line b-Form__line-gained-points">
        <label htmlFor="gainedPoints" className="b-Form__caption">
          Уже набрано
        </label>
        <div className="b-Form__input-wrapper">
          <input
            id="gainedPoints"
            name="gainedPoints"
            type="number"
            inputMode="numeric"
            placeholder="0"
            value={gainedPoints}
            onChange={(e) => onGainedPointsChange(intOrEmpty(e.target.value))}
          />
          <div className="b-Form__hint">
            Оставьте это поле пустым, чтобы калькулятор считал, как раньше
          </div>
        </div>
      </div>
      <div className="b-Form__line">
        <label htmlFor="targetPoints" className="b-Form__caption">
          Сколько нужно набрать
        </label>
        <input
          id="targetPoints"
          name="targetPoints"
          type="number"
          inputMode="numeric"
          placeholder=""
          value={targetPoints}
          onChange={(e) => onTargetPointsChange(intOrEmpty(e.target.value))}
        />
      </div>
      <div className="b-Form__line b-Form__line-grail">
        <label htmlFor="grailActive" className="b-Form__caption">
          У клана есть Грааль
        </label>
        <input
          id="grailActive"
          name="grailActive"
          type="checkbox"
          checked={grailActive}
          onChange={(e) => onGrailActiveChange(e.target.checked)}
        />
      </div>
      <div className="b-Form__line">
        <div className="b-Form__caption">
          Множители
        </div>
        <div className="b-Form__multipliers">
          {Array(numOfMultipliers + 1).fill(0).map((_, id) => (
            <MultiplierInput
              key={`mult-${id}`}
              id={id}
              value={multipliers[id] === undefined ? '' : multipliers[id]}
              autoFocus={id === focusIndex}
              onChange={(value: number) => {
                onMultipliersChange({ ...multipliers, [id]: value })
              }}
            />
          ))}
          <button
            type="button"
            aria-label="Добавить множитель"
            onClick={() => {
              setNumOfMultipliers(prevState => prevState + 1);
              setFocusIndex(numOfMultipliers + 1);
            }}
            className="b-Form__mult-plus"
          >
            +
          </button>
          <button
            type="button"
            aria-label="Убрать последний множитель"
            onClick={() => {
              setNumOfMultipliers(prevState => prevState - 1);
              setFocusIndex(null);
              onMultipliersChange(omit(multipliers, [String(numOfMultipliers)]));
            }}
            className="b-Form__mult-minus"
          >
            -
          </button>
        </div>
      </div>
      {isGrailListEmpty && (
        <div className="b-Form__hint b-Form__hint-grail">
          Введите множители, которые показывает игра, пока Грааль активен.
          Пересчитать их из обычных множителей нельзя — игра округляет,
          и результат разойдётся на единицу.
        </div>
      )}
      <div className="b-Form__line">
        <label htmlFor="adBonus" className="b-Form__caption">
          Бонус от рекламы
        </label>
        <input
          id="adBonus"
          name="adBonus"
          type="number"
          inputMode="numeric"
          placeholder=""
          value={adBonus}
          onChange={(e) => onAdBonusChange(intOrEmpty(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Form;
