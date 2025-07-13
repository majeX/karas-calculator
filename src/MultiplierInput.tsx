import React from 'react';

import "./MultiplierInput.css";
import { intOrEmpty } from './calculate-new';

type Props = {
  id: number,
  value: number | '',
  onChange(value: number | ''): void,
};

const MultiplierInput: React.FC<Props> = ({
  id,
  value,
  onChange,
}) => {
  return (
    <div className="b-MultiplierInput">
      <input
        id={`multiplier-${id}`}
        name={`multiplier-${id}`}
        type="number"
        min={0}
        autoFocus
        value={value}
        aria-label={`Множитель ${id + 1}`}
        onChange={(e) => { onChange(intOrEmpty(e.target.value)) } }
      />
    </div>
  );
}

export default MultiplierInput;
