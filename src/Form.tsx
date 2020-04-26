import React, { useState } from 'react';

import MultiplierInput from './MultiplierInput';
import { Multipliers } from './App';
import './Form.css';
import { intOrEmpty } from './calculate';

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
  return (
    <div>
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
              value={multipliers[id] || ''}
              onChange={(value: number) => { onMultipliersChange({ ...multipliers, [id]: value }) }}
              onAdd={() => { setNumOfMultipliers(prevState => prevState + 1) }}
            />
          ))}
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
