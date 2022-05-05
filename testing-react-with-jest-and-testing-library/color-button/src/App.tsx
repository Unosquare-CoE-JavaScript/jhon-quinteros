import React, {useState} from 'react';

import './App.css';

function App() {
  const [isRed, setColor] = useState(true);

  function onClickColorBtn() {
    setColor(!isRed);
  }

  return (
    <div>
      <button className={isRed ? 'button-color-red' : 'button-color-blue'} onClick={onClickColorBtn}>Change to {isRed ? 'blue' : 'red'}</button>
    </div>
  );
}

export default App;
