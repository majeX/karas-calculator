import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

import './Clanquest.css';
import karas from '../karas.svg';
import { calcQuestResults } from '../calculate';
import { getAllLS, setLS } from '../lib/localStorage';
import { PointsRows } from '../types/calculation-types';

type Props = {};
const getNewPointsRows = (pointsRows: PointsRows, indexToChange: number, updatedRow: PointsRows[0]) =>
  pointsRows.map((row, index) => (
    indexToChange === index
      ? updatedRow
      : row
  )
);

const addPointsRow = (pointsRows: PointsRows): PointsRows => [...pointsRows, { points: '', people: '' }];
const removePointsRow = (pointsRow: PointsRows, indexToRemove: number): PointsRows => pointsRow.filter(
  (row, index) => index !== indexToRemove
);

const Clanquest: FC<Props> = () => {
  const [questPoints, setQuestPoints] = useState<number | ''>('');
  const [pointsRows, setPointsRows] = useState<PointsRows>([{ points: '', people: '' }]);

  useEffect(() => {
    const savedValues = getAllLS();
    if (savedValues['questPoints']) {
      setQuestPoints(savedValues['questPoints'])
    }
    if (savedValues['pointsRows']) {
      setPointsRows(savedValues['pointsRows'])
    }
  }, []);

  const calculated = calcQuestResults(questPoints, pointsRows);

  return (
    <div className="App b-Clanquest">
      <header className="App-header">
        <Link to="/">
          <img src={karas} className="App-logo" alt="logo" />
        </Link>
      </header>
      <section>
        <Link to="/" className="b-Clanquest__back-to-calc">Назад в калькулятор</Link>
      </section>
      <section className="b-Clanquest__questPoints-container">
        <span>Количество очков в КЗ:</span>
        <input
          className="b-Clanquest__questPoints"
          name="questPoints"
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="Очки"
          value={questPoints === '' ? '' : numeral(questPoints).format('0,0')}
          onChange={(e) => {
            const value = e.target.value === '' ? '' : numeral(e.target.value).value();
            setQuestPoints(value);
            setLS({ questPoints: value});
          }}
        />
      </section>
      <section  className="b-Clanquest__rows">
        <div className="b-Clanquest__row b-Clanquest__row--header">
          <span className="b-Clanquest__points-header">Очки на сундук</span>
          <span className="b-Clanquest__points-header">Количество людей на сундук</span>
          <span className="b-Clanquest__points-header-empty" />
        </div>
        {pointsRows.map((row, index) => (
          <div className="b-Clanquest__row" key={index}>
            <input
              className="b-Clanquest__points"
              name={`row-points-${index}`}
              type="number"
              placeholder="Очки"
              value={row.points}
              onChange={(e) => {
                const newPointsRows = getNewPointsRows(pointsRows, index, { ...row, points: parseInt(e.target.value) });
                setPointsRows(newPointsRows);
                setLS({ pointsRows: newPointsRows });
              }}
            />
            <input
              className="b-Clanquest__people"
              name={`row-people-${index}`}
              type="number"
              placeholder="Люди"
              value={pointsRows[index].people}
              onChange={(e) => {
                const newPointsRows = getNewPointsRows(pointsRows, index, { ...row, people: parseInt(e.target.value) });
                setPointsRows(newPointsRows);
                setLS({ pointsRows: newPointsRows });
              }}
            />
            <div
            onClick={() => {
              const newPointsRows = removePointsRow(pointsRows, index);
              setPointsRows(newPointsRows);
              setLS({ pointsRows: newPointsRows })
            }}
            className="b-Clanquest__mult-minus"
            >
              -
            </div>
          </div>
        ))}
        <div
          onClick={() => {
            const newPointsRows = addPointsRow(pointsRows);
            setPointsRows(newPointsRows);
            setLS({ pointsRows: newPointsRows })
          }}
          className="b-Clanquest__mult-plus"
        >
          +
        </div>
      </section>
      <section className="b-Clanquest__results">
        {(questPoints || 0).toLocaleString()} - {calculated.pointsSum.toLocaleString()} = {calculated.pointsDiff.toLocaleString()}
      </section>
    </div>
  );
};

export default Clanquest;
