import React, { FC, ReactNode, useEffect, useState } from 'react';

import './HintPopup.css';
import './HintCell.css'
import { cache } from '../cache';
import closeIcon from './close-icon.svg';
import { EventDetails } from './Results';
import HintPopupCell from './HintPopupCell';

type Props = {
};

const getHeader = ({multiplier1Count, multiplier2Count, multiplier1Value, multiplier2Value}: Partial<EventDetails>) => {
  const base = <th>
    <span className="HintPopup__highlight-sum">{multiplier1Count}</span>
    &nbsp;очков с множителем <span className="HintPopup__highlight-mult">{multiplier1Value}</span>
  </th>
  let add: ReactNode = "";
  if (multiplier2Count !== null) {
    add = <th>
      <span className="HintPopup__highlight-sum">{multiplier2Count}</span> очков с множителем
      <span className="HintPopup__highlight-mult">&nbsp;{multiplier2Value}</span>
    </th>
  }
  return <>
    {base} {add}
  </>
}

const HintPopup: FC<Props> = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sumDetails, setSumDetails] = useState<Partial<EventDetails>>({});
  useEffect(() => {
    document.addEventListener('openHint', (e: CustomEventInit<EventDetails>) => {
      if (e.detail) {
        setIsActive(true);
        setSumDetails(e.detail);
      }
    });
  }, [])
  const x = sumDetails.multiplier1Count;
  const y = sumDetails.multiplier2Count;
  if (!isActive || x === 0 || x === undefined) {
    return null;
  }

  const cachedCalculationsX = cache[x];
  const cachedCalculationsY = (y === undefined || y === null) ? [] : cache[y];
  if (cachedCalculationsX === undefined || cachedCalculationsX.length === 0) {
    setSumDetails({});
    setIsActive(false);
    return null;
  }
  const rowsLength = Math.max(cachedCalculationsX.length, cachedCalculationsY.length);
  const doubleColumn = y !== null && y !== undefined;

  return (
    <div className="HintPopup">
      <div className="HintPopup__content">
        <table className="HintPopup__table">
          <thead>
            <tr>
              {getHeader(sumDetails)}
            </tr>
          </thead>
          <tbody>
            {Array(rowsLength).fill(0).map((_, id) => (
              <tr key={`${id}-${rowsLength}-${x}-${y}`}>
                <HintPopupCell key={`${id}-x`} row={cachedCalculationsX[id]} />
                {doubleColumn && (
                  <HintPopupCell key={`${id}-y`} row={cachedCalculationsY[id]}/>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="HintPopup__close" onClick={() => {
        setIsActive(false);
        setSumDetails({});
      }}><img src={closeIcon} alt="Close icon" className="HintPopup__close-icon" /></div>
    </div>
  );
};

export default HintPopup;
