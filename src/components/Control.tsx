import { appID, epoch, setAppID, setEpoch } from '../store/store'

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
    <div class="">
      <h2>App Controls</h2>
      <div class='box'>
        <div class='input'>
          <h3 style="text-decoration: underline">RLN App ID:</h3>
          <h2>{appID().toString()}</h2>
        </div>
        <div class='input'>
          <h3 style="text-decoration: underline">Epoch:</h3>
          <h2>{epoch().toString()}</h2>
        </div>
        <div class="plusminus">
          <button onClick={decrementEpoch}>-</button>
          <button onClick={incrementEpoch}>+</button>
        </div>
      </div>
    </div>
  )
}

export default Control