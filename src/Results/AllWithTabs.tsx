import React, { FC } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { Combination } from '../calculate-new';
import Results from './Results';
import { NON_CALCULATABLE } from '../calculateSimple';
import './AllWithTabs.css';

const MAX_SUM = 180;
// Rendering every combination made the results crawl on a phone.
const MAX_SHOWN = 200;

type Props = {
  results: Combination[],
  hasCalculated: boolean,
};

// The tab counts the whole list but the panel only draws the first MAX_SHOWN,
// so say so — otherwise "(900)" above 200 rows just looks broken.
const Truncated: FC<{ total: number }> = ({ total }) => {
  if (total <= MAX_SHOWN) { return null; }
  return (
    <div className="b-Tabs__truncated">
      Показаны первые {MAX_SHOWN} комбинаций из {total}.
    </div>
  );
};

// `5x1000` reads like a multiplication but means "1000 points at multiplier 5".
const Legend: FC<{ clickable?: boolean }> = ({ clickable = false }) => (
  <div className="b-Tabs__legend">
    Читается так: <span className="b-Tabs__legend-mult">5</span>x1000 — набрать
    1000 очков словами с множителем 5.
    {clickable && ' Нажмите на строку, чтобы посмотреть, из каких слов её собрать.'}
  </div>
);

const AllWithTabs: FC<Props> = ({results, hasCalculated}) => {
  if (results.length === 0) {
    if (hasCalculated) {
      return <div className="b-Tabs__no-results">Не найдено комбинаций</div>;
    }
    return null;
  }

  const simpleResults = results.filter(({ multiplier1Count, multiplier2Count }) => {
    const xLessThanMax = multiplier1Count < MAX_SUM;
    const yLessThanMax = multiplier2Count !== null ? multiplier2Count < MAX_SUM : true;
    const xCanBeCalculated = !(NON_CALCULATABLE.includes(multiplier1Count));
    const yCanBeCalculated = multiplier2Count !== null ? !(NON_CALCULATABLE.includes(multiplier2Count)) : true;
    return xLessThanMax && yLessThanMax && xCanBeCalculated && yCanBeCalculated;
  });

  const simpleTabClassNames = ["b-Tabs__header"].concat([simpleResults.length === 0 ? "empty" : ""]).join(" ");
  const allTabClassNames = ["b-Tabs__header"].concat([results.length === 0 ? "empty" : ""]).join(" ");

  return (
    <Tabs className="b-Tabs" defaultIndex={0}>
      <TabList className="b-Tabs__headers" >
        <Tab className={allTabClassNames} selectedClassName="active">
          Все слова&nbsp;
          <span className="b-Tabs__header-result-count">
            ({results.length})
          </span>
        </Tab>
        <Tab className={simpleTabClassNames} selectedClassName="active">
          Слова без бонусов&nbsp;
          <span className="b-Tabs__header-result-count">
            ({simpleResults.length})
          </span>

        </Tab>
      </TabList>
      <TabPanel className="b-Tabs__content">
        <Legend />
        <Results
          results={results.slice(0, MAX_SHOWN)}
        />
        <Truncated total={results.length} />
      </TabPanel>
      <TabPanel className="b-Tabs__content">
        <Legend clickable />
        <Results
          clickable
          results={simpleResults.slice(0, MAX_SHOWN)}
        />
        <Truncated total={simpleResults.length} />
      </TabPanel>
    </Tabs>
  );
};

export default AllWithTabs;
