import React, { MouseEvent } from 'react';

import { Combination } from '../calculate-new';
import './Results.css';

type Props = {
  results: Combination[],
  useCache?: boolean,
};

export type EventDetails = {
  multiplier1Count: number,
  multiplier1Value: number,
  multiplier2Count: number | null,
  multiplier2Value: number | null,
}
const showHintPopup = (event: MouseEvent<HTMLTableRowElement>) => {
  const target = event.currentTarget as HTMLTableRowElement;
  const x = parseInt(target.getAttribute('data-x') || '0');
  const c1 = parseInt(target.getAttribute('data-c1') || '0');
  const y = target.getAttribute('data-y') === null ? null : parseInt(target.getAttribute('data-y') || '0');
  const c2 = target.getAttribute('data-c2') === null ? null : parseInt(target.getAttribute('data-c2') || '0');
  const showPopupEvent = new CustomEvent<EventDetails>('openHint', { bubbles: true, detail: {
    multiplier1Count: x,
    multiplier1Value: c1,
    multiplier2Count: y,
    multiplier2Value: c2
  } });
  document.dispatchEvent(showPopupEvent);
}

const ResultLine: React.FC<{
  result: Props['results'][0],
}> = ({
  result,
}) => (
  <tr
    className="ResultLine ResultLine__clickable-row"
    onClick={showHintPopup}
    data-x={result.multiplier1Count}
    data-c1={result.multiplier1Value}
    data-y={result.multiplier2Count}
    data-c2={result.multiplier2Value}
  >
    <td className="ResultLine__clickable">
      <span className="ResultLine__mult">{result.multiplier1Value}x</span>
      <span className="ResultLine__score">{result.multiplier1Count}</span>
    </td>
    {result.multiplier2Count !== null ? (
      <>
        <td><span>&nbsp;+&nbsp;</span></td>
        <td className="ResultLine__clickable">
          <span className="ResultLine__mult">{result.multiplier2Value}x</span>
          <span className="ResultLine__score">{result.multiplier2Count}</span>
        </td>
      </>
    ) : <><td></td><td></td></>}
  </tr>
);

const SimpleResultLine: React.FC<{
  result: Props['results'][0],
}> = ({
  result,
}) => (
  <tr className="ResultLine">
    <td>
      <span className="ResultLine__mult">{result.multiplier1Value}x</span>
      <span className="ResultLine__score">{result.multiplier1Count}</span>
    </td>
    {result.multiplier2Count !== null && (
      <td>
        <span>&nbsp;+&nbsp;</span>
        <span className="ResultLine__mult">{result.multiplier2Value}x</span>
        <span className="ResultLine__score">{result.multiplier2Count}</span>
      </td>
    )}
  </tr>
);

const Wrapper: React.FC = ({ children }) => (
  <code>
    <table className="ResultLine__table">
      <tbody>
        {children}
      </tbody>
    </table>
  </code>
)

const Results: React.FC<Props> = ({
  results,
  useCache = false,
}) => {
  if (useCache) {
    return (
      <Wrapper>
        {results.map(result => (
          <ResultLine result={result} key={Object.values(result).join(", ")} />
        ))}
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {results.map(result => (
        <SimpleResultLine result={result} key={Object.values(result).join(", ")} />
      ))}
    </Wrapper>
  )
};

export default Results;
