import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Footer: FC<Props> = () => {
  return (
    <footer className="App__footer">
      Built by <a href="https://github.com/majeX">majeX</a>; v1.4.&nbsp;
      Email: <a href="mailto:majex.exe@gmail.com">majex.exe@gmail.com</a>.
      &nbsp;<Link to="/changelog">Changelog</Link>
    </footer>
  );
};

export default Footer;
