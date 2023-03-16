import React, {useState} from 'react'

interface AppControlProps {
  epoch: BigInt;
  onEpochChange: (newValue: BigInt) => void;
  rln_identifier: BigInt;
  onRlnIdentifierChange: (newValue: BigInt) => void;
}

const AppControl: React.FC<AppControlProps> = ({ epoch, onEpochChange, rln_identifier, onRlnIdentifierChange }) => {
  const handleIdentifierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newIdentifier = BigInt(inputValue);
    onRlnIdentifierChange(newIdentifier);
  };

  const handleEpochChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newEpoch = BigInt(inputValue);
    onEpochChange(newEpoch);
  };

  const incrementEpoch = () => {
    const newEpoch = BigInt(epoch as bigint) + BigInt(1);
    onEpochChange(newEpoch);
  };

  const decrementEpoch = () => {
    if (epoch > BigInt(0)) {
      const newEpoch = BigInt(epoch as bigint) - BigInt(1);
      onEpochChange(newEpoch);
    }
  };


  return(<div className='box'>
    <div className="input">
      <label>App ID:</label>
      <input type="number" value={rln_identifier.toString()} onChange={handleIdentifierChange}></input>
      <small>Changing the App ID will reset the cache.</small></div>
    <div className="input">
      <label>Epoch:</label>
      <input disabled={true} value={epoch.toString()} onChange={handleEpochChange}></input>
      <div className="plusminus">
        <button onClick={decrementEpoch}>-</button>
          <button onClick={incrementEpoch}>+</button>
      </div>
    </div>
  </div>)
}

export default AppControl