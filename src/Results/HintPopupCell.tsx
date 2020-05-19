import React, { FC } from 'react';

import { cache } from '../cache';

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

type Props = {
  row: typeof cache[number][number] | undefined,
};

const HintPopupCell: FC<Props> = ({
  row,
}) => {
  if (row === undefined) { return null; }
  const { c2i, c3i, c4i, c5i } = row;
  return (
    <td>
      <HintCell wordLength={2} quantity={c2i} />
      <HintCell wordLength={3} quantity={c3i} />
      <HintCell wordLength={4} quantity={c4i} />
      <HintCell wordLength={5} quantity={c5i} />
    </td>
  );
};

export default HintPopupCell;
