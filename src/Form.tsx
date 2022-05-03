import React, { useCallback, useEffect, useState } from 'react';
import { omit, toInteger } from 'lodash';

import MultiplierInput from './MultiplierInput';
import { Multipliers } from './App';
import { intOrEmpty } from './calculate';
import { getAllLS, setLS } from './lib/localStorage';
import './Form.css';

type Props = {
  multipliers: Multipliers,
  onMultipliersChange(value: Multipliers): void,

  targetPoints: number | '',
  onTargetPointsChange(value: number | ''): void,

  adBonus: number | '',
  onAdBonusChange(value: number | ''): void,
};

enum PointsFormType {
  Classic= "CLASSIC",
  Modern = "MODERN",
}

const Form: React.FC<Props> = ({
  targetPoints,
  onTargetPointsChange,

  multipliers,
  onMultipliersChange,

  adBonus,
  onAdBonusChange,
}) => {
  const [numOfMultipliers, setNumOfMultipliers] = useState(0);
  const [pointsFormType, setPointsFormType] = useState(PointsFormType.Classic);

  const [pointsScored, setPointsScored] = useState<number | ''>('');
  const [pointsGoal, setPointsGoal] = useState<number | ''>('');

  useEffect(() => {
    setNumOfMultipliers(Object.values(multipliers).length - 1);
  }, [multipliers]);

  useEffect(() => {
    const savedValues = getAllLS();
    const savedPointsFormType: PointsFormType = savedValues["pointsFormType"] as PointsFormType || PointsFormType.Classic;

    setPointsScored(savedValues['pointsScored'] || '');
    setPointsGoal(savedValues['pointsGoal'] || '');
    setPointsFormType(savedPointsFormType);
    console.log('I work once');
  }, [setPointsScored, setPointsGoal, ]);

  const changePointsFormType = useCallback((e) => {
    setPointsFormType(e.target.value);
    setLS({ pointsFormType: e.target.value })
  }, [setPointsFormType]);

  const onPointsScoredChange = useCallback((e) => {
    if (pointsFormType === PointsFormType.Classic) { return; }
    setPointsScored(intOrEmpty(e.target.value));
  }, [pointsFormType, setPointsScored])

  const onPointsGoalChange = useCallback((e) => {
    if (pointsFormType === PointsFormType.Classic) { return; }
    setPointsGoal(intOrEmpty(e.target.value));
  }, [pointsFormType, setPointsGoal])

  useEffect(() => {
    if (pointsFormType === PointsFormType.Classic) { return; }
    const pointsToScoreReal = toInteger(pointsGoal) - toInteger(pointsScored);
    const pointsToScoreToSet = pointsToScoreReal <= 0 ? 0 : pointsToScoreReal;
    if (targetPoints === pointsToScoreToSet) { return; }
    onTargetPointsChange(pointsToScoreToSet);
  }, [pointsFormType, pointsScored, pointsGoal, onTargetPointsChange, targetPoints]);

  const isPFTClassic = pointsFormType === PointsFormType.Classic;

  return (
    <div className="b-Form">
      <div className="b-Form__line">
        <div className="b-Form__caption">
          Тип формы набора очков:
        </div>
        <label>
          Одно поле
          <input
            name="pointsFormType"
            type="radio"
            value={PointsFormType.Classic}
            checked={pointsFormType === PointsFormType.Classic}
            onChange={changePointsFormType}
          />
        </label>
        <label>
          Два поля
          <input
            name="pointsFormType"
            type="radio"
            value={PointsFormType.Modern}
            checked={pointsFormType === PointsFormType.Modern}
            onChange={changePointsFormType}
          />
        </label>
      </div>
      {/* Одно поле */}
      <div className={`b-Form__line ${isPFTClassic ? "" : "b-Form__line--disabled"}`}>
        <div className="b-Form__caption">
          Сколько нужно набрать
        </div>
        <input
          name="targetPoints"
          type="number"
          placeholder=""
          value={targetPoints}
          disabled={!isPFTClassic}
          onChange={(e) => onTargetPointsChange(intOrEmpty(e.target.value))}
        />
      </div>
      {/* --- Одно поле */}
      {/* Два поля */}
      <div className={`b-Form__line ${isPFTClassic ? "b-Form__line--disabled" : ""}`}>
        <div className="b-Form__caption">
          Уже набрано
        </div>
        <input
          name="targetPointsScored"
          type="number"
          placeholder=""
          value={pointsScored}
          disabled={isPFTClassic}
          onChange={onPointsScoredChange}
        />
      </div>
      <div className={`b-Form__line ${isPFTClassic ? "b-Form__line--disabled" : ""}`}>
        <div className="b-Form__caption">
          Цель по очкам
        </div>
        <input
          name="targetPointsGoal"
          type="number"
          placeholder=""
          value={pointsGoal}
          disabled={isPFTClassic}
          onChange={onPointsGoalChange}
        />
      </div>
      {/* --- Два поля */}
      <div className="b-Form__line">
        <div className="b-Form__caption">
          Множители
        </div>
        <div className="b-Form__multipliers">
          {Array(numOfMultipliers + 1).fill(0).map((_, id) => (
            <MultiplierInput
              key={`mult-${id}`}
              id={id}
              value={multipliers[id] === undefined ?  '' : multipliers[id]}
              onChange={(value: number) => { onMultipliersChange({ ...multipliers, [id]: value }) }}
            />
          ))}
          <div
            onClick={() => { setNumOfMultipliers(prevState => prevState + 1) }}
            className="b-Form__mult-plus"
          >
            +
          </div>
          <div
            onClick={() => { setNumOfMultipliers(prevState => prevState - 1); onMultipliersChange(omit(multipliers, String(numOfMultipliers))); }}
            className="b-Form__mult-minus"
          >
            -
          </div>
        </div>
      </div>
      <div className="b-Form__line">
        <div className="b-Form__caption">
          Бонус от рекламы
        </div>
        <input
          name="adBonus"
          type="number"
          placeholder=""
          value={adBonus}
          onChange={(e) => onAdBonusChange(intOrEmpty(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Form;
