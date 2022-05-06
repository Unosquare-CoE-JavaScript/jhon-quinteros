import React, {useState} from 'react';

import './App.css';

function App() {
  const [isRed, setColor] = useState(true);
  const [isChecked, setCheck] = useState(false);

  function onClickColorBtn() {
    setColor(!isRed);
  }

  function onClickCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setCheck(e.target.checked);
  }

  return (
    <div>
      <button
        className={isRed ? 'button-color-red' : 'button-color-blue'}
        disabled={isChecked}
        onClick={onClickColorBtn}
      >Change to {isRed ? 'blue' : 'red'}</button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        checked={isChecked}
        onChange={onClickCheck}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
