import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './Farewell.css';
import '../App.css';
import karas from '../karas.svg';

type Props = {};

const Farewell: FC<Props> = () => {
  return (
    <div className="App Farewell">
      <header className="App-header">
        <Link to="/">
          <img src={karas} className="App-logo" alt="logo" />
        </Link>
      </header>
      <section>
        <h3>😔</h3>
        <h4>
          Ну вот веселье и закончилось.
        </h4>
        <h5>
          Я, конечно, делал калькулятор для одного конкретного клана, но я знаю, что вы тоже им пользовались.
        </h5>
        <h5>
          Он создавался в свободное время, забесплатно, и по приколу.
        </h5>
        <h5>
          Многие из нас не вернутся в игру без этой весёлой движухи в кланах – и это нормально.
        </h5>
        <h5>
          Если хотите передать привет создателю – пишите на <a href="mailto:majex.exe@gmail.com">majex.exe@gmail.com</a>.
        </h5>
        <h5>
          Увидимся в других играх 🤘
        </h5>
      </section>
    </div>
  );
};

export default Farewell;
