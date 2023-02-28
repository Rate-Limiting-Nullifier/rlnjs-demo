import React from 'React';
import './App.css';
import User from './Components/User';
import AppControl from './Components/AppControl';
import { RLN, Registry, Cache } from 'rlnjs';
import { VerificationKeyT } from 'rlnjs/dist/types/types'

const zkeyfiles = {
  vkeyPath: "zkeyFiles/verification_key.json",
  wasmFilePath: "zkeyFiles/rln.wasm",
  finalZkeyPath: "zkeyFiles/rln_final.zkey",
}

async function createRLNInstance() {
  const vKey = await fetch(zkeyfiles.vkeyPath).then((res) => res.json());

  return new RLN(zkeyfiles.wasmFilePath, zkeyfiles.finalZkeyPath, vKey as VerificationKeyT);
}

let RLN_INSTANCE_1
let RLN_INSTANCE_2

createRLNInstance().then((rln) => {RLN_INSTANCE_1 = rln});
createRLNInstance().then((rln) => {RLN_INSTANCE_2 = rln});

function App() {
  return (
    <div className="App">
      <h1 className="title">RLNjs Demo</h1>
      <hr />
      <div className="columns">
        <div className="user1">
          <h2>User 1</h2>
          <User />
        </div>
        <div className="controls">
          <h2>App Controls</h2>
          <AppControl/>
        </div>
        <div className="user2">
          <h2>User 2</h2>
          <User />
        </div>
      </div>
    </div>
  );
}

export default App;
