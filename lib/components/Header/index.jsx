import React from 'react';
import './header-style';

import Button from '../Button/';

const logStuff = () => {
  console.log('clicked!');
}

const Header = () => {
  return (
    <div className="Header">
      <h1>FutureGrooves</h1>
      <Button handleClick={() => logStuff()} />
    </div>
  );
}

export default Header;
