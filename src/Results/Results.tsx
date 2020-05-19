import React, { MouseEvent } from 'react';

import { CalcResults } from '../calculate';
import './Results.css';

type Props = {
  results: CalcResults,
  useCache?: boolean,
};

export type EventDetails = {
  x: number,
  c1: number,
  y: number | null,
  c2: number | null,
}
const showHintPopup = (event: MouseEvent<HTMLTableRowElement>) => {
  const target = event.currentTarget as HTMLTableRowElement;
  const x = parseInt(target.getAttribute('data-x') || '0');
  const c1 = parseInt(target.getAttribute('data-c1') || '0');
  const y = target.getAttribute('data-y') === null ? null : parseInt(target.getAttribute('data-y') || '0');
  const c2 = target.getAttribute('data-c2') === null ? null : parseInt(target.getAttribute('data-c2') || '0');
  const showPopupEvent = new CustomEvent<EventDetails>('openHint', { bubbles: true, detail: {
    x, c1, y, c2
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
    data-x={result.x}
    data-c1={result.c1}
    data-y={result.y}
    data-c2={result.c2}
  >
    <td className="ResultLine__clickable">
      <span className="ResultLine__mult">{result.c1}x</span>
      <span className="ResultLine__score">{result.x}</span>
    </td>
    {result.y !== null ? (
      <>
        <td><span>&nbsp;+&nbsp;</span></td>
        <td className="ResultLine__clickable">
          <span className="ResultLine__mult">{result.c2}x</span>
          <span className="ResultLine__score">{result.y}</span>
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
      <span className="ResultLine__mult">{result.c1}x</span>
      <span className="ResultLine__score">{result.x}</span>
    </td>
    {result.y !== null && (
      <td>
        <span>&nbsp;+&nbsp;</span>
        <span className="ResultLine__mult">{result.c2}x</span>
        <span className="ResultLine__score">{result.y}</span>
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
