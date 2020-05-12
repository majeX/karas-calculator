import React, { FC, useEffect, useState } from 'react';

import './HintPopup.css';
import './HintCell.css'
import { cache } from '../cache';
import closeIcon from './close-icon.svg';

type Props = {
};

const HintCell: FC<{ wordLength: number, quantity: number }> = ({
  wordLength,
  quantity,
}) => {
  if (quantity === 0) { return null }
  return (
    <span className="HintCell">
      <span className="HintCell__word">{wordLength} букв&nbsp;x&nbsp;</span>
      <span className="HintCell__quantity">{quantity};</span>
    </span>
  )
};

const HintPopup: FC<Props> = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sum, setSum] = useState<number>(0);
  useEffect(() => {
    document.addEventListener('openHint', (e: CustomEventInit<{ sum: number }>) => {
      if (e.detail) {
        setIsActive(true);
        setSum(e.detail.sum);
      }
    });
  }, [])
  if (!isActive || sum === 0) {
    return null;
  }

  const cachedCalculations = cache[sum];
  if (cachedCalculations === undefined || cachedCalculations.length === 0) {
    setSum(0);
    setIsActive(false);
    return null;
  }

  return (
    <div className="HintPopup">
      <div className="HintPopup__content">
        <table className="HintPopup__table">
          <tbody>
            {cachedCalculations.map(({ c2i, c3i, c4i, c5i }) => (
              <tr key={`${c2i}-${c3i}-${c4i}-${c5i}`}>
                <td>
                  <HintCell wordLength={2} quantity={c2i} />
                  <HintCell wordLength={3} quantity={c3i} />
                  <HintCell wordLength={4} quantity={c4i} />
                  <HintCell wordLength={5} quantity={c5i} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="HintPopup__close" onClick={() => {
        setIsActive(false);
        setSum(0);
      }}><img src={closeIcon} className="HintPopup__close-icon" /></div>
    </div>
  );
};

export default HintPopup;
