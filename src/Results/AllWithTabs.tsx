import React, { FC } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { CalcResults } from '../calculate';
import Results from './Results';
import { NON_CALCULATABLE } from '../calculateSimple';
import './AllWithTabs.css';

const MAX_SUM = 180;

type Props = {
  results: CalcResults,
};

const AllWithTabs: FC<Props> = ({results}) => {
  if (results.length === 0) {
    return null;
  }

  const simpleResults = results.filter(({ x, y }) => {
    const xLessThanMax = x < MAX_SUM;
    const yLessThanMax = y !== null ? y < MAX_SUM : true;
    const xCanBeCalculated = !(NON_CALCULATABLE.includes(x));
    const yCanBeCalculated = y !== null ? !(NON_CALCULATABLE.includes(y)) : true;
    return xLessThanMax && yLessThanMax && xCanBeCalculated && yCanBeCalculated;
  });

  return (
    <Tabs className="b-Tabs">
      <TabList className="b-Tabs__headers" >
        <Tab className="b-Tabs__header" selectedClassName="active">Только слова без бонусов</Tab>
        <Tab className="b-Tabs__header" selectedClassName="active">Все слова</Tab>
      </TabList>
      <TabPanel>
        <Results
          useCache
          results={simpleResults}
        />
      </TabPanel>
      <TabPanel>
        <Results
          results={results}
        />
      </TabPanel>
    </Tabs>
  );
};

export default AllWithTabs;
