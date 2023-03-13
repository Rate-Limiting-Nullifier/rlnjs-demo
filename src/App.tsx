import React from 'React';
import './App.css';
import User from './Components/User';
import AppControl from './Components/AppControl';
import { RLN, Registry, Cache } from 'rlnjs';
import { VerificationKeyT } from 'rlnjs/dist/types/types'

const APP_ID = BigInt(1234567890)

const zkeyfiles = {
  vkeyPath: "zkeyFiles/verification_key.json",
  wasmFilePath: "zkeyFiles/rln.wasm",
  finalZkeyPath: "zkeyFiles/rln_final.zkey",
}

async function createRLNInstance() {
  const vKey = await fetch(zkeyfiles.vkeyPath).then((res) => res.json());

  return new RLN(zkeyfiles.wasmFilePath, zkeyfiles.finalZkeyPath, vKey as VerificationKeyT);
}

let RLN_USER_1
let RLN_USER_2

try {
  console.log("Creating User 1")
  createRLNInstance().then((rln) => { RLN_USER_1 = rln });
  console.log("Created User 1, Creating User 2")
  createRLNInstance().then((rln) => { RLN_USER_2 = rln });
  console.log("Created User 2")
} catch(e){
  console.error(e)
}

let REGISTRY_USER_1 = new Registry()
let REGISTRY_USER_2 = new Registry()

let CACHE_USER_1 = new Cache(APP_ID)
let CACHE_USER_2 = new Cache(APP_ID)

function App() {
  return (
    <div className="App">
      <h1 className="title">RLNjs Demo</h1>
      <hr />
      <div className="columns">
        <div className="user1">
          <h2>User 1</h2>
          <User rln_instance={RLN_USER_1} registry={REGISTRY_USER_1} cache={CACHE_USER_1} />
        </div>
        <div className="controls">
          <h2>App Controls</h2>
          <AppControl/>
        </div>
        <div className="user2">
          <h2>User 2</h2>
          <User rln_instance={RLN_USER_2} registry={REGISTRY_USER_2} cache={CACHE_USER_2}/>
        </div>
      </div>
    </div>
  );
}

export default App;
