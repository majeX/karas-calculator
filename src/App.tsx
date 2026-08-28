import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Combination, calculateAll, getAllMultipliers } from './calculate-new';
import karas from './karas.svg';
import './App.css';
import Form from './Form';
import AllWithTabs from './Results/AllWithTabs';
import memoImg from './memo.jpg';
import HintPopup from './Results/HintPopup';
import { getAllLS, setLS } from './lib/localStorage';
import Footer from './Footer';

export type Multipliers = { [key: string]: number | '' };

function App() {
  const [gainedPoints, setGainedPoints] = useState<number | ''>('');
  const [targetPoints, setTargetPoints] = useState<number | ''>('');
  const [multipliers, setMultipliers] = useState<Multipliers>({});
  const [grailMultipliers, setGrailMultipliers] = useState<Multipliers>({});
  const [grailActive, setGrailActive] = useState<boolean>(false);
  const [adBonus, setAdBonus] = useState<number | ''>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const [calcResults, setCalcResults] = useState<Combination[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  // The two lists are kept separately: the game rounds the clan multiplier after
  // applying the Grail bonus, so the Grail values can't be derived from the base ones.
  const activeMultipliers = grailActive ? grailMultipliers : multipliers;

  const calculateResults = useCallback(() => {
    if (targetPoints === '') return;
    const multipliersArray = Object.values(activeMultipliers);
    if (multipliersArray.length === 0) return;
    const filteredMultipliers = multipliersArray.filter(multiplier => multiplier !== '');

    const allMultipliers = getAllMultipliers(filteredMultipliers as number[], adBonus || 0);
    setIsCalculating(true);
    setHasCalculated(false);

    setTimeout(() => {
      const calculated = calculateAll(allMultipliers, gainedPoints || 0, targetPoints);
      setCalcResults(calculated);
      setIsCalculating(false);
      setHasCalculated(true);
    }, 100);
  }, [adBonus, activeMultipliers, gainedPoints, targetPoints]);

  useEffect(() => {
    const savedValues = getAllLS();
    // Guard on `undefined`, not truthiness: 0 and '' are values a player can
    // legitimately have typed, and dropping them silently empties the field.
    if (savedValues['multipliers'] !== undefined) {
      setMultipliers(savedValues['multipliers'])
    }
    if (savedValues['grailMultipliers'] !== undefined) {
      setGrailMultipliers(savedValues['grailMultipliers'])
    }
    if (savedValues['grailActive'] !== undefined) {
      setGrailActive(savedValues['grailActive'])
    }
    if (savedValues['adBonus'] !== undefined) {
      setAdBonus(savedValues['adBonus'])
    }
    if (savedValues['gainedPoints'] !== undefined) {
      setGainedPoints(savedValues['gainedPoints'])
    }
    if (savedValues['targetPoints'] !== undefined) {
      setTargetPoints(savedValues['targetPoints'])
    }
  }, []);

  useEffect(() => {
    if (!hasCalculated) return;
    // Optional call: jsdom has no scrollIntoView.
    resultsRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  }, [hasCalculated]);

  const resetCalc = useCallback(() => {
    setCalcResults([]);
    setHasCalculated(false);
  }, [setCalcResults]);

  // TODO make useLocalStorageCb
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={karas} className="App-logo" alt="logo" />
        </Link>
      </header>

      <Form
        multipliers={activeMultipliers}
        onMultipliersChange={(value: Multipliers) => {
          if (grailActive) {
            setGrailMultipliers(value); setLS({ grailMultipliers: value });
          } else {
            setMultipliers(value); setLS({ multipliers: value });
          }
          resetCalc();
        }}

        grailActive={grailActive}
        onGrailActiveChange={(value: boolean) => { setGrailActive(value); setLS({ grailActive: value }); resetCalc(); }}

        gainedPoints={gainedPoints}
        onGainedPointsChange={(value: number) => { setGainedPoints(value); setLS({ gainedPoints: value }); resetCalc(); }}

        targetPoints={targetPoints}
        onTargetPointsChange={(value: number) => { setTargetPoints(value); setLS({ targetPoints: value }); resetCalc(); }}

        adBonus={adBonus}
        onAdBonusChange={(value: number) => { setAdBonus(value); setLS({ adBonus: value }); resetCalc(); }}
      />
      <div>
        <a href={memoImg} target="_blank" className="App__memo-link" rel="noopener noreferrer">Памятка</a>
      </div>
      <button
        className="App__submit"
        disabled={isCalculating}
        onClick={() => {
          calculateResults()
        }}
      >
        {isCalculating ? <span>Считаю, подождите</span> : <span>Рассчитать</span>}
      </button>
      <div ref={resultsRef}>
        <AllWithTabs
          results={calcResults}
          hasCalculated={hasCalculated}
        />
      </div>
      <HintPopup />
      <Footer />
    </div>
  );
}

export default App;
