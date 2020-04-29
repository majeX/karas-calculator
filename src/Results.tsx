import React from 'react';
import { CalcResults } from './calculate';
import './Results.css';

type Props = {
  results: CalcResults,
};

const ResultLine: React.FC<{ result: Props['results'][0] }> = ({
  result
}) => (
  <tr className="ResultLine">
    <td className="ResultLine__mult">{result.c1}x</td>
    <td className="ResultLine__score">{result.x}</td>
    {result.y !== null && (
      <>
        <td>&nbsp;+&nbsp;</td>
        <td className="ResultLine__mult">{result.c2}x</td>
        <td className="ResultLine__score">{result.y}</td>
      </>
    )}
  </tr>
);

const Results: React.FC<Props> = ({
  results,
}) => {
  return (
    <code>
      <table>
        <tbody>
          {results.map(result => (
            <ResultLine result={result} key={Object.values(result).join(", ")} />
          ))}
        </tbody>
      </table>
    </code>
  )
};

export default Results;
