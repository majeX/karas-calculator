import React, { MouseEvent } from 'react';

import { CalcResults } from '../calculate';
import './Results.css';

type Props = {
  results: CalcResults,
  useCache?: boolean,
};

const showHintPopup = (event: MouseEvent<HTMLTableCellElement>) => {
  const target = event.currentTarget as HTMLTableCellElement;
  const sum = parseInt(target.getAttribute('data-sum') || '0');
  const showPopupEvent = new CustomEvent<{ sum: number }>('openHint', { bubbles: true, detail: { sum } });
  document.dispatchEvent(showPopupEvent);
}

const ResultLine: React.FC<{
  result: Props['results'][0],
}> = ({
  result,
}) => (
  <tr className="ResultLine ResultLine__clickable-row">
    <td onClick={showHintPopup} data-sum={result.x} className="ResultLine__clickable">
      <span className="ResultLine__mult">{result.c1}x</span>
      <span className="ResultLine__score">{result.x}</span>
    </td>
    {result.y !== null && (
      <>
        <td><span>&nbsp;+&nbsp;</span></td>
        <td onClick={showHintPopup} data-sum={result.y} className="ResultLine__clickable">
          <span className="ResultLine__mult">{result.c2}x</span>
          <span className="ResultLine__score">{result.y}</span>
        </td>
      </>
    )}
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
    <table>
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
