import React, {useState} from 'react';
import './App.css';

export function replaceCamelWithSpaces(colorName: string) {
  return colorName.replace(/\B([A-Z]\B)/g, ' $1');
}

function App() {
  const [isRed, setColor] = useState(true);
  const [isChecked, setCheck] = useState(false);

  const buttonColor = isRed ? 'button-color-red' : 'button-color-blue';

  function onClickColorBtn() {
    setColor(!isRed);
  }

  function onClickCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setCheck(e.target.checked);
  }

  return (
    <div>
      <button
        className={isChecked ? 'button-color-gray' : buttonColor}
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
