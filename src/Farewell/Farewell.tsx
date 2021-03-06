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
        <Link to="/calc">
          <img src={karas} className="App-logo" alt="logo" />
        </Link>
      </header>
      <section>
        <h5>
          Калькулятор на месте – тыкайте в карася наверху или
          &nbsp;<Link to="/calc">прямо вот сюда</Link>.
        </h5>
        <h5>
          Я в игру не играю, но ошибки в случае чего чиню.
        </h5>
        <h5>
          Вот сейчас, например, починил ошибку деления чисел с плавающей запятой. Подробнее про ошибку тут: <a href="https://habr.com/ru/post/309812/" target="_blank">статья</a>.
        </h5>
        <h5>Вообще список изменений <Link to="/changelog">лежит вот здесь</Link>.</h5>
        <h4>
          При описании ошибки/бага – обязательно прилагайте скриншот, где видно все числа, иначе я не смогу повторить ошибку и починить.
        </h4>
        <h5>
          Баги и всякие спасибы/пожелания/предложения – вот сюда: <a href="mailto:majex.exe@gmail.com">majex.exe@gmail.com</a>.
        </h5>
        <h5>
          Всем хорошей игры 🤘
        </h5>
      </section>
    </div>
  );
};

export default Farewell;
