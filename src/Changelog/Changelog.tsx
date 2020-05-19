import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './Changelog.css';
import karas from '../karas.svg';

import sort from './1.2/sort.png';
import results from './1.2/results.png';

type Props = {};

const Changelog: FC<Props> = () => {
  return (
    <div className="App Changelog">
      <header className="App-header">
        <Link to="/">
          <img src={karas} className="App-logo" alt="logo" />
        </Link>
      </header>
      <section>
        <Link to="/" className="Changelog__back-to-calc">Назад в калькулятор</Link>
      </section>
      <section>
        <h3>1.2</h3>
        <ul>
          <li>
            Добавлена сортировка – теперь самые простые расклады должны быть выше. Сортировка находит минимальное количество очков в обоих раундах.
            <br />
            <br />
            <a href={sort} rel="noopener noreferrer" target="_blank"><img src={sort} alt="sort" /></a>
          </li>
          <li>
            Теперь окно с "простыми" результатами показывает варианты для всего раклада – чтобы можно было открыть 1 комбинацию и оставить открытым. Также, теперь наверху отображается и множитель, и сумма.
            <br />
            <br />
            <a href={results} rel="noopener noreferrer" target="_blank"><img src={results} alt="sort" /></a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Changelog;
