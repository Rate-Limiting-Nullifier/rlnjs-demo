import React from 'react'

const AppControl = () => {
  let epoch = 0;
  return(<div className='box'>
    <div className="input">
      <label>App ID:</label>
      <input type="number"></input></div>
    <div className="input">
      <label>Epoch:</label>
      <input disabled={true} value={epoch}></input>
      <div className="plusminus">
        <button>-</button>
        <button>+</button>
      </div>
    </div>
  </div>)
}

export default AppControl