import React, { useCallback, useEffect, useState } from 'react';

import { CalcResults, calculateAll, getAllMultipliers } from './calculate';
import karas from './karas.svg';
import './App.css';
import Form from './Form';
import AllWithTabs from './Results/AllWithTabs';
import memoImg from './memo.jpg';
import HintPopup from './Results/HintPopup';
import { getAllLS, setLS } from './lib/localStorage';

export type Multipliers = { [key: string]: number | '' };

function App() {
  const [targetPoints, setTargetPoints] = useState<number | ''>('');
  const [multipliers, setMultipliers] = useState<Multipliers>({});
  const [adBonus, setAdBonus] = useState<number | ''>('');

  const [calcResults, setCalcResults] = useState<CalcResults>([]);

  const calculateResults = useCallback(() => {
    if (adBonus === '') return;
    if (targetPoints === '') return;
    const multipliersArray = Object.values(multipliers);
    if (multipliersArray.length === 0) return;
    const filteredMultipliers = multipliersArray.filter(multiplier => multiplier !== '');

    const allMultipliers = getAllMultipliers(filteredMultipliers as number[], adBonus);
    const calculated = calculateAll(allMultipliers, targetPoints);
    setCalcResults(calculated);
  }, [adBonus, multipliers, targetPoints]);

  useEffect(() => {
    const savedValues = getAllLS();
    if (savedValues['multipliers']) {
      setMultipliers(savedValues['multipliers'])
    }
    if (savedValues['adBonus']) {
      setAdBonus(savedValues['adBonus'])
    }
    if (savedValues['targetPoints']) {
      setTargetPoints(savedValues['targetPoints'])
    }
  }, []);

  // TODO make useLocalStorageCb
  return (
    <div className="App">
      <header className="App-header">
        <img src={karas} className="App-logo" alt="logo" />
      </header>

      <Form
        multipliers={multipliers}
        onMultipliersChange={(value: Multipliers) => { setMultipliers(value); setLS({ multipliers: value }) }}

        targetPoints={targetPoints}
        onTargetPointsChange={(value: number) => { setTargetPoints(value); setLS({ targetPoints: value }) }}

        adBonus={adBonus}
        onAdBonusChange={(value: number) => { setAdBonus(value); setLS({ adBonus: value }) }}
      />
      <div>
        <a href={memoImg} target="_blank" className="App__memo-link" rel="noopener noreferrer">Памятка</a>
      </div>
      <button
        className="App__submit"
        onClick={() => calculateResults()}
      >
        Рассчитать
      </button>

      <AllWithTabs
        results={calcResults}
      />
      <HintPopup />
      <footer className="App__footer">
        Built by <a href="https://github.com/majeX">majeX</a>; v1.1
      </footer>
    </div>
  );
}

export default App;
