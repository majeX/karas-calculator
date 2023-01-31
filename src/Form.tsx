import React, { useEffect, useState } from 'react';
import { omit } from 'lodash';

import MultiplierInput from './MultiplierInput';
import { Multipliers } from './App';
import { intOrEmpty } from './calculate';
import './Form.css';

type Props = {
  gainedPoints: number | '',
  onGainedPointsChange(value: number | ''): void,

  multipliers: Multipliers,
  onMultipliersChange(value: Multipliers): void,

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

  adBonus,
  onAdBonusChange,
}) => {
  const [numOfMultipliers, setNumOfMultipliers] = useState(0);
  useEffect(() => {
    const numOfMultipliers = Object.values(multipliers).length;
    setNumOfMultipliers(numOfMultipliers ? numOfMultipliers - 1 : 0);
  }, [multipliers]);
  return (
    <div className="b-Form">
      <div className="b-Form__line">
        <div className="b-Form__caption">
          Уже набрано
        </div>
        <input
          name="gainedPoints"
          type="number"
          placeholder="0"
          value={gainedPoints}
          onChange={(e) => onGainedPointsChange(intOrEmpty(e.target.value))}
        />
      </div>
      <div className="b-Form__line">
        <div className="b-Form__caption">
          Сколько нужно набрать
        </div>
        <input
          name="targetPoints"
          type="number"
          placeholder=""
          value={targetPoints}
          onChange={(e) => onTargetPointsChange(intOrEmpty(e.target.value))}
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
              onChange={(value: number) => {
                onMultipliersChange({ ...multipliers, [id]: value })
              }}
            />
          ))}
          <div
            onClick={() => {
              setNumOfMultipliers(prevState => prevState + 1)
            }}
            className="b-Form__mult-plus"
          >
            +
          </div>
          <div
            onClick={() => {
              setNumOfMultipliers(prevState => prevState - 1);
              onMultipliersChange(omit(multipliers, String(numOfMultipliers)));
            }}
            className="b-Form__mult-minus"
          >
            -
          </div>
        </div>
      </div>
      <div className="b-Form__line">
        <div className="b-Form__caption">
          Бонус от рекламы
        </div>
        <input
          name="adBonus"
          type="number"
          placeholder=""
          value={adBonus}
          onChange={(e) => onAdBonusChange(intOrEmpty(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Form;
