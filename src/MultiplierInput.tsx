import React, { useState } from 'react';

import "./MultiplierInput.css";
import { intOrEmpty } from './calculate';

type Props = {
  id: number,
  value: number | '',
  onChange(value: number | ''): void,
  onAdd(): void,
};

const MultiplierInput: React.FC<Props> = ({
  id,
  value,
  onChange,
  onAdd,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="b-MultiplierInput">
      {isActive
        ? <input
            name={`multiplier-${id}`}
            type="number"
            min={0}
            autoFocus
            value={value}
            onChange={(e) => { console.log(intOrEmpty(e.target.value)); onChange(intOrEmpty(e.target.value)) } }
          />
        : <div onClick={() => { setIsActive(true); onAdd() }}>+</div>
      }
    </div>
  );
}

export default MultiplierInput;
