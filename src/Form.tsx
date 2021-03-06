import React, { useEffect, useState } from 'react';
import { omit } from 'lodash';

import MultiplierInput from './MultiplierInput';
import { Multipliers } from './App';
import { intOrEmpty } from './calculate';
import './Form.css';

type Props = {
  multipliers: Multipliers,
  onMultipliersChange(value: Multipliers): void,

  targetPoints: number | '',
  onTargetPointsChange(value: number | ''): void,

  adBonus: number | '',
  onAdBonusChange(value: number | ''): void,
};

const Form: React.FC<Props> = ({
  targetPoints,
  onTargetPointsChange,

  multipliers,
  onMultipliersChange,

  adBonus,
  onAdBonusChange,
}) => {
  const [numOfMultipliers, setNumOfMultipliers] = useState(0);
  useEffect(() => {
    setNumOfMultipliers(Object.values(multipliers).length - 1);
  }, [multipliers]);
  return (
    <div className="b-Form">
      <div className="b-Form__line">
        <div className="b-Form__caption">
          Сколько нужно набрать
        </div>
        <input
          name="targetPoints"
          type="number"
          placeholder="0"
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
              value={multipliers[id] === undefined ?  '' : multipliers[id]}
              onChange={(value: number) => { onMultipliersChange({ ...multipliers, [id]: value }) }}
            />
          ))}
          <div
            onClick={() => { setNumOfMultipliers(prevState => prevState + 1) }}
            className="b-Form__mult-plus"
          >
            +
          </div>
          <div
            onClick={() => { setNumOfMultipliers(prevState => prevState - 1); onMultipliersChange(omit(multipliers, String(numOfMultipliers))); }}
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
          placeholder="0"
          value={adBonus}
          onChange={(e) => onAdBonusChange(intOrEmpty(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Form;
