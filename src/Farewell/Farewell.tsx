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
          <div className="App__attention">ВНИМАНИЕ! (апдейт от 25 октября 2023)</div>Теперь показываются не все результаты расчётов, а первые 200. Кому мало – пишите на имейл.
          Это нужно, чтобы уменьшить время загрузки результатов.
          <br />
          <br />
          А ещё кнопка "Рассчитать" теперь более интерактивная и вкладки со словами более наглядно показывают активную вкладку.
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
