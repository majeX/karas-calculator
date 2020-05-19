import React, { FC, ReactNode, useEffect, useState } from 'react';

import './HintPopup.css';
import './HintCell.css'
import { cache } from '../cache';
import closeIcon from './close-icon.svg';
import { EventDetails } from './Results';
import HintPopupCell from './HintPopupCell';

type Props = {
};

const getHeader = ({x, y, c1, c2}: Partial<EventDetails>) => {
  const base = <th>
    <span className="HintPopup__highlight-sum">{x}</span>
    &nbsp;очков с множителем <span className="HintPopup__highlight-mult">{c1}</span>
  </th>
  let add: ReactNode = "";
  if (y !== null) {
    add = <th>
      <span className="HintPopup__highlight-sum">{y}</span> очков с множителем
      <span className="HintPopup__highlight-mult">&nbsp;{c2}</span>
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
  const x = sumDetails.x;
  const y = sumDetails.y;
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
                <HintPopupCell key={`${id}-y`} row={cachedCalculationsY[id]} />
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
