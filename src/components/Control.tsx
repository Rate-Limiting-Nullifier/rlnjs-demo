import { appID, epoch, setAppID, setEpoch, publishQueue } from '../store/store'

const Control = () => {
    const handleIdentifierChange = ({ target }) => {
      const inputValue = target.value
      const newIdentifier = BigInt(inputValue)
      setAppID(newIdentifier)
    }

    const incrementEpoch = () => {
      const newEpoch = BigInt(epoch() as bigint) + BigInt(1)
      setEpoch(newEpoch)
    }

    const decrementEpoch = () => {
      if (epoch() > BigInt(1)) {
        const newEpoch = BigInt(epoch() as bigint) - BigInt(1)
        setEpoch(newEpoch)
      }
    }

    return (
        <div class="controls">
            <h2>App Controls</h2>
            <div class='box'>
                <div class='input'>
                    <label>App ID:</label>
                    <input type="number" value={appID().toString()} onChange={handleIdentifierChange}></input>
                    <small>Changing the App ID will reset the cache.</small>
                </div>
                <div class='input'>
                    <label>Epoch:</label>
                    <h2>{epoch().toString()}</h2>
                </div>
                <div class="plusminus">
                    <button onClick={decrementEpoch}>-</button>
                    <button onClick={incrementEpoch}>+</button>
                </div>
                <div>PublishQueue: {publishQueue().length}</div>
            </div>
        </div>
    )
}

  export default Control