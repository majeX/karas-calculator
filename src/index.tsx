import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Changelog from './Changelog/Changelog';
import Clanquest from './Clanquest/Clanquest';
import Farewell from './Farewell/Farewell';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/clanquest" element={<Clanquest />} />
        <Route path="/calc" element={<App />} />
        <Route path="/" element={<Farewell />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
