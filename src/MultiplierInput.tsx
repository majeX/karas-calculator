import React from 'react';

import "./MultiplierInput.css";
import { intOrEmpty } from './calculate-new';

type Props = {
  id: number,
  value: number | '',
  autoFocus?: boolean,
  onChange(value: number | ''): void,
};

const MultiplierInput: React.FC<Props> = ({
  id,
  value,
  autoFocus = false,
  onChange,
}) => {
  return (
    <div className="b-MultiplierInput">
      <input
        id={`multiplier-${id}`}
        name={`multiplier-${id}`}
        type="number"
        inputMode="numeric"
        min={0}
        autoFocus={autoFocus}
        value={value}
        aria-label={`Множитель ${id + 1}`}
        onChange={(e) => { onChange(intOrEmpty(e.target.value)) } }
      />
    </div>
  );
}

export default MultiplierInput;
