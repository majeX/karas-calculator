import React, { FC } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { Combination } from '../calculate-new';
import Results from './Results';
import { NON_CALCULATABLE } from '../calculateSimple';
import './AllWithTabs.css';

const MAX_SUM = 180;

type Props = {
  results: Combination[],
};

const AllWithTabs: FC<Props> = ({results}) => {
  if (results.length === 0) {
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
          Только слова без бонусов&nbsp;
          <span className="b-Tabs__header-result-count">
            ({simpleResults.length})
          </span>

        </Tab>
      </TabList>
      <TabPanel className="b-Tabs__content">
        <Results
          results={results.slice(0, 200)}
        />
      </TabPanel>
      <TabPanel className="b-Tabs__content">
        <Results
          useCache
          results={simpleResults.slice(0, 200)}
        />
      </TabPanel>
    </Tabs>
  );
};

export default AllWithTabs;
