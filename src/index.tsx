import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import Changelog from './Changelog/Changelog';
// import Clanquest from './Clanquest/Clanquest';
import Farewell from './Farewell/Farewell';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        {/*<Route path="/changelog">*/}
        {/*  <Changelog />*/}
        {/*</Route>*/}
        {/*<Route path="/clanquest">*/}
        {/*  <Clanquest />*/}
        {/*</Route>*/}
        {/*<Route path="/">*/}
        {/*  <App />*/}
        {/*</Route>*/}
        <Route path="/">
          <Farewell />
        </Route>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
