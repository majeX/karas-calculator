import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';

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

  const close = useCallback(() => {
    setIsActive(false);
    setSumDetails({});
  }, []);

  useEffect(() => {
    const onOpenHint = (e: CustomEventInit<EventDetails>) => {
      if (e.detail) {
        setIsActive(true);
        setSumDetails(e.detail);
      }
    };
    document.addEventListener('openHint', onOpenHint);
    return () => document.removeEventListener('openHint', onOpenHint);
  }, [])

  // Esc closes, and the page behind stops scrolling while the sheet is up —
  // otherwise a phone scrolls the results under the popup instead of the list
  // inside it.
  useEffect(() => {
    if (!isActive) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); }
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isActive, close])

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
    <>
      <div className="HintPopup__backdrop" onClick={close} />
      <div className="HintPopup" role="dialog" aria-modal="true">
        <div className="HintPopup__bar">
          <button
            type="button"
            className="HintPopup__close"
            aria-label="Закрыть"
            onClick={close}
          >
            <img src={closeIcon} alt="" className="HintPopup__close-icon" />
          </button>
        </div>
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
      </div>
    </>
  );
};

export default HintPopup;
